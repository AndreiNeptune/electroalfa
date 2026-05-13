'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Locale } from '@/lib/i18n/translations';
import CommandMenu from './CommandMenu';

export default function Header({ lang }: { lang: string }) {
  const t = translations[lang as Locale] || translations.en;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Locale switcher logic for 5 languages
  const locales = ['ro', 'en', 'de', 'fr', 'it'];
  const nextLocale = locales[(locales.indexOf(lang) + 1) % locales.length];
  const togglePath = pathname.replace(`/${lang}`, `/${nextLocale}`);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: `/${lang}` },
    { 
      name: t.products, 
      href: `/${lang}/products`,
      hasMegaMenu: true,
      items: [
        { name: t.mediumVoltage, href: `/${lang}/products/medium-voltage` },
        { name: t.lowVoltage, href: `/${lang}/products/low-voltage` },
        { name: t.steelParts, href: `/${lang}/products/steel-parts` },
      ]
    },
    { 
      name: t.solutions, 
      href: `/${lang}/solutions`,
      hasMegaMenu: true,
      items: [
        { name: t.energy, href: `/${lang}/solutions/energy` },
        { name: t.industry, href: `/${lang}/solutions/industry` },
        { name: t.infrastructure, href: `/${lang}/solutions/infrastructure` },
        { name: t.oilGas, href: `/${lang}/solutions/oil-gas` },
      ]
    },
    { name: t.about, href: `/${lang}/about` },
    { name: lang === 'ro' ? 'Noutăți' : 'News', href: `/${lang}/news` },
    { name: lang === 'ro' ? 'Investitori' : 'Investors', href: `/${lang}/investors` },
    { name: t.contact, href: `/${lang}/contact` },
  ];

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isProductsPage = pathname.includes(`/${lang}/products`);
  const isAboutPage = pathname.includes(`/${lang}/about`);
  const isDarkHeroContext = (isHomePage || isProductsPage || isAboutPage) && !isScrolled;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative z-50 flex items-center gap-2">
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isDarkHeroContext ? 'text-white' : 'text-navy'}`}>
            ELECTROALFA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.hasMegaMenu && setActiveDesktopMenu(link.name)}
              onMouseLeave={() => link.hasMegaMenu && setActiveDesktopMenu(null)}
            >
              <Link 
                href={link.href}
                className={`flex items-center gap-1 font-semibold text-sm transition-colors duration-300 ${
                  isDarkHeroContext ? 'text-white/90 hover:text-white' : 'text-navy hover:text-orange'
                }`}
              >
                {link.name}
                {link.hasMegaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </Link>

              {/* Desktop Mega Menu */}
              {link.hasMegaMenu && (
                <AnimatePresence>
                  {activeDesktopMenu === link.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-white rounded-xl shadow-xl border border-steel p-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
                      <div className="relative z-10 flex flex-col">
                        {link.items?.map(item => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="px-4 py-3 text-sm font-medium text-navy hover:bg-steel hover:text-orange rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Global Search */}
          <CommandMenu lang={lang} isDark={isDarkHeroContext} />

          {/* Language Toggle */}
          <Link 
            href={togglePath} 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-300 ${
              isDarkHeroContext 
                ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
                : 'border-steel-dark text-navy hover:border-orange hover:text-orange' 
            }`}
          >
            <Globe size={14} />
            <span className="text-xs font-bold uppercase">{lang}</span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 relative z-50">
          <CommandMenu lang={lang} isDark={isDarkHeroContext || mobileMenuOpen} />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`transition-colors duration-300 ${isDarkHeroContext || mobileMenuOpen ? 'text-white' : 'text-navy'}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto pt-24 pb-12 px-6"
          >
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-steel pb-4">
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-navy hover:text-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.hasMegaMenu && (
                    <div className="mt-4 flex flex-col gap-3 pl-4 border-l-2 border-orange">
                      {link.items?.map(item => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium text-navy/70 hover:text-navy transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
