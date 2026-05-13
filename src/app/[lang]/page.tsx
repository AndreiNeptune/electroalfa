import Link from "next/link";
import StatsCounter from "@/components/StatsCounter";
import ClientLogoTicker from "@/components/ClientLogoTicker";
import { translations, homeTranslations, Locale } from '@/lib/i18n/translations';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const t = translations[lang as Locale] || translations.en;
  const h = homeTranslations[lang as Locale] || homeTranslations.en;

  return (
    <main className="min-h-screen">
      {/* Industrial Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-navy">
          <Image 
            src="https://electroalfa.ro/i/elements/301/ro/fabrica%20electroalfa%209%20(1)%20mob-01.png" 
            alt="Electroalfa Industrial Facility" 
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy" />
        </div>

        {/* Blurred Glass Overlay */}
        <div className="relative z-10 p-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center max-w-4xl mx-4 shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Electroalfa
          </h1>
          <p className="text-xl md:text-2xl text-steel mb-8 font-light">
            {h.heroSub}
          </p>
          <Link 
            href={`/${lang}/products`}
            className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-black tracking-wide drop-shadow-sm text-lg transition-colors inline-block"
          >
            {h.heroBtn}
          </Link>
        </div>
      </section>

      {/* Client Logo Ticker */}
      <ClientLogoTicker lang={lang} />

      {/* Bento Grid Teaser */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-navy mb-12 text-center">
           {h.solutionsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <Link 
            href={`/${lang}/products/medium-voltage`}
            className="col-span-1 md:col-span-2 bg-white border border-steel-dark rounded-3xl p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end"
          >
             <div className="absolute inset-0 grayscale group-hover:grayscale-0 opacity-10 group-hover:opacity-20 transition-all duration-500 scale-110 group-hover:scale-100">
                <Image src="https://electroalfa.ro/i/elements/50/ro/img-div-slider-3-01.png" alt="" fill className="w-full h-full object-cover" />
             </div>
            <div className="absolute top-8 right-8 w-12 h-12 bg-steel rounded-full flex items-center justify-center text-navy group-hover:bg-orange group-hover:text-white transition-colors z-20">
              <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-navy mb-2 group-hover:text-orange transition-colors">{t.mediumVoltage}</h3>
              <p className="text-navy/70 font-medium max-w-md">{lang === 'ro' ? 'Echipamente sigure pentru distribuția energiei.' : 'Reliable equipment for power distribution.'}</p>
            </div>
          </Link>
          <Link 
            href={`/${lang}/products/low-voltage`}
            className="bg-white border border-steel-dark rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-end"
          >
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 opacity-10 group-hover:opacity-20 transition-all duration-500 scale-110 group-hover:scale-100">
                 <Image src="https://electroalfa.ro/i/elements/275/ro/img-div-slider-1-1.png" alt="" fill className="w-full h-full object-cover" />
              </div>
             <div className="absolute top-8 right-8 w-12 h-12 bg-steel rounded-full flex items-center justify-center text-navy group-hover:bg-orange group-hover:text-white transition-colors z-20">
               <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
             </div>
             <div className="relative z-10">
               <h3 className="text-3xl font-black text-navy mb-2 group-hover:text-orange transition-colors">{t.lowVoltage}</h3>
               <p className="text-navy/70 font-medium">{lang === 'ro' ? 'Soluții eficiente de joasă tensiune.' : 'Efficient low voltage solutions.'}</p>
             </div>
          </Link>
          <Link 
            href={`/${lang}/products/steel-parts`}
            className="bg-white border border-steel-dark rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-end"
          >
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 opacity-10 group-hover:opacity-20 transition-all duration-500 scale-110 group-hover:scale-100">
                 <Image src="https://electroalfa.ro/i/elements/275/ro/img-div-slider-2.png" alt="" fill className="w-full h-full object-cover" />
              </div>
             <div className="absolute top-8 right-8 w-12 h-12 bg-steel rounded-full flex items-center justify-center text-navy group-hover:bg-orange group-hover:text-white transition-colors z-20">
               <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
             </div>
             <div className="relative z-10">
               <h3 className="text-3xl font-black text-navy mb-2 group-hover:text-orange transition-colors">{t.steelParts}</h3>
               <p className="text-navy/70 font-medium">{lang === 'ro' ? 'Confecții și structuri metalice.' : 'Metal structures and parts.'}</p>
             </div>
          </Link>
          <Link 
            href={`/${lang}/solutions`}
            className="col-span-1 md:col-span-2 bg-navy text-white rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
             <div className="absolute inset-0 bg-grid opacity-20"></div>
             <h3 className="text-2xl font-bold relative z-10">{h.turnkeyTitle}</h3>
             <p className="mt-4 text-steel/90 relative z-10">{h.turnkeyDesc}</p>
          </Link>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter lang={lang} />
    </main>
  );
}
