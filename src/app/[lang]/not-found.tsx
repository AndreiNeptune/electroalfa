'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import { translations, Locale } from '@/lib/i18n/translations';

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ro';
  const t = translations[lang as Locale] || translations.en;

  useEffect(() => {
    // Get keywords from the URL to pre-fill search
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || '';
    const keywords = lastPart.replace(/[-_]/g, ' ');

    if (keywords && keywords.length > 2) {
      // Delay slightly to ensure CommandMenu is mounted and listening
      const timer = setTimeout(() => {
        const event = new CustomEvent('open-command-menu', { 
          detail: { search: keywords } 
        });
        window.dispatchEvent(event);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-menu'));
  };

  return (
    <main className="min-h-screen bg-steel flex items-center justify-center p-6 pt-20">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-9xl font-black text-navy opacity-10 tracking-tighter">404</h1>
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight">
            {t.error404Title}
          </h2>
          <p className="text-xl text-navy/60 font-medium max-w-md mx-auto">
            {t.error404Desc}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-steel-dark shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center justify-center gap-2">
            <Search size={20} className="text-orange" />
            {t.helpFind}
          </h3>
          <p className="text-navy/70 text-sm">
            {t.analyzedRequest}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={openSearch} className="gap-2">
              <Search size={18} />
              {t.openSearch}
            </Button>
            <Link href={`/${lang}`}>
              <Button variant="outline" className="gap-2 w-full">
                <Home size={18} />
                {t.returnBase}
              </Button>
            </Link>
          </div>
        </div>

        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-navy/40 hover:text-navy font-bold text-sm mx-auto transition-colors"
        >
          <ArrowLeft size={16} />
          {t.goBack}
        </button>
      </div>
    </main>
  );
}
