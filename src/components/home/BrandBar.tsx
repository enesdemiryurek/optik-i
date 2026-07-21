'use client';

const brands = [
  { name: 'Ray-Ban', font: 'font-serif italic font-bold', size: 'text-xl md:text-3xl' },
  { name: 'GUCCI', font: 'font-sans tracking-[0.3em] font-light', size: 'text-lg md:text-2xl' },
  { name: 'PRADA', font: 'font-sans tracking-[0.4em] font-medium', size: 'text-lg md:text-2xl' },
  { name: 'BURBERRY', font: 'font-serif tracking-[0.2em] font-normal', size: 'text-base md:text-xl' },
  { name: 'Vogue', font: 'font-serif italic font-normal', size: 'text-xl md:text-3xl' },
  { name: 'LACOSTE', font: 'font-sans tracking-[0.25em] font-bold', size: 'text-base md:text-xl' },
  { name: 'OSSE', font: 'font-sans tracking-[0.35em] font-semibold', size: 'text-lg md:text-2xl' },
  { name: 'Hawk', font: 'font-sans tracking-[0.15em] font-bold uppercase', size: 'text-lg md:text-2xl' },
  { name: 'MUSTANG', font: 'font-sans tracking-[0.2em] font-black', size: 'text-base md:text-xl' },
];

export default function BrandBar() {
  // Duplicating the list multiple times to guarantee seamless wrapping on wide screens
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="relative border-y border-black/5 bg-[#FAFAF8] py-12 overflow-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-48 before:bg-gradient-to-r before:from-[#FAFAF8] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-48 after:bg-gradient-to-l after:from-[#FAFAF8] after:to-transparent">
      <div className="flex w-full">
        <div className="animate-marquee flex items-center shrink-0 min-w-full">
          {marqueeBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex items-center shrink-0"
            >
              {/* Divider element - diamond shape */}
              <span className="text-[14px] text-primary/40 mx-8 md:mx-16 shrink-0 select-none">
                ◆
              </span>
              <span
                className={`${brand.font} ${brand.size} text-black/60 hover:text-black hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-default`}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
