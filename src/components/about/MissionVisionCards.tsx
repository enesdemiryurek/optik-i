'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MissionVisionCards() {
  return (
    <section
      className="relative overflow-hidden bg-[#050505] border-t border-white/5 py-24 md:py-32 lg:py-48"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/5 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[60%] rounded-full bg-[#D4AF37]/5 blur-[150px]" />
      </div>

      <div className="page-container max-w-7xl relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-24 lg:gap-32">

          {/* Row 1: Image (Left) + Vizyon (Right) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-[35%] relative aspect-[4/5] md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)] group"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src="/images/about-model.png"
                alt="Cadde Optik Vizyon"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />
            </motion.div>

            <div className="w-full lg:w-[65%]">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="group relative bg-gradient-to-br from-black via-zinc-800 to-zinc-400 border border-white/20 rounded-3xl overflow-hidden hover:border-[#D4AF37]/80 hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] hover:-translate-y-2 transition-all duration-500 shadow-2xl p-8 md:p-12 lg:p-20"
              >
                {/* Gold Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-top-left" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-bottom-right" />

                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#111] flex items-center justify-center border border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                  </div>
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase block mb-1">Geleceğimiz</span>
                    <span className="w-12 h-px bg-[#D4AF37]/40 block group-hover:w-full group-hover:bg-[#D4AF37] transition-all duration-700" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-6 relative z-10 drop-shadow-md">Vizyonumuz</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light relative z-10 group-hover:text-white transition-colors duration-500">
                  Sektördeki yenilikleri ve dünyaca ünlü lüks markaları en hızlı şekilde ülkemize getirerek, optik alanında güvenilirlik, kalite ve modanın bir numaralı temsilcisi olmak. Geleceğin optik mağazacılık standartlarını bugünden lüks ile harmanlayıp belirlemek.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Row 2: Misyon (Left) + Modern Graphic (Right) */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-[65%]">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative bg-gradient-to-br from-black via-zinc-800 to-zinc-400 border border-white/20 rounded-3xl overflow-hidden hover:border-[#D4AF37]/80 hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] hover:-translate-y-2 transition-all duration-500 shadow-2xl p-8 md:p-12 lg:p-20"
              >
                {/* Gold Corner Accents */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-top-right" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-bottom-left" />

                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#111] flex items-center justify-center border border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase block mb-1">Amacımız</span>
                    <span className="w-12 h-px bg-[#D4AF37]/40 block group-hover:w-full group-hover:bg-[#D4AF37] transition-all duration-700" />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-6 relative z-10 drop-shadow-md">Misyonumuz</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light relative z-10 group-hover:text-white transition-colors duration-500">
                  Müşterilerimizin göz sağlığını en yüksek kalitedeki ürünlerle korurken, aynı zamanda dünya modasını yakından takip ederek tarzlarını yansıtabilecekleri en iyi seçenekleri sunmak. Her müşterimize butik ve kişiselleştirilmiş bir ayrıcalık yaşatmak.
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-[35%] relative flex items-center justify-center"
            >
              {/* Modern Abstract Geometric Design */}
              <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                <div className="absolute w-[80%] h-[80%] border-2 border-[#D4AF37]/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[60%] h-[60%] border-2 border-[#D4AF37]/20 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-xl" />
                <div className="z-10 text-center">
                  <span className="text-[#D4AF37] font-serif italic text-3xl opacity-80 block">Cadde Optik</span>
                  <span className="text-white/50 tracking-[0.3em] text-xs uppercase mt-2 block">Since 1999</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
