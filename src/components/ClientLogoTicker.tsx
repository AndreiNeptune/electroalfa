'use client';

import { motion } from 'framer-motion';

import { translations, Locale } from '@/lib/i18n/translations';

export default function ClientLogoTicker({ lang }: { lang: string }) {
  const t = translations[lang as Locale] || translations.en;
  // We'll use simple text for now, but these would be replaced with actual SVGs or Image components
  const clients = [
    "ABB", "Siemens", "Schneider Electric", "E.ON", "Enel", "Transelectrica", "CEZ Group", "OMV Petrom",
    "ABB", "Siemens", "Schneider Electric", "E.ON", "Enel", "Transelectrica", "CEZ Group", "OMV Petrom"
  ];

  return (
    <section className="py-16 bg-white border-b border-steel overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold text-navy uppercase tracking-widest">
          {t.trustedBy}
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
        >
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="mx-12 flex items-center justify-center text-2xl font-black text-navy opacity-40 hover:opacity-100 transition-all duration-300"
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
