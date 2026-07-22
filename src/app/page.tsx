'use client';

import HeroSection from '@/components/home/HeroSection';
import BrandBar from '@/components/home/BrandBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import GenderCollections from '@/components/home/GenderCollections';
import SunglassesBanner from '@/components/home/SunglassesBanner';
import BrandShowcase from '@/components/home/BrandShowcase';
import FadeIn from '@/components/ui/FadeIn';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const whyUs = [
  { num: '01', title: 'Kişisel Danışmanlık', desc: 'Uzman optisyenlerimiz yüz şeklinize ve yaşam tarzınıza uygun en doğru çerçeveyi birlikte seçmenize yardımcı olur.' },
  { num: '02', title: '%100 Orijinal', desc: 'Tüm ürünlerimiz yetkili distribütör kanallarından temin edilir. Her ürün orijinallik belgesiyle teslim edilir.' },
  { num: '03', title: 'SGK Anlaşmalı', desc: 'SGK anlaşmamız ile reçeteleriniz üzerinden tüm işlemlerinizi anında, güvenle ve kolayca gerçekleştirebilirsiniz.' },
  { num: '04', title: 'Taksit İmkanı & Destek', desc: 'Tüm kredi kartlarına vade farksız 12 ay taksit ve ömür boyu ücretsiz bakım garantisi sunuyoruz.' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandBar />

      <CategoryGrid />

      <FadeIn delay={0.05}><GenderCollections /></FadeIn>

      <FadeIn delay={0.05} fullWidth><SunglassesBanner /></FadeIn>

      <FadeIn delay={0.05}><FeaturedProducts /></FadeIn>

      {/* ─── FARK YARATAN DEĞERLER (Editorial) ─── */}
      <section className="bg-[#0A0A0A] py-32 border-t border-white/10 overflow-hidden relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="page-container relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/3 flex flex-col justify-center"
            >
              <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-4">
                <span className="inline-block w-6 h-[1px] bg-primary" />
                Neden Cadde Optik?
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium text-white tracking-tight leading-[1.1] mb-6">
                Fark Yaratan <br />
                <span className="italic text-primary font-light">Değerlerimiz</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                33 yıllık tecrübemiz ve yenilikçi vizyonumuzla, her bir misafirimize özenle hizmet sunuyor, en iyi optik deneyimini yaşatıyoruz.
              </p>
              <Link href="/hakkimizda" className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 text-[11px] font-semibold tracking-widest uppercase self-start">
                Daha Fazla Bilgi
              </Link>
            </motion.div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10 hover:border-primary transition-colors duration-500 group"
                >
                  <span className="absolute left-[-2px] top-0 w-[3px] h-0 bg-primary group-hover:h-8 transition-all duration-500 ease-out" />
                  <span className="block font-serif text-5xl font-light text-white/10 mb-4 transition-colors duration-500 group-hover:text-primary/40">
                    {item.num}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── HAKKIMIZDA / MAĞAZA (Editorial) ─── */}
      <FadeIn delay={0.05} fullWidth>
        <section className="bg-[#FFFFFF] py-32 overflow-hidden">
          <div className="page-container">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-4">
                  <span className="inline-block w-6 h-[1px] bg-primary" />
                  Köklü Miras
                </span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium text-black tracking-tight leading-[1.05] mb-8">
                  33 Yıllık<br />
                  <span className="italic text-black/60 font-light">Güven ve Premium Kalite</span>
                </h2>
                <p className="text-black/70 text-[16px] font-light leading-relaxed mb-6">
                  Cadde Optik olarak, en ikonik dünya markalarını ve en yeni trendleri sizlere sunuyoruz. Sadece bir gözlük değil, yüzünüzün en çarpıcı imzasını bulmanızı sağlıyoruz.
                </p>
                <p className="text-black/70 text-[16px] font-light leading-relaxed mb-12">
                  Profesyonel stil danışmanlarımız ve uzman kadromuz, en uygun cam teknolojisini ve çerçevenizi kusursuz bir uyumla eşleştirir.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-black/10">
                  {[
                    { num: '33+', label: 'Yıllık Tecrübe' },
                    { num: '30+', label: 'Premium Marka' },
                    { num: '50K+', label: 'Mutlu Müşteri' }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <span className="block font-serif text-3xl font-medium text-black leading-none mb-2">{stat.num}</span>
                      <span className="block text-[10px] tracking-widest uppercase text-black/50 font-bold">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Edge-to-edge photo layout */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2 w-full h-[600px] relative"
              >
                <div className="absolute inset-0 right-[-10vw] rounded-l-[40px] overflow-hidden group">
                  <Image 
                    src="/optik-i/images/luxury_showroom.png" 
                    alt="Cadde Optik Lüks Showroom" 
                    fill 
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent mix-blend-overlay" />
                </div>
                
                {/* Floating badge */}
                <div className="absolute bottom-10 -left-10 bg-white shadow-2xl p-6 rounded-2xl max-w-[220px] hidden md:block">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--color-primary)">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[12px] text-black/70 italic leading-relaxed">
                    "Tarzımı tamamen değiştirdiler. Harika bir ekip!"
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2 font-bold">— Can K.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}><BrandShowcase /></FadeIn>

      {/* ─── İLETİŞİM CTA (Editorial) ─── */}
      <FadeIn delay={0.05} fullWidth>
        <section className="bg-[#FAFAF8] py-32 relative overflow-hidden">
          <div className="page-container">
            <div className="relative rounded-[40px] overflow-hidden bg-black flex flex-col md:flex-row items-center">
              
              {/* Background Photo for the card */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/optik-i/images/model-rayban-real.png" 
                  alt="Cadde Optik Gözlük Koleksiyonu" 
                  fill 
                  className="object-cover opacity-70 mix-blend-overlay" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay" />
              </div>

              {/* Content inside card */}
              <div className="relative z-10 p-12 md:p-24 md:w-2/3 text-left">
                <span className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-primary font-bold mb-6">
                  <span className="inline-block w-8 h-[1px] bg-primary" />
                  Cadde Deneyimi
                </span>
                
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-medium text-white tracking-tight leading-[1.05] mb-6">
                  Tarzınızı<br />
                  <span className="italic font-light text-primary">Keşfedin</span>
                </h2>
                
                <p className="text-white/80 text-[15px] font-light leading-relaxed mb-10 max-w-md">
                  Gözlerinizi güneşin zararlı ışınlarından korurken, Cadde Optik'in özel tasarım gözlükleriyle stilinize yepyeni bir hava katın.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/iletisim" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-black text-[12px] font-bold tracking-widest uppercase transition-all hover:scale-105 w-full sm:w-auto">
                    <span className="relative z-10">Randevu Al</span>
                  </Link>
                  <Link href="/urunler" className="group inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-4 text-white transition-all hover:bg-white/10 hover:border-white text-[12px] font-bold tracking-widest uppercase w-full sm:w-auto">
                    Koleksiyonu İncele
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
