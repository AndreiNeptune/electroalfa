import Link from 'next/link';

export default function ProductsPage({ params: { lang } }: { params: { lang: string } }) {
  const categories = [
    { id: 'medium-voltage', title: 'Medium Voltage', href: `/${lang}/products/medium-voltage`, description: 'Reliable equipment for medium voltage power distribution.' },
    { id: 'low-voltage', title: 'Low Voltage', href: `/${lang}/products/low-voltage`, description: 'Safe and efficient low voltage solutions for your projects.' },
    { id: 'steel-parts', title: 'Steel Parts', href: `/${lang}/products/steel-parts`, description: 'Precision engineered steel components and structures.' },
  ];

  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-black text-navy mb-8 text-center uppercase tracking-tight">
          {lang === 'ro' ? 'Gama de Produse' : 'Product Range'}
        </h1>
        <p className="text-xl text-navy/70 max-w-3xl mx-auto text-center mb-16 font-light">
          {lang === 'ro' 
            ? 'Explorați portofoliul nostru vast de echipamente electrice și soluții industriale proiectate pentru performanță.' 
            : 'Explore our vast portfolio of electrical equipment and industrial solutions designed for performance.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href}
              className="bg-white p-10 rounded-3xl border border-steel-dark shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <h2 className="text-3xl font-black text-navy mb-4 relative z-10 group-hover:text-orange transition-colors">
                {cat.title}
              </h2>
              <p className="text-navy/80 font-medium leading-relaxed relative z-10">
                {cat.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-navy uppercase tracking-widest relative z-10">
                {lang === 'ro' ? 'Vezi Produse' : 'Browse Category'}
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
