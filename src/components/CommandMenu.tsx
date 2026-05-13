'use client';
import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, FileText, Zap, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { searchAll } from '@/lib/sanity/client';

interface SearchProduct {
  _id: string;
  title: string;
  slug: string;
  category: {
    title: string;
    slug: string;
  };
}

interface SearchInvestor {
  _id: string;
  title: string;
  category: string;
  date: string;
}

interface SearchNews {
  _id: string;
  title: string;
  slug: string;
  date: string;
}

interface SearchResults {
  products: SearchProduct[];
  investors: SearchInvestor[];
  news: SearchNews[];
}

export default function CommandMenu({ lang, isDark }: { lang: string; isDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResults>({ products: [], investors: [], news: [] });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed or custom event is fired
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ search?: string }>;
      setOpen(true);
      if (customEvent.detail?.search) {
        setSearch(customEvent.detail.search);
      }
    };

    document.addEventListener('keydown', down);
    window.addEventListener('open-command-menu', handleOpen);
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-menu', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (!search || search.length < 2) {
      setResults({ products: [], investors: [], news: [] });
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      const data = await searchAll(search, lang);
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, lang]);

  const onSelect = (path: string) => {
    router.push(path);
    setOpen(false);
    setSearch('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 transition-all duration-300 rounded-lg border backdrop-blur-sm ${
          isDark 
            ? 'bg-white/10 border-white/30 text-white/70 hover:text-white hover:border-white' 
            : 'bg-white/50 border-steel-dark text-navy/60 hover:text-navy hover:border-orange'
        }`}
      >
        <Search size={16} />
        <span className="text-sm font-medium hidden md:inline">Search</span>
        <kbd className={`hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 ${
          isDark ? 'bg-white/10 border-white/20 text-white/50' : 'bg-steel border-steel-dark text-navy/40'
        }`}>
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-navy/20 backdrop-blur-sm"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-steel-dark overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
        >
          <div className="flex items-center px-4 border-b border-steel-dark">
            <Search className="text-navy/40 mr-3" size={20} />
            <Command.Input
              autoFocus
              placeholder="Search products, reports, news..."
              value={search}
              onValueChange={setSearch}
              className="w-full py-4 text-lg outline-none text-navy placeholder:text-navy/30"
            />
            {loading && <Loader2 className="animate-spin text-navy/40 ml-3" size={20} />}
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-navy/60">
              <div className="flex flex-col items-center gap-2">
                <Search size={32} className="opacity-20" />
                <p>No results found for &quot;{search}&quot;</p>
              </div>
            </Command.Empty>

            {results.products.length > 0 && (
              <Command.Group heading="Products" className="text-xs font-bold text-navy/40 uppercase tracking-widest px-3 py-2">
                {results.products.map((item) => (
                  <Command.Item
                    key={item._id}
                    onSelect={() => onSelect(`/${lang}/products/${item.category?.slug || 'all'}/${item.slug}`)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-steel aria-selected:text-navy transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                      <Zap size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-navy group-aria-selected:text-navy">{item.title}</span>
                      <span className="text-xs text-navy/60">{item.category?.title || 'Product'}</span>
                    </div>
                    <ArrowRight className="ml-auto opacity-0 group-aria-selected:opacity-40" size={16} />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results.investors.length > 0 && (
              <Command.Group heading="Investor Reports" className="text-xs font-bold text-navy/40 uppercase tracking-widest px-3 py-2 mt-4">
                {results.investors.map((item) => (
                  <Command.Item
                    key={item._id}
                    onSelect={() => onSelect(`/${lang}/investors/${item.category}`)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-steel transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-navy">{item.title}</span>
                      <span className="text-xs text-navy/60">{item.date ? new Date(item.date).getFullYear() : 'Report'}</span>
                    </div>
                    <ArrowRight className="ml-auto opacity-0 group-aria-selected:opacity-40" size={16} />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results.news.length > 0 && (
              <Command.Group heading="News & Media" className="text-xs font-bold text-navy/40 uppercase tracking-widest px-3 py-2 mt-4">
                {results.news.map((item) => (
                  <Command.Item
                    key={item._id}
                    onSelect={() => onSelect(`/${lang}/news/${item.slug}`)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-steel transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-steel-dark text-navy flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-navy">{item.title}</span>
                      <span className="text-xs text-navy/60">{item.date}</span>
                    </div>
                    <ArrowRight className="ml-auto opacity-0 group-aria-selected:opacity-40" size={16} />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Quick Actions" className="text-xs font-bold text-navy/40 uppercase tracking-widest px-3 py-2 mt-4">
              <Command.Item
                onSelect={() => onSelect(`/${lang}/contact`)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-steel transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange text-white flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <span className="font-bold text-navy">Contact Sales</span>
              </Command.Item>
              <Command.Item
                onSelect={() => onSelect(`/${lang}/about#certifications`)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-steel transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-navy text-white flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <span className="font-bold text-navy">Download Certifications</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="p-3 border-t border-steel-dark bg-steel/50 flex items-center justify-between text-[10px] text-navy/40 font-bold uppercase tracking-widest">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">↑↓ Navigate</span>
              <span className="flex items-center gap-1">↵ Select</span>
            </div>
            <button 
              onPointerDown={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              className="hover:text-orange hover:bg-navy/5 px-2 py-1 rounded transition-all cursor-pointer flex items-center gap-1 group"
              title="Close Search"
            >
              <span className="group-hover:scale-110 transition-transform">ESC</span> to Close
            </button>
          </div>
        </div>
      </Command.Dialog>

      <style jsx global>{`
        [cmdk-group-heading] {
          padding-left: 12px;
          padding-bottom: 8px;
        }
      `}</style>
    </>
  );
}
