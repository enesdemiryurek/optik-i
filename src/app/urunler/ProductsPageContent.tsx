'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterState, SortOption, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import SidebarFilter from '@/components/products/SidebarFilter';
import FadeIn from '@/components/ui/FadeIn';
import API from '@/lib/api';

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');

  const [filters, setFilters] = useState<FilterState>({
    gender: [], category: categoryParam ? [categoryParam] : [],
    color: [], brand: [], searchQuery: queryParam || '',
  });
  
  const [sort, setSort] = useState<SortOption>('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [showCount, setShowCount] = useState(50);
  const [activeSort, setActiveSort] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(API.products).then(r => r.json()).then(d => { if (Array.isArray(d)) setProducts(d); }).catch(() => {});
  }, []);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryParam ? [categoryParam] : prev.category,
      searchQuery: queryParam || '',
    }));
  }, [categoryParam, queryParam]);

  const hasMore = showCount < products.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setShowCount(prev => prev + 50);
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.model.toLowerCase().includes(q)) {
          return false;
        }
      }
      
      if (filters.gender.length > 0) {
        const hasMen = filters.gender.includes('men');
        const hasWomen = filters.gender.includes('women');
        const hasChild = filters.gender.includes('child');
        const hasUnisex = filters.gender.includes('unisex');
        
        let matches = filters.gender.includes(p.gender);
        // If men or women selected, also show unisex
        if ((hasMen || hasWomen) && p.gender === 'unisex') matches = true;
        
        if (!matches) return false;
      }
      if (filters.category.length > 0 && !filters.category.includes(p.category)) return false;
      if (filters.color.length > 0 && p.specs?.color && !filters.color.includes(p.specs.color)) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
      
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (p.price < min || p.price > max) return false;
      }
      
      return true;
    });
    
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name, 'tr')); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [products, filters, sort]);

  const visibleProducts = filteredProducts.slice(0, showCount);
  const hasMoreFiltered = showCount < filteredProducts.length;

  const removeFilter = (key: keyof FilterState, value?: string) => {
    if (key === 'priceRange') {
      const newFilters = { ...filters };
      delete newFilters.priceRange;
      setFilters(newFilters);
    } else if (key === 'searchQuery') {
      setFilters(prev => ({ ...prev, searchQuery: '' }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: (prev[key] as string[]).filter(v => v !== value)
      }));
    }
  };

  const getActiveFilterPills = () => {
    const pills: { key: keyof FilterState; value: string; label: string }[] = [];
    
    const labelMap: Record<string, string> = {
      men: 'Erkek', women: 'Kadın', unisex: 'Unisex', child: 'Çocuk',
      sunglasses: 'Güneş Gözlüğü', prescription: 'Numaralı Gözlük', lenses: 'Lens', accessories: 'Aksesuar', kids: 'Çocuk Gözlük',
      black: 'Siyah', gold: 'Gold', silver: 'Gümüş', tortoise: 'Kaplumbağa', brown: 'Kahverengi', blue: 'Mavi'
    };

    ['gender', 'category', 'color', 'brand'].forEach(key => {
      (filters[key as keyof FilterState] as string[]).forEach(val => {
        pills.push({
          key: key as keyof FilterState,
          value: val,
          label: labelMap[val] || val
        });
      });
    });

    if (filters.priceRange) {
      pills.push({
        key: 'priceRange',
        value: 'priceRange',
        label: `${filters.priceRange[0]}₺ - ${filters.priceRange[1]}₺`
      });
    }

    if (filters.searchQuery) {
      pills.push({
        key: 'searchQuery',
        value: 'searchQuery',
        label: `Arama: "${filters.searchQuery}"`
      });
    }

    return pills;
  };

  const activePills = getActiveFilterPills();

  return (
    <div className="bg-[#fdfdfd] min-h-screen">
      <section className="relative bg-muted-bg border-b border-border py-32 overflow-hidden">
        {/* Subtle decorative arch in background */}
        <div className="absolute top-0 right-0 w-[40vw] h-[80vh] bg-background arch-shape-inverted opacity-40 pointer-events-none -translate-y-1/2" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="page-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-6">
            <span className="inline-block w-6 h-[1px] bg-primary" />
            CADDE OPTİK KOLEKSİYON
            <span className="inline-block w-6 h-[1px] bg-primary" />
          </span>
          <h1 className="font-serif text-5xl md:text-[4rem] font-medium text-foreground tracking-tight mb-8">
            Zarafet ve <span className="text-primary font-light italic pr-2">Görüşün</span> Buluşması
          </h1>
          <p className="text-muted text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Dünyanın en prestijli markalarından özenle seçilmiş güneş gözlükleri, numaralı çerçeveler ve profesyonel optik çözümler.
          </p>
        </motion.div>
      </section>

      <section className="pt-20 pb-12">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 max-w-full mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
            {/* LEFT SIDEBAR */}
            <div className="hidden lg:block lg:col-span-1">
              <SidebarFilter filters={filters} onChange={setFilters} products={products} />
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-4 w-full">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-medium tracking-wide shadow-lg shadow-black/10 active:scale-[0.98] transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  FİLTRELER
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-4 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <span className="text-[13px] text-gray-500 font-medium mr-2">
                    1-{Math.min(showCount, filteredProducts.length)} / {filteredProducts.length} sonuç
                  </span>
                  
                  <AnimatePresence>
                    {activePills.map(pill => (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        key={`${pill.key}-${pill.value}`} 
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-100 transition-colors cursor-pointer group"
                        onClick={() => removeFilter(pill.key, pill.value)}
                      >
                        {pill.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-red-500 transition-colors">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  
                  {activePills.length > 0 && (
                    <button 
                      onClick={() => { setFilters({ gender: [], category: [], color: [], brand: [] }); }}
                      className="text-sm font-medium text-gray-500 hover:text-black hover:underline underline-offset-4 ml-2 transition-colors"
                    >
                      Sıfırla
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div 
                    className="relative group z-30"
                    onMouseEnter={() => setActiveSort(true)}
                    onMouseLeave={() => setActiveSort(false)}
                  >
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] uppercase tracking-wide font-semibold transition-all duration-300 ${
                        activeSort || sort !== 'newest'
                          ? 'border-black text-black bg-white shadow-sm' 
                          : 'border-gray-200 text-gray-600 bg-transparent hover:border-black hover:text-black'
                      }`}
                    >
                      Sırala: {sort === 'newest' ? 'Öne Çıkanlar' : sort === 'price-asc' ? 'Fiyat (Artan)' : sort === 'price-desc' ? 'Fiyat (Azalan)' : 'A-Z'}
                      <motion.svg animate={{ rotate: activeSort ? 180 : 0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={activeSort || sort !== 'newest' ? "text-black" : "text-gray-400"}><polyline points="6 9 12 15 18 9" /></motion.svg>
                    </button>

                    <AnimatePresence>
                      {activeSort && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden"
                        >
                          <div className="py-2">
                            {[
                              { value: 'newest', label: 'Öne Çıkanlar' },
                              { value: 'price-asc', label: 'Fiyat (Düşükten Yükseğe)' },
                              { value: 'price-desc', label: 'Fiyat (Yüksekten Düşüğe)' },
                              { value: 'name-asc', label: 'Alfabetik (A-Z)' },
                            ].map(opt => (
                              <button
                                key={opt.value}
                                onClick={() => { setSort(opt.value as SortOption); setActiveSort(false); }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${sort === opt.value ? 'bg-gray-50 text-black font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                {visibleProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-6 gap-y-8 sm:gap-y-10">
                    {visibleProducts.map((p, index) => (
                      <FadeIn key={p.id} delay={(index % 6) * 0.05} direction="up">
                        <ProductCard product={p} />
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-32 bg-white rounded-xl border border-gray-100"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Eşleşen Ürün Bulunamadı</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">Seçtiğiniz filtrelere uygun bir ürün stoklarımızda yer almıyor.</p>
                    <button onClick={() => setFilters({ gender: [], category: [], color: [], brand: [] })} className="text-sm font-medium text-black hover:text-[#C8A97E] underline underline-offset-4">
                      Tüm Filtreleri Temizle
                    </button>
                  </motion.div>
                )}
                
                {hasMoreFiltered && (
                  <div ref={observerTarget} className="w-full h-20 flex items-center justify-center mt-8">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#fdfdfd] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <h3 className="font-serif text-xl font-medium">Filtreler</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <SidebarFilter filters={filters} onChange={setFilters} products={products} />
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium tracking-wide shadow-lg shadow-black/20"
                >
                  SONUÇLARI GÖSTER ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
