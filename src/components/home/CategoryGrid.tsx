'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'sunglasses',
    label: 'Güneş Gözlükleri',
    en: 'Sunglasses',
    desc: 'UV400 korumalı, polarize premium modeller',
    image: '/optik-i/images/cat-sunglasses-real.png',
    href: '/urunler?category=sunglasses',
  },
  {
    id: 'prescription',
    label: 'Numaralı Gözlükler',
    en: 'Optical Frames',
    desc: 'Titanyum ve asetat reçeteli çerçeveler',
    image: '/optik-i/images/cat-prescription-real.png',
    href: '/urunler?category=prescription',
  },
  {
    id: 'lenses',
    label: 'Kontakt Lensler',
    en: 'Contact Lenses',
    desc: 'Günlük, aylık ve renkli lens seçenekleri',
    image: '/optik-i/images/cat-lenses-real.png',
    href: '/urunler?category=lenses',
  },
  {
    id: 'accessories',
    label: 'Aksesuarlar',
    en: 'Accessories',
    desc: 'Kılıf, bez ve bakım ürünleri',
    image: '/optik-i/images/cat-accessories-real.png',
    href: '/urunler?category=accessories',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};
const cardAnim: any = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export default function CategoryGrid() {
  return (
    <section className="bg-[#0A0A0A] py-24 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="page-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14 gap-6 flex-wrap"
        >
          <div>
            <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-3.5">
              <span className="inline-block w-6 h-[1px] bg-primary" />
              Ürün Kategorileri
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium text-white tracking-tight leading-[1.1]">
              Özel Koleksiyonlarımız
            </h2>
          </div>
          <Link href="/urunler" className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 text-[11px] font-semibold tracking-widest uppercase">
            Tüm Ürünler
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={cardAnim}>
              <Link href={cat.href} className="group block no-underline">
                {/* Image */}
                <div className="relative h-[320px] overflow-hidden bg-white/5 backdrop-blur-sm mb-0 rounded-t-[32px] rounded-b-[8px] border border-white/10">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[10%]"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  {/* Overlay tint on hover */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="pt-6 border-t-2 border-transparent relative transition-colors duration-400">
                  {/* Accent line that grows on hover */}
                  <div className="absolute top-[-2px] left-0 w-0 h-[2px] bg-primary transition-all duration-500 ease-out group-hover:w-full" />

                  <p className="text-[10px] tracking-widest uppercase text-primary font-bold mb-1.5">{cat.en}</p>
                  <h3 className="font-serif text-xl font-medium text-white tracking-tight mb-1.5 transition-colors duration-300 group-hover:text-primary">
                    {cat.label}
                  </h3>
                  <p className="text-[13px] text-white/50 font-light leading-relaxed mb-4">{cat.desc}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase transition-colors duration-300 group-hover:text-primary">İncele</span>
                    <div className="w-5 h-[1px] bg-primary transition-all duration-400 group-hover:w-10" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
