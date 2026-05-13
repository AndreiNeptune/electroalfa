import Link from 'next/link';
import Image from 'next/image';
import { Factory, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProductsPage({ params: { lang } }: { params: { lang: string } }) {
  const categories = [
    { 
      id: 'medium-voltage', 
      title: lang === 'ro' ? 'Medie Tensiune' : 'Medium Voltage', 
      href: `/${lang}/products/medium-voltage`, 
      description: lang === 'ro' 
        ? 'Echipamente sigure și fiabile pentru distribuția energiei la medie tensiune.' 
        : 'Reliable equipment for medium voltage power distribution.',
      image: 'https://electroalfa.ro/i/elements/50/ro/img-div-slider-3-01.png',
      icon: Zap
    },
    { 
      id: 'low-voltage', 
      title: lang === 'ro' ? 'Joasă Tensiune' : 'Low Voltage', 
      href: `/${lang}/products/low-voltage`, 
      description: lang === 'ro'
        ? 'Soluții eficiente și sigure de joasă tensiune pentru proiectele tale.'
        : 'Safe and efficient low voltage solutions for your projects.',
      image: 'https://electroalfa.ro/i/elements/275/ro/img-div-slider-1-1.png',
      icon: ShieldCheck
    },
    { 
      id: 'steel-parts', 
      title: lang === 'ro' ? 'Confecții Metalice' : 'Steel Parts', 
      href: `/${lang}/products/steel-parts`, 
      description: lang === 'ro'
        ? 'Componente și structuri metalice de precizie, proiectate la standarde înalte.'
        : 'Precision engineered steel components and structures.',
      image: 'https://electroalfa.ro/i/elements/275/ro/img-div-slider-2.png',
      icon: Factory
    },
  ];

  return (
    <main className="min-h-screen pb-24">
      {/* Dynamic Header Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-16 bg-navy">
        <div className="absolute inset-0">
          <Image 
            src="https://electroalfa.ro/i/elements/301/ro/fabrica%20electroalfa%209%20(1)%20mob-01.png"
            alt="Electroalfa Factory"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy to-steel" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            {lang === 'ro' ? 'Gama de Produse' : 'Product Range'}
          </h1>
          <p className="text-xl text-steel/90 max-w-2xl mx-auto font-medium">
            {lang === 'ro' 
              ? 'Explorați portofoliul nostru vast de echipamente electrice și soluții industriale proiectate pentru performanță.' 
              : 'Explore our vast portfolio of electrical equipment and industrial solutions designed for performance.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href}
              className="group bg-white rounded-3xl border border-steel-dark shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Category Image Header */}
              <div className="relative h-64 overflow-hidden bg-steel/30">
                <Image 
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors" />
                
                {/* Floating Icon */}
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-navy shadow-lg z-20 group-hover:bg-orange group-hover:text-white transition-colors">
                  <cat.icon size={24} />
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-black text-navy mb-4 group-hover:text-orange transition-colors">
                  {cat.title}
                </h2>
                <p className="text-navy/70 font-medium leading-relaxed mb-8">
                  {cat.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-navy group-hover:text-orange uppercase tracking-widest transition-colors">
                  {lang === 'ro' ? 'Vezi Produse' : 'Browse Category'}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Catalog Teaser */}
        <div className="mt-20 bg-navy rounded-3xl p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
              {lang === 'ro' ? 'Aveți nevoie de un produs personalizat?' : 'Need a custom solution?'}
            </h3>
            <p className="text-steel/80 font-medium">
              {lang === 'ro' 
                ? 'Echipa noastră de ingineri vă poate ajuta cu soluții adaptate nevoilor dumneavoastră.' 
                : 'Our engineering team can help you with solutions tailored to your specific needs.'}
            </p>
          </div>
          <Link 
            href={`/${lang}/contact`}
            className="relative z-10 bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-xl font-black tracking-wide transition-colors whitespace-nowrap shadow-lg"
          >
            {lang === 'ro' ? 'Contactează un Specialist' : 'Contact a Specialist'}
          </Link>
        </div>
      </div>
    </main>
  );
}
