'use client';

import { translations, Locale } from '@/lib/i18n/translations';
import { ShieldCheck, Target, Rocket, Users, Globe, Building2, Factory, Wind, Container } from 'lucide-react';
import Image from 'next/image';
import DivisionCard from '@/components/DivisionCard';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const t = translations[lang as Locale] || translations.en;
  
  const divisions = [
    {
      title: t.divElectrical,
      description: t.divElectricalDesc,
      icon: Factory,
      image: 'https://electroalfa.ro/i/elements/50/en/img-div-slider-3-01.png'
    },
    {
      title: t.divEpc,
      description: t.divEpcDesc,
      icon: Building2,
      image: 'https://electroalfa.ro/i/elements/52/en/epc-01.png'
    },
    {
      title: t.divGreen,
      description: t.divGreenDesc,
      icon: Wind,
      image: 'https://electroalfa.ro/i/elements/53/en/img-div-slider-4.webp'
    },
    {
      title: t.divShelters,
      description: t.divSheltersDesc,
      icon: Container,
      image: 'https://electroalfa.ro/i/elements/54/en/png-01.png'
    }
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <Image 
            src="https://electroalfa.ro/i/elements/301/en/fabrica%20electroalfa%209%20(1)-01.png" 
            alt="Electroalfa Factory" 
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            {t.aboutTitle}
          </h1>
          <p className="text-xl md:text-2xl text-steel font-light leading-relaxed">
            {t.aboutDescription}
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values - Bento Layout */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-10 rounded-3xl border border-steel-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-black text-navy mb-4 uppercase tracking-tight">
                {t.missionTitle}
              </h2>
              <p className="text-navy/80 leading-relaxed font-medium">
                {t.missionDesc}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-navy p-10 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket size={120} className="text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange mb-6">
                <Rocket size={24} />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                {t.visionTitle}
              </h2>
              <p className="text-steel/90 leading-relaxed font-medium">
                {t.visionDesc}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white p-10 rounded-3xl border border-steel-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShieldCheck size={120} />
             </div>
             <div className="relative z-10">
               <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                 <ShieldCheck size={24} />
               </div>
               <h2 className="text-3xl font-black text-navy mb-4 uppercase tracking-tight">
                 {t.valuesTitle}
               </h2>
               <p className="text-navy/80 leading-relaxed font-medium">
                 {t.valuesDesc}
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="my-12">
        <StatsCounter lang={lang} />
      </div>

      {/* Divisions Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-navy uppercase tracking-tight mb-4">
            {t.divisionsTitle}
          </h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {divisions.map((div, i) => (
            <DivisionCard 
              key={div.title}
              title={div.title}
              description={div.description}
              icon={div.icon}
              image={div.image}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Project/Brand Info - Clean Layout */}
      <section className="py-24 bg-steel">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video border border-steel-dark bg-white">
              <Image 
                src="https://electroalfa.ro/i/elements/50/ro/img-div-slider-3-01.png" 
                alt="Electroalfa Operations" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black text-navy mb-8 uppercase tracking-tight leading-tight">
              {lang === 'ro' 
                ? 'Business autohton, performanță recunoscută la nivel internațional' 
                : 'Locally grown business, internationally recognized performance'}
            </h2>
            <p className="text-xl text-navy/70 leading-relaxed mb-8 font-medium">
              {lang === 'ro'
                ? 'De peste 35 de ani, Electroalfa transformă viziunile în realitate, contribuind la evoluția industriei cu soluții tehnologice avansate.'
                : 'For over 35 years, Electroalfa has been turning visions into reality, contributing to the industry\'s evolution with advanced technological solutions.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-steel-dark shadow-sm">
                <div className="w-12 h-12 bg-navy text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-navy">500+</span>
                  <span className="text-sm font-bold text-navy/60 uppercase">{lang === 'ro' ? 'Experți' : 'Experts'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-steel-dark shadow-sm">
                <div className="w-12 h-12 bg-orange text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-navy">Global</span>
                  <span className="text-sm font-bold text-navy/60 uppercase">{lang === 'ro' ? 'Prezență' : 'Presence'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
