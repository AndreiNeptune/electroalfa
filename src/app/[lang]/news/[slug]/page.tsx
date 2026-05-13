import { getNewsArticleBySlug } from '@/lib/sanity/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';

export default async function NewsArticlePage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}) {
  const article = await getNewsArticleBySlug(slug, lang);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href={`/${lang}/news`}
          className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-orange transition-colors mb-12 uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          {lang === 'ro' ? 'Înapoi la Noutăți' : 'Back to News'}
        </Link>

        <article className="bg-white rounded-3xl border border-steel-dark overflow-hidden shadow-sm">
          {article.coverImage?.url && (
            <div className="relative aspect-[21/9] w-full bg-steel">
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt || article.title || 'News Cover'}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-16">
            <div className="flex items-center gap-2 text-sm font-bold text-navy/60 mb-6 uppercase tracking-widest">
              <Calendar size={16} />
              {article.publishDate 
                ? new Date(article.publishDate).toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : (lang === 'ro' ? 'Recent' : 'Recent')}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-navy mb-12 uppercase tracking-tight leading-tight">
              {article.title || (lang === 'ro' ? 'Articol Fără Titlu' : 'Untitled Article')}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-navy prose-headings:uppercase prose-a:text-orange hover:prose-a:text-orange-hover">
              {article.content ? (
                <PortableText value={article.content} />
              ) : (
                <p>{lang === 'ro' ? 'Acest articol nu are conținut.' : 'This article has no content.'}</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
