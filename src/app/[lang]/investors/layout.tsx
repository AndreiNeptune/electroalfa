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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-navy tracking-tight mb-8 uppercase">
              {lang === 'ro' ? 'Relații Investitori' : 'Investor Relations'}
            </h1>
            <div className="space-y-6 text-lg text-navy/70 font-medium leading-relaxed">
              <p>
                {lang === 'ro' 
                  ? 'Această secțiune este dedicată furnizării de informații relevante privind activitatea companiei, performanța financiară și structura de guvernanță corporativă.' 
                  : 'This section is dedicated to providing relevant information regarding company activity, financial performance, and corporate governance structure.'}
              </p>
              <p>
                {lang === 'ro'
                  ? 'Electroalfa este o companie cu capital majoritar românesc, având peste 35 de ani de experiență în infrastructura energetică.'
                  : 'Electroalfa is a company with majority Romanian capital, having over 35 years of experience in energy infrastructure.'}
              </p>
              
              <div className="bg-white p-6 rounded-2xl border border-steel-dark shadow-sm inline-flex items-center gap-4">
                <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center font-black">BVB</div>
                <div>
                  <div className="text-sm font-bold text-navy/40 uppercase tracking-widest">{lang === 'ro' ? 'Simbol Bursier' : 'Stock Symbol'}</div>
                  <div className="text-xl font-black text-navy tracking-tight">EAI</div>
                </div>
                <div className="h-10 w-px bg-steel-dark mx-2" />
                <div>
                  <div className="text-sm font-bold text-navy/40 uppercase tracking-widest">{lang === 'ro' ? 'Listat din' : 'Listed since'}</div>
                  <div className="text-xl font-black text-navy tracking-tight">03.03.2026</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-steel-dark bg-navy group">
             <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/qe4A0OKD-u0" 
                title="Electroalfa - Investitori" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
             ></iframe>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
