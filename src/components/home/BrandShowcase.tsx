'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Ray-Ban',  image: '/optik-i/images/model-rayban-real.png',  href: '/urunler?brand=Ray-Ban',  since: '1937', desc: 'İkonik ve klasik tasarım anlayışı' },
  { name: 'Prada',   image: '/optik-i/images/model-prada-real.png',   href: '/urunler?brand=Prada',    since: '1913', desc: 'İtalyan lüksü ve avangart çizgiler' },
  { name: 'Osse',    image: '/optik-i/images/model-osse-real.png',    href: '/urunler?brand=Osse',     since: '2005', desc: 'Modern ve dinamik güneş gözlükleri' },
  { name: 'Vogue',   image: '/optik-i/images/model-vogue-real.png',   href: '/urunler?brand=Vogue',    since: '1973', desc: 'Global trendleri yansıtan şıklık' },
];

export default function BrandShowcase() {
  return (
    <section className="bg-[#0A0A0A] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="page-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-20 gap-6 flex-wrap"
        >
          <div>
            <span className="flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-primary font-bold mb-4">
              <span className="inline-block w-6 h-[1px] bg-primary" />
              Yetkili Distribütör
            </span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium text-white tracking-tight leading-[1.1]">
              Dünyaca Ünlü<br />Koleksiyonlar
            </h2>
          </div>
          <Link href="/urunler" className="text-[12px] font-semibold text-white/50 hover:text-primary border-b border-white/20 hover:border-primary pb-1 transition-all uppercase tracking-[0.12em] whitespace-nowrap">
            Tüm Markaları Keşfet →
          </Link>
        </motion.div>

        {/* Wide Brand cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={brand.href} className="group relative block overflow-hidden aspect-[16/10] rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-100 opacity-60 grayscale-[20%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/50" />

                <div className="absolute inset-10 flex flex-col justify-between">
                  {/* Top */}
                  <div className="text-[10px] tracking-[0.25em] text-primary font-bold uppercase">
                    Since {brand.since}
                  </div>

                  {/* Bottom */}
                  <div>
                    <h3 className="font-serif text-[2.5rem] font-medium text-white tracking-tight mb-3 transition-transform duration-500 group-hover:translate-x-2">
                      {brand.name}
                    </h3>
                    <p className="text-[14px] text-white/50 font-light mb-6 max-w-[80%] transition-transform duration-500 group-hover:translate-x-2 delay-75">
                      {brand.desc}
                    </p>
                    <span className="inline-flex items-center gap-3 text-[11px] font-bold text-white tracking-[0.15em] uppercase px-6 py-2.5 border border-white/20 rounded-full transition-all duration-400 group-hover:bg-white group-hover:text-black group-hover:border-white">
                      Koleksiyon
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
