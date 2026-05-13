import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // In a real application, you'd verify this against process.env.SANITY_WEBHOOK_SECRET
    // For this demonstration, we'll just check if it exists (or you can set a specific string)
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    
    // We expect the Sanity webhook payload to contain the slug and category
    // For a robust implementation, you might clear the entire layout or specific paths
    
    // For example, if a product changes, revalidate the dynamic product routes
    if (body._type === 'product' && body.slug?.current) {
      // Revalidate both languages (since this is an i18n site)
      revalidatePath(`/ro/products/[category]/${body.slug.current}`, 'page');
      revalidatePath(`/en/products/[category]/${body.slug.current}`, 'page');
      
      // Also revalidate the home page or catalog pages
      revalidatePath('/ro', 'page');
      revalidatePath('/en', 'page');
      
      return NextResponse.json({ revalidated: true, now: Date.now(), slug: body.slug.current });
    }

    // Fallback: revalidate everything if the type isn't specifically handled
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
