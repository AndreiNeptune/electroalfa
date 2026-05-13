import { getProductsByCategory } from '@/lib/sanity/client';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Box } from 'lucide-react';

export default async function CategoryPage({
  params: { lang, category },
}: {
  params: { lang: string; category: string };
}) {
  const products = await getProductsByCategory(category);

  const validCategories = ['medium-voltage', 'low-voltage', 'steel-parts'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryInfo: { [key: string]: { ro: string; en: string; image: string } } = {
    'medium-voltage': { 
      ro: 'Medie Tensiune', 
      en: 'Medium Voltage',
      image: 'https://electroalfa.ro/i/elements/50/ro/img-div-slider-3-01.png'
    },
    'low-voltage': { 
      ro: 'Joasă Tensiune', 
      en: 'Low Voltage',
      image: 'https://electroalfa.ro/i/elements/275/ro/img-div-slider-1-1.png'
    },
    'steel-parts': { 
      ro: 'Confecții Metalice', 
      en: 'Steel Parts',
      image: 'https://electroalfa.ro/i/elements/275/ro/img-div-slider-2.png'
    },
  };

  const info = categoryInfo[category];
  const title = info?.[lang as 'ro' | 'en'] || category;

  return (
    <main className="min-h-screen pb-24">
      {/* Category Hero Section */}
      <section className="relative h-[35vh] flex items-end overflow-hidden mb-16 bg-navy">
        <div className="absolute inset-0">
          <Image 
            src={info.image}
            alt={title}
            fill
            className="object-cover opacity-20 blur-sm scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-12">
          <Link 
            href={`/${lang}/products`}
            className="inline-flex items-center gap-2 text-steel/70 hover:text-orange transition-colors font-bold uppercase tracking-widest text-xs mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {lang === 'ro' ? 'Înapoi la Produse' : 'Back to Products'}
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            {title}
          </h1>
          <div className="w-24 h-2 bg-orange mt-6 rounded-full" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-steel-dark p-20 text-center flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-5" />
            <div className="w-20 h-20 bg-steel rounded-2xl flex items-center justify-center mb-6 text-navy/40 relative z-10">
              <Box size={40} />
            </div>
            <h2 className="text-3xl font-black text-navy mb-4 relative z-10">
              {lang === 'ro' ? 'Niciun produs găsit' : 'No products found'}
            </h2>
            <p className="text-navy/60 max-w-md mx-auto font-medium relative z-10">
              {lang === 'ro' 
                ? 'Momentan nu există produse în această categorie. Vă rugăm să reveniți curând sau să ne contactați pentru soluții personalizate.' 
                : 'There are currently no products in this category. Please check back soon or contact us for custom solutions.'}
            </p>
            <Link 
              href={`/${lang}/contact`}
              className="mt-8 bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-orange transition-colors relative z-10"
            >
              {lang === 'ro' ? 'Cere Oferta' : 'Request Offer'}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
