'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/validations/sanity';
import { ArrowRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: string;
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const title = product.title?.[lang as keyof typeof product.title] || product.title?.['ro'] || 'Product';
  const categorySlug = product.category?.slug || 'general';

  // Get first 3 specs for Quick View
  const quickSpecs = product.specifications?.slice(0, 3) || [];

  return (
    <div className="group relative bg-white border border-steel-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Blueprint background for empty space */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

      <div className="relative aspect-square bg-steel/30 flex items-center justify-center p-6 border-b border-steel-dark overflow-hidden">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || title}
            fill
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-24 h-24 bg-steel-dark/20 rounded-full" />
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-navy/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white text-center">
          <Eye size={32} className="text-orange mb-4" />
          <h4 className="font-bold mb-4 uppercase tracking-wider text-sm border-b border-white/20 pb-2">Quick Specs</h4>
          <ul className="text-sm space-y-2 w-full text-left">
            {quickSpecs.map(spec => {
              const k = spec.label?.[lang as keyof typeof spec.label] || spec.label?.['ro'];
              const v = spec.value?.[lang as keyof typeof spec.value] || spec.value?.['ro'];
              if (!k || !v) return null;
              return (
                <li key={spec._key} className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/60">{k}</span>
                  <span className="font-semibold">{v}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10 bg-white">
        <span className="text-xs font-bold text-orange uppercase tracking-wider mb-2">
          {product.category?.title || 'Product'}
        </span>
        <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-orange transition-colors">
          {title}
        </h3>

        <div className="mt-auto pt-6 border-t border-steel flex items-center justify-between">
          <Link 
            href={`/${lang}/products/${categorySlug}/${product.slug}`}
            className="flex items-center gap-2 text-sm font-bold text-navy hover:text-orange transition-colors"
          >
            {lang === 'ro' ? 'Vezi Detalii' : 'View Details'}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
