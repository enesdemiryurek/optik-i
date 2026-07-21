'use client';

import { useState, useRef, useEffect } from 'react';
import { FilterState, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface HorizontalFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  products?: Product[];
}


const filterOptions = {
  gender: [
    { value: 'men', label: 'Erkek' }, { value: 'women', label: 'Kadın' },
    { value: 'unisex', label: 'Unisex' }, { value: 'child', label: 'Çocuk' },
  ],
  category: [
    { value: 'sunglasses', label: 'Güneş Gözlüğü' }, { value: 'prescription', label: 'Numaralı Gözlük' },
    { value: 'lenses', label: 'Lens' }, { value: 'accessories', label: 'Aksesuar' }, { value: 'kids', label: 'Çocuk Gözlük' },
  ],

  brand: [
    { value: 'CADDE OPTİK', label: 'CADDE OPTİK' }, { value: 'Ray-Ban', label: 'Ray-Ban' },
    { value: 'Prada', label: 'Prada' }, { value: 'Vogue', label: 'Vogue' },
    { value: 'Osse', label: 'Osse' }, { value: 'Gucci', label: 'Gucci' },
    { value: 'Dior', label: 'Dior' }, { value: 'Tom Ford', label: 'Tom Ford' },
  ],
};

export default function HorizontalFilterBar({ filters, onChange, products = [] }: HorizontalFilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [apiBrands, setApiBrands] = useState<{value: string, label: string}[]>(filterOptions.brand);
  const [brandSearch, setBrandSearch] = useState('');
  const [localPrice, setLocalPrice] = useState<[string, string]>([
    filters.priceRange?.[0]?.toString() || '',
    filters.priceRange?.[1]?.toString() || ''
  ]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('/api/brands')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApiBrands(data.map((b: string) => ({ value: b, label: b })));
        }
      })
      .catch(() => {});
  }, []);

  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const handlePriceChange = (index: 0 | 1, value: string) => {
    const newLocalPrice = [...localPrice] as [string, string];
    newLocalPrice[index] = value;
    setLocalPrice(newLocalPrice);

    const min = newLocalPrice[0] ? parseInt(newLocalPrice[0]) : 0;
    const max = newLocalPrice[1] ? parseInt(newLocalPrice[1]) : 999999;
    
    if (!isNaN(min) && !isNaN(max) && (newLocalPrice[0] !== '' || newLocalPrice[1] !== '')) {
       onChange({ ...filters, priceRange: [min, max] });
    } else if (newLocalPrice[0] === '' && newLocalPrice[1] === '') {
       const newFilters = { ...filters };
       delete newFilters.priceRange;
       onChange(newFilters);
    }
  };

  const getCount = (key: string, value: string) => {
    if (!products || products.length === 0) return 0;
    return products.filter(p => {
      return p[key as keyof Product] === value;
    }).length;
  };

  const filteredBrands = apiBrands.filter(b => 
    b.label.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const renderDropdownContent = (key: string) => {
    const options = key === 'brand' ? filteredBrands : filterOptions[key as keyof typeof filterOptions];
    
    return (
      <div className="p-3 w-64 max-h-80 overflow-y-auto">
        {key === 'brand' && (
          <div className="relative mb-3">
            <input 
              type="text" placeholder="Marka ara..." value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black"
            />
            <svg className="absolute left-2.5 top-2.5 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        )}
        <div className="space-y-2">
          {options.map((option) => {
            const count = getCount(key, option.value);
            if (count === 0 && !(filters[key as keyof FilterState] as string[])?.includes(option.value)) return null;
            return (
              <label key={option.value} className="flex items-center justify-between cursor-pointer group py-1">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" className="peer sr-only" 
                      checked={(filters[key as keyof FilterState] as string[])?.includes(option.value) || false}
                      onChange={() => handleToggle(key as keyof FilterState, option.value)}
                    />
                    <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition-colors group-hover:border-gray-500"></div>
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span className="text-[14px] text-gray-700">{option.label}</span>
                </div>
                <span className="text-[13px] text-gray-400">{count}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const activeCount = Object.values(filters).reduce((acc, curr) => {
    if (Array.isArray(curr)) return acc + curr.length;
    if (curr && typeof curr === 'object') return acc + 1; // priceRange
    return acc;
  }, 0);

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 pb-4 mb-8" ref={containerRef}>
      
      {/* Filters Toggle Group */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Quick Access Dropdowns */}
        {[
          { key: 'category', label: 'Kategori' },
          { key: 'brand', label: 'Marka' },
          { key: 'gender', label: 'Cinsiyet' },
        ].map((item) => {
          const isActive = activeDropdown === item.key;
          const hasSelected = item.key === 'price' ? !!filters.priceRange : (filters[item.key as keyof FilterState] as string[])?.length > 0;
          
          return (
            <div 
              key={item.key} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] uppercase tracking-wide font-semibold transition-all duration-300 ${
                  isActive || hasSelected
                    ? 'border-black text-black bg-white shadow-sm' 
                    : 'border-gray-200 text-gray-600 bg-transparent hover:border-black hover:text-black'
                }`}
              >
                {item.label}
                <motion.svg animate={{ rotate: isActive ? 180 : 0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isActive || hasSelected ? "text-black" : "text-gray-400"}><polyline points="6 9 12 15 18 9" /></motion.svg>
              </button>

              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 bg-white border border-gray-100 shadow-2xl rounded-2xl z-40 overflow-hidden"
                  >
                    {renderDropdownContent(item.key)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
