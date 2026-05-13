import Link from 'next/link';
import Image from 'next/image';
import { getNewsArticles } from '@/lib/sanity/client';
import { NewsArticle } from '@/lib/validations/sanity';
import { Calendar } from 'lucide-react';

export default async function NewsPage({ params: { lang } }: { params: { lang: string } }) {
  const articles = await getNewsArticles(lang);

  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-black text-navy mb-8 text-center uppercase tracking-tight">
          {lang === 'ro' ? 'Noutăți și Evenimente' : 'News & Events'}
        </h1>
        <p className="text-xl text-navy/70 max-w-3xl mx-auto text-center mb-16 font-light">
          {lang === 'ro' 
            ? 'Fiți la curent cu ultimele inovații, proiecte și evenimente din cadrul Electroalfa.' 
            : 'Stay updated with the latest innovations, projects, and events at Electroalfa.'}
        </p>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: NewsArticle) => (
              <Link 
                key={article._id}
                href={article.slug ? `/${lang}/news/${article.slug}` : '#'}
                className="bg-white rounded-3xl border border-steel-dark shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video bg-steel">
                  {article.coverImage?.url ? (
                    <Image
                      src={article.coverImage.url}
                      alt={article.coverImage.alt || article.title || 'News Cover'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-navy/20">
                      <Calendar size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-navy flex items-center gap-2">
                    <Calendar size={12} />
                    {article.publishDate 
                      ? new Date(article.publishDate).toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                      : (lang === 'ro' ? 'Recent' : 'Recent')}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-orange transition-colors line-clamp-3">
                    {article.title || (lang === 'ro' ? 'Articol Fără Titlu' : 'Untitled Article')}
                  </h2>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold text-orange uppercase tracking-widest">
                    {lang === 'ro' ? 'Citește Mai Mult' : 'Read More'}
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-steel-dark p-20 text-center flex flex-col items-center justify-center">
             <div className="w-20 h-20 bg-steel rounded-full flex items-center justify-center mb-6 text-navy/40 text-4xl">
               📰
             </div>
             <h2 className="text-2xl font-bold text-navy mb-4">
               {lang === 'ro' ? 'Nicio știre găsită' : 'No news found'}
             </h2>
             <p className="text-navy/80 max-w-md mx-auto">
               {lang === 'ro' 
                 ? 'Reveniți curând pentru actualizări.' 
                 : 'Check back soon for updates.'}
             </p>
          </div>
        )}
      </div>
    </main>
  );
}
