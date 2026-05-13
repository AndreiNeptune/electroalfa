import { getProductsByCategory } from '@/lib/sanity/client';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params: { lang, category },
}: {
  params: { lang: string; category: string };
}) {
  const products = await getProductsByCategory(category);

  // If no products found, we might want to check if the category exists or just show an empty state
  // For now, if it's not one of our known categories, show 404
  const validCategories = ['medium-voltage', 'low-voltage', 'steel-parts'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const categoryTitles: { [key: string]: { ro: string; en: string } } = {
    'medium-voltage': { ro: 'Tensiune Medie', en: 'Medium Voltage' },
    'low-voltage': { ro: 'Tensiune Joasă', en: 'Low Voltage' },
    'steel-parts': { ro: 'Confecții Metalice', en: 'Steel Parts' },
  };

  const title = categoryTitles[category]?.[lang as 'ro' | 'en'] || category;

  return (
    <main className="bg-steel min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <nav className="flex items-center gap-2 text-sm font-bold text-navy/70 uppercase tracking-widest mb-4">
              <Link href={`/${lang}/products`} className="hover:text-navy transition-colors">
                {lang === 'ro' ? 'Produse' : 'Products'}
              </Link>
              <span>/</span>
              <span className="text-navy">{title}</span>
            </nav>
            <h1 className="text-5xl font-black text-navy uppercase tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-navy/80 font-semibold max-w-md text-right">
            {lang === 'ro' 
              ? `Descoperiți gama noastră de echipamente pentru ${title}.` 
              : `Discover our range of equipment for ${title}.`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-steel-dark p-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-steel rounded-full flex items-center justify-center mb-6 text-navy/40 text-4xl">
              📦
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">
              {lang === 'ro' ? 'Niciun produs găsit' : 'No products found'}
            </h2>
            <p className="text-navy/80 max-w-md mx-auto">
              {lang === 'ro' 
                ? 'Momentan nu există produse în această categorie. Vă rugăm să reveniți curând.' 
                : 'There are currently no products in this category. Please check back soon.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Added missing Link import
import Link from 'next/link';
