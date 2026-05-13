import { translations, homeTranslations, Locale } from '@/lib/i18n/translations';

export default function SolutionsPage({ params: { lang } }: { params: { lang: string } }) {
  const t = translations[lang as Locale] || translations.en;
  const h = homeTranslations[lang as Locale] || homeTranslations.en;
  
  const solutions = [
    { name: t.energy, key: 'Energy' },
    { name: t.industry, key: 'Industry' },
    { name: t.infrastructure, key: 'Infrastructure' },
    { name: t.oilGas, key: 'Oil & Gas' }
  ];

  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-black text-navy mb-8">
          {h.turnkeyTitle}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {solutions.map((sol) => (
            <div key={sol.key} className="bg-white p-8 rounded-3xl border border-steel-dark shadow-sm">
              <h2 className="text-2xl font-bold text-navy mb-4">{sol.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
