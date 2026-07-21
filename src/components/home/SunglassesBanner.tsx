import Image from 'next/image';
import Link from 'next/link';

export default function SunglassesBanner() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sunglasses-banner.png"
          alt="Güneş Gözlükleri Yeni Koleksiyon"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="page-container relative z-10 text-center flex flex-col items-center">
        <span className="flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase text-white font-bold mb-6">
          <span className="inline-block w-8 h-[1px] bg-white" />
          Yaz Koleksiyonu
          <span className="inline-block w-8 h-[1px] bg-white" />
        </span>

        <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] font-medium text-white tracking-tight leading-[1.05] mb-8">
          Güneşin Altında<br />
          <span className="italic font-light">Kendi Tarzını Yarat</span>
        </h2>

        <p className="text-white/80 text-[16px] font-light leading-relaxed max-w-[500px] mb-12">
          Modern çizgiler, ikonik tasarımlar ve en yüksek UV koruması. Yazın en sıcak günlerinde bile premium hissi yaşayın.
        </p>

        <Link
          href="/urunler?category=sunglasses"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-10 py-4 text-black text-[13px] font-bold tracking-widest uppercase transition-all hover:bg-primary hover:text-white"
        >
          <span className="relative z-10 flex items-center gap-3">
            Koleksiyonu Keşfet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
