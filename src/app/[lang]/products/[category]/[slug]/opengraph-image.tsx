import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/lib/sanity/client';

export const runtime = 'edge';

// Image metadata
export const alt = 'Electroalfa Product Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { lang: string; slug: string } }) {
  const product = await getProductBySlug(params.slug);

  const title = product?.title 
    ? (product.title[params.lang as keyof typeof product.title] || product.title['ro'])
    : 'Electroalfa';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #002D54, #001B33)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.05em' }}>
            ELECTROALFA
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {product?.category && (
            <div style={{ fontSize: 24, fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {product.category.title}
            </div>
          )}
          <div style={{ fontSize: 80, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, maxWidth: '900px' }}>
            {title}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: 24, color: '#F4F7F9', opacity: 0.8 }}>
            {params.lang === 'ro' ? 'Echipamente Electrice Industriale' : 'Industrial Electrical Equipment'}
          </div>
          <div style={{ display: 'flex', width: '200px', height: '4px', backgroundColor: '#FF6B00', borderRadius: '2px' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
