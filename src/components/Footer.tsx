import Link from 'next/link';
import { translations, Locale } from '@/lib/i18n/translations';

export default function Footer({ lang }: { lang: string }) {
  const t = translations[lang as Locale] || translations.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter mb-6 text-white">ELECTROALFA</h2>
            <p className="text-steel/90 mb-6 font-light leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange uppercase tracking-wider">
              {t.company}
            </h3>
            <ul className="space-y-4">
              <li><Link href={`/${lang}/about`} className="text-steel/90 hover:text-white transition-colors">{t.about}</Link></li>
              <li><Link href={`/${lang}/investors`} className="text-steel/90 hover:text-white transition-colors">{lang === 'ro' ? 'Investitori' : 'Investors'}</Link></li>
              <li><Link href={`/${lang}/careers`} className="text-steel/90 hover:text-white transition-colors">{t.careers}</Link></li>
              <li><Link href={`/${lang}/news`} className="text-steel/90 hover:text-white transition-colors">{t.news || (lang === 'ro' ? 'Noutăți' : 'News')}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-steel/90 hover:text-white transition-colors">{t.contact}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange uppercase tracking-wider">
              {t.products}
            </h3>
            <ul className="space-y-4">
              <li><Link href={`/${lang}/products/medium-voltage`} className="text-steel/90 hover:text-white transition-colors">{t.mediumVoltage}</Link></li>
              <li><Link href={`/${lang}/products/low-voltage`} className="text-steel/90 hover:text-white transition-colors">{t.lowVoltage}</Link></li>
              <li><Link href={`/${lang}/products/steel-parts`} className="text-steel/90 hover:text-white transition-colors">{t.steelParts}</Link></li>
              <li><Link href={`/${lang}/solutions`} className="text-steel/90 hover:text-white transition-colors">{t.solutions}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-orange uppercase tracking-wider">{t.contact} HQ</h3>
            <address className="not-italic text-steel/90 space-y-4 font-light">
              <p>
                <strong className="text-white font-semibold">Botoșani, România</strong><br />
                Str. Manolești Deal, Nr. 33
              </p>
              <p>
                <a href="mailto:office@electroalfa.ro" className="hover:text-white transition-colors">office@electroalfa.ro</a><br />
                <a href="tel:+40231532186" className="hover:text-white transition-colors">+40 231 532 186</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-steel/60">
          <p>© {currentYear} Electroalfa. {t.allRights}</p>
          <div className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
