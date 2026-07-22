'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-background flex items-center overflow-hidden pt-20">
      
      {/* Decorative Turquoise Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="page-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-0 h-full">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-start justify-center pr-0 lg:pr-12"
        >
          <div className="space-y-6 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase">
                Premium Optik Deneyimi
              </span>
            </motion.div>
            
            <h1 className="font-serif text-[clamp(3.5rem,6vw,6rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-6">
              Tarzınıza <br />
              <span className="italic font-light text-primary">Altın</span> Dokunuş
            </h1>
            
            <p className="text-muted text-[16px] font-light max-w-[480px] leading-relaxed mb-10">
              Dünyanın en ikonik markaları, ustalıkla tasarlanmış koleksiyonlar ve size özel stil danışmanlığı ile lüksü yeniden tanımlayın.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/urunler"
                className="btn-primary uppercase text-[12px] tracking-[0.2em]"
              >
                Koleksiyonlar
              </Link>
              <Link
                href="/iletisim"
                className="btn-secondary uppercase text-[12px] tracking-[0.2em]"
              >
                Randevu Al
              </Link>
            </div>
            
            {/* Brands scroller hint */}
            <div className="pt-16 mt-8 border-t border-black/10 flex items-center gap-6">
              <span className="text-[10px] text-black/40 tracking-[0.2em] uppercase font-bold">Yetkili Satıcı</span>
              <div className="flex gap-4 opacity-50">
                {['Ray-Ban', 'Prada', 'Vogue', 'Osse'].map(brand => (
                  <span key={brand} className="text-black font-serif text-sm italic">{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Image Container - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          className="relative w-full h-[60vh] lg:h-[85vh] flex justify-end items-center lg:-mr-20"
        >
          <div className="relative w-full h-full max-h-[800px] overflow-hidden bg-muted-bg border border-border">
            <Image
              src="/optik-i/images/model-women-aydinlik.png"
              alt="Cadde Optik Premium"
              fill
              className="object-cover object-top transition-transform duration-[2000ms] hover:scale-105 opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Elegant vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-transparent to-transparent opacity-80 lg:opacity-0" />
            
            {/* Turquoise decorative frame lines */}
            <div className="absolute top-8 left-8 right-8 bottom-8 border border-primary/30 pointer-events-none" />
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-16 -left-12 lg:-left-24 bg-background border border-border p-6 shadow-2xl flex items-center gap-5 z-20"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/50">
                <span className="text-primary font-serif text-xl italic">33</span>
              </div>
              <div>
                <p className="text-foreground text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Yıllık Güven</p>
                <p className="text-muted text-[11px] font-light">Optik Sektöründe Öncü</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

