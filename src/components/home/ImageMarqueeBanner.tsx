import Image from 'next/image';

const marqueeImages = [
  '/images/model-rayban-v2.png',
  '/images/banner-sunglasses-new.png',
  '/images/model-vogue-v2.png',
  '/images/banner-closeup.png',
  '/images/model-prada-v2.png',
  '/images/model-osse-v2.png',
];

export default function ImageMarqueeBanner() {
  return (
    <section className="w-full overflow-hidden bg-black py-16 md:py-24 my-16 md:my-24">
      {/* Optional Top Text */}
      <div className="text-center mb-12">
        <span className="label-caps text-xs text-white/50 tracking-[0.25em] block mb-4">
          CADDE OPTİK GÜNEŞ GÖZLÜĞÜ KOLEKSİYONU
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white">Stilinizi Tamamlayın</h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="relative w-[280px] md:w-[400px] h-[350px] md:h-[500px] mx-4 overflow-hidden shrink-0">
              <Image
                src={src}
                alt="Cadde Optik Marquee Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
