import { translations, Locale } from '@/lib/i18n/translations';

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const t = translations[lang as Locale] || translations.en;
  
  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-black text-navy mb-8">
          {t.aboutTitle}
        </h1>
        <p className="text-xl text-navy/70 max-w-3xl mx-auto">
          {t.aboutDescription}
        </p>
      </div>
    </main>
  );
}
