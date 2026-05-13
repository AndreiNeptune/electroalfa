import { notFound } from 'next/navigation';
import { getProductBySlug, formatBytes } from '@/lib/sanity/client';
import StickySidebar from '@/components/StickySidebar';
import { FileText, Zap, Ruler, ShieldCheck, Info } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { Metadata } from 'next';

type Props = {
  params: { lang: string; category: string; slug: string };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  const title = product.title?.[params.lang as keyof typeof product.title] || product.title?.['ro'];
  
  return {
    title: `${title} | Electroalfa`,
    description: `Technical specifications and details for ${title}.`,
    openGraph: {
      title: `${title} | Electroalfa`,
      description: `Technical specifications and details for ${title}.`,
    },
  };
}

export default async function ProductPage({
  params: { lang, slug },
}: Props) {
  // Fetch and strictly parse the product data
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Choose the title based on language
  const title = product.title?.[lang as keyof typeof product.title] || product.title?.['ro'] || 'Electroalfa Product';

  const sections = [
    { id: 'overview', label: lang === 'ro' ? 'Prezentare Generală' : 'Overview', icon: <Zap size={16} /> },
    { id: 'specifications', label: lang === 'ro' ? 'Specificații Tehnice' : 'Technical Specs', icon: <Ruler size={16} /> },
    { id: 'downloads', label: lang === 'ro' ? 'Descărcări' : 'Downloads', icon: <FileText size={16} /> },
    { id: 'certifications', label: lang === 'ro' ? 'Certificări' : 'Certifications', icon: <ShieldCheck size={16} /> },
  ];

  return (
    <main className="bg-steel min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column - Progress Tracker */}
        <aside className="hidden lg:block lg:col-span-3">
          <StickySidebar sections={sections} />
        </aside>

        {/* Right Column - Product Details */}
        <article className="col-span-1 lg:col-span-9 space-y-32">
          
          {/* Section: Overview */}
          <section id="overview" className="scroll-mt-32">
            <h1 className="text-4xl md:text-6xl font-black text-navy mb-8 tracking-tight">
              {title}
            </h1>
            
            {product.image?.url && (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl mb-12 border border-steel-dark bg-white">
                <Image
                  src={product.image.url}
                  alt={product.image.alt || title}
                  fill
                  className="object-contain p-8"
                />
              </div>
            )}
            
            <p className="text-xl text-navy/80 leading-relaxed font-light">
              {/* Note: This would typically come from a rich-text field parsed via PortableText */}
              {lang === 'ro' 
                ? 'Acest echipament reprezintă apogeul ingineriei industriale, proiectat pentru siguranță și performanță maximă în medii critice.'
                : 'This equipment represents the pinnacle of industrial engineering, designed for maximum safety and performance in critical environments.'}
            </p>
          </section>

          {/* Section: Specifications */}
          <section id="specifications" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-navy mb-8 border-b-2 border-orange inline-block pb-2">
              {lang === 'ro' ? 'Specificații Tehnice' : 'Technical Specifications'}
            </h2>
            
            {product.specifications && product.specifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-steel-dark border border-steel-dark rounded-2xl overflow-hidden shadow-sm">
                {product.specifications.map((spec, index) => {
                  const label = spec.label?.[lang as keyof typeof spec.label] || spec.label?.['ro'];
                  const value = spec.value?.[lang as keyof typeof spec.value] || spec.value?.['ro'];
                  
                  if (!label || !value) return null;

                  return (
                    <div 
                      key={spec._key} 
                      className={`group p-6 transition-all duration-200 border-l-4 border-transparent hover:border-orange flex flex-col gap-1 ${
                        Math.floor(index / 2) % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-navy/60">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-navy break-words [hyphens:auto]">
                        {value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/50 border border-dashed border-steel-dark rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-steel rounded-full flex items-center justify-center mb-4 text-navy/50">
                  <Info size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {lang === 'ro' ? 'Datele Tehnice în curs de actualizare' : 'Technical Data Updating'}
                </h3>
                <p className="text-navy/80 max-w-md mx-auto">
                  {lang === 'ro' 
                    ? 'Specificațiile detaliate pentru acest echipament sunt în curs de validare și vor fi publicate în curând. Vă rugăm să consultați fișa tehnică (dacă este disponibilă) sau să ne contactați pentru detalii.' 
                    : 'Detailed specifications for this equipment are currently being validated and will be published shortly. Please refer to the datasheet (if available) or contact us for details.'}
                </p>
              </div>
            )}
          </section>

          {/* Section: Downloads */}
          <section id="downloads" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-navy mb-8 border-b-2 border-orange inline-block pb-2">
              {lang === 'ro' ? 'Documentație și Descărcări' : 'Documentation & Downloads'}
            </h2>

            {product.datasheet?.url ? (
              <div className="bg-white p-8 rounded-2xl border border-steel-dark flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-orange/10 p-4 rounded-xl text-orange">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-navy">
                      {product.datasheet.originalFilename || 'Technical Datasheet'}
                    </h3>
                    <p className="text-sm text-navy/80 font-medium mt-1">
                      PDF Document • {formatBytes(product.datasheet.size)}
                    </p>
                  </div>
                </div>
                
                <a 
                  href={product.datasheet.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto"
                >
                  <Button variant="outline" className="w-full">
                    {lang === 'ro' ? 'Descarcă PDF' : 'Download PDF'}
                  </Button>
                </a>
              </div>
            ) : (
              <div className="bg-white/50 border border-dashed border-steel-dark rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-steel rounded-full flex items-center justify-center mb-4 text-navy/50">
                  <FileText size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {lang === 'ro' ? 'Documentație indisponibilă' : 'Documentation unavailable'}
                </h3>
                <p className="text-navy/80 max-w-md mx-auto">
                  {lang === 'ro' 
                    ? 'Fișa tehnică pentru acest produs nu a fost încă încărcată.' 
                    : 'The technical datasheet for this product has not been uploaded yet.'}
                </p>
              </div>
            )}
          </section>

          {/* Section: Certifications */}
          <section id="certifications" className="scroll-mt-32 pb-20">
            <h2 className="text-3xl font-bold text-navy mb-8 border-b-2 border-orange inline-block pb-2">
              {lang === 'ro' ? 'Certificări de Calitate' : 'Quality Certifications'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['ISO 9001', 'ISO 14001', 'OHSAS 18001', 'CE Marked'].map((cert) => (
                <div key={cert} className="bg-white border border-steel-dark rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <ShieldCheck size={32} className="text-navy/50" />
                  <span className="font-bold text-navy">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
