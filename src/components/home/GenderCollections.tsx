import Image from 'next/image';
import Link from 'next/link';

export default function GenderCollections() {
  return (
    <section className="bg-[#FFFFFF] py-24 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="page-container relative z-10">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-4">
            <span className="inline-block w-6 h-[1px] bg-primary" />
            Koleksiyonlar
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.75rem)] font-medium text-black tracking-tight leading-[1.1]">
            Kadın &amp; Erkek
          </h2>
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Women */}
          <Link href="/urunler?category=sunglasses&gender=women" className="group relative block overflow-hidden rounded-[32px] h-[520px] shadow-2xl shadow-black/5 bg-black">
            <Image
              src="/optik-i/images/model-women-aydinlik.png"
              alt="Kadın Koleksiyonu"
              fill
              className="object-cover transition-transform duration-[1500ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">For Her</p>
              <h3 className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-white mb-6 drop-shadow-md">Kadın Koleksiyonu</h3>
              <span className="inline-flex items-center gap-3 text-[11px] font-bold text-white tracking-widest uppercase group-hover:text-primary transition-colors drop-shadow-md">
                İncele
                <div className="w-6 h-[1px] bg-white group-hover:bg-primary group-hover:w-10 transition-all duration-300" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link href="/urunler?category=sunglasses&gender=men" className="group relative block overflow-hidden rounded-[32px] h-[520px] shadow-2xl shadow-black/5 bg-black">
            <Image
              src="/optik-i/images/model-men-aydinlik.png"
              alt="Erkek Koleksiyonu"
              fill
              className="object-cover transition-transform duration-[1500ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">For Him</p>
              <h3 className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-white mb-6 drop-shadow-md">Erkek Koleksiyonu</h3>
              <span className="inline-flex items-center gap-3 text-[11px] font-bold text-white tracking-widest uppercase group-hover:text-primary transition-colors drop-shadow-md">
                İncele
                <div className="w-6 h-[1px] bg-white group-hover:bg-primary group-hover:w-10 transition-all duration-300" />
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
