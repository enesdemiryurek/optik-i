'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import API from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/urunler/detay?id=${product.id}`}
      className="group block"
      id={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-t-[32px] rounded-b-[8px] border border-black/10 mb-5 overflow-hidden transition-colors duration-500 hover:shadow-2xl hover:shadow-black/20">
        <Image
          src={API.imageUrl(product.images && product.images.length > 0 ? product.images[0] : product.image)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          quality={90}
          className={`object-contain p-6 transition-transform duration-700 ease-out ${
            product.images && product.images.length > 1 ? 'group-hover:opacity-0' : 'group-hover:scale-110'
          }`}
        />
        {product.images && product.images.length > 1 && (
          <Image
            src={API.imageUrl(product.images[1])}
            alt={`${product.name} alternative view`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            quality={90}
            className="object-contain p-6 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          />
        )}
        
        {/* Hover Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex justify-center">
          <div className="bg-primary/90 backdrop-blur-md rounded-full w-full py-4 flex justify-center items-center gap-3 text-[11px] font-bold tracking-widest uppercase text-white shadow-xl relative overflow-hidden transition-all hover:bg-primary">
            <span className="relative z-10">İncele</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-left space-y-2 px-2">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[11px] font-bold tracking-[0.15em] text-black/50 uppercase">{product.brand}</p>
          <p className="text-[14px] font-bold text-black group-hover:text-primary transition-colors shrink-0">
            {product.price.toLocaleString('tr-TR')} {product.currency || '₺'}
          </p>
        </div>
        <h3 className="text-sm font-medium text-black/80 group-hover:text-black transition-colors font-sans">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
