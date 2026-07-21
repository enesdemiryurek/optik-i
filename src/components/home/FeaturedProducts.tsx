'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import API from '@/lib/api';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 312; // 280px width + 32px gap
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const featured = data.filter((p: Product) => p.featured);
          setProducts(featured.length > 0 ? featured : data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || products.length === 0) return null;

  const displayed = products.slice(0, 10);

  return (
    <section className="bg-[#FFFFFF] py-24 relative overflow-hidden">
      <div className="page-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-row items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-3">
              <span className="inline-block w-6 h-[1px] bg-primary" />
              Trend Olanlar
            </span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-medium text-black tracking-tight leading-[1.1]">
              Popüler Modeller
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="slider-nav-btn"
                aria-label="Önceki ürünler"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="slider-nav-btn"
                aria-label="Sonraki ürünler"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <Link href="/urunler" className="text-[13px] font-bold text-black no-underline tracking-wide border-b border-black pb-[2px] opacity-60 hover:opacity-100 hover:text-primary hover:border-primary transition-all hidden md:inline-flex">
              Tümünü Gör →
            </Link>
          </div>
        </motion.div>

        {/* Products slider */}
        <div 
          ref={scrollRef}
          className="hide-scrollbar flex gap-8 overflow-x-auto pb-8 -mr-6 pr-6 snap-x snap-mandatory touch-pan-x"
        >
          {displayed.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex-none w-[calc(100vw-64px)] max-w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.02);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .slider-nav-btn:hover {
          background: black;
          color: white;
          border-color: black;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
