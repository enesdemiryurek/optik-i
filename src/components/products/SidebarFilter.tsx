'use client';

import { useState, useEffect } from 'react';
import { FilterState, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarFilterProps {
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
  color: [
    { value: 'black', label: 'Siyah' }, { value: 'gold', label: 'Altın' }, 
    { value: 'silver', label: 'Gümüş' }, { value: 'tortoise', label: 'Kaplumbağa' }, 
    { value: 'brown', label: 'Kahverengi' }, { value: 'blue', label: 'Mavi' }
  ],
  brand: [
    { value: 'CADDE OPTİK', label: 'CADDE OPTİK' }, { value: 'Ray-Ban', label: 'Ray-Ban' },
    { value: 'Prada', label: 'Prada' }, { value: 'Vogue', label: 'Vogue' },
    { value: 'Osse', label: 'Osse' }, { value: 'Gucci', label: 'Gucci' },
    { value: 'Dior', label: 'Dior' }, { value: 'Tom Ford', label: 'Tom Ford' },
  ],
};

export default function SidebarFilter({ filters, onChange, products = [] }: SidebarFilterProps) {
  const [apiBrands, setApiBrands] = useState<{value: string, label: string}[]>(filterOptions.brand);
  const [brandSearch, setBrandSearch] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    gender: true,
    price: true,
    color: false,
  });

  const [localPrice, setLocalPrice] = useState<[string, string]>([
    filters.priceRange?.[0]?.toString() || '',
    filters.priceRange?.[1]?.toString() || ''
  ]);

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

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToggle = (key: keyof FilterState, value: string) => {
    const current = (filters[key] as string[]) || [];
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
      if (key === 'color') return p.specs?.color === value;
      return p[key as keyof Product] === value;
    }).length;
  };

  const filteredBrands = apiBrands.filter(b => 
    b.label.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const SectionHeader = ({ title, sectionKey }: { title: string, sectionKey: string }) => (
    <button 
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between py-3 text-left font-serif text-lg text-gray-900 border-b border-gray-100 group"
    >
      {title}
      <svg 
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSections[sectionKey] ? 'rotate-180' : ''}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  const renderOptions = (key: string, options: {value: string, label: string}[]) => (
    <AnimatePresence>
      {openSections[key] && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="py-4 space-y-3">
            {key === 'brand' && (
              <div className="relative mb-4">
                <input 
                  type="text" placeholder="Marka ara..." value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                <svg className="absolute left-2.5 top-2.5 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            )}
            <div className={`${key === 'brand' ? 'max-h-60 overflow-y-auto pr-2' : ''} space-y-3 custom-scrollbar`}>
              {options.map((option) => {
                const count = getCount(key, option.value);
                const isChecked = (filters[key as keyof FilterState] as string[])?.includes(option.value) || false;
                if (count === 0 && !isChecked) return null;
                
                return (
                  <label key={option.value} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" className="peer sr-only" 
                          checked={isChecked}
                          onChange={() => handleToggle(key as keyof FilterState, option.value)}
                        />
                        <div className="w-4 h-4 rounded border border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition-all group-hover:border-black"></div>
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className={`text-[14px] transition-colors ${isChecked ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>{option.label}</span>
                    </div>
                    <span className="text-[12px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full flex flex-col bg-white rounded-2xl border border-gray-100 p-6 sticky top-28 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="font-serif text-xl">Filtreler</h2>
        <button 
          onClick={() => onChange({ gender: [], category: [], color: [], brand: [] })}
          className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
        >
          Temizle
        </button>
      </div>

      <div className="space-y-2">
        <div>
          <SectionHeader title="Kategori" sectionKey="category" />
          {renderOptions('category', filterOptions.category)}
        </div>
        
        <div>
          <SectionHeader title="Marka" sectionKey="brand" />
          {renderOptions('brand', filteredBrands)}
        </div>

        <div>
          <SectionHeader title="Cinsiyet" sectionKey="gender" />
          {renderOptions('gender', filterOptions.gender)}
        </div>

        <div>
          <SectionHeader title="Fiyat" sectionKey="price" />
          <AnimatePresence>
            {openSections['price'] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₺</span>
                      <input 
                        type="number" 
                        placeholder="En Az" 
                        value={localPrice[0]} 
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₺</span>
                      <input 
                        type="number" 
                        placeholder="En Çok" 
                        value={localPrice[1]} 
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
