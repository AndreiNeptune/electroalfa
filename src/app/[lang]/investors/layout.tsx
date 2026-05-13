import React from 'react';

export default function InvestorsLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <main className="bg-steel min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-navy tracking-tight mb-4 uppercase">
            {lang === 'ro' ? 'Relații Investitori' : 'Investor Relations'}
          </h1>
          <p className="text-xl text-navy/60 font-medium max-w-2xl">
            {lang === 'ro' 
              ? 'Transparență, conformitate și performanță sustenabilă pentru partenerii noștri financiari.' 
              : 'Transparency, compliance, and sustainable performance for our financial partners.'}
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}
