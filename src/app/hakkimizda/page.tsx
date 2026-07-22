import Image from 'next/image';
import BrandShowcase from '@/components/home/BrandShowcase';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pt-24">
      {/* Editorial Hero */}
      <section className="relative w-full overflow-hidden border-b border-border">
        <div className="page-container py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col items-start space-y-6">
            <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold">
              <span className="inline-block w-6 h-[1px] bg-primary" />
              HİKAYEMİZ
            </span>
            <h1 className="font-serif text-5xl md:text-[5rem] font-medium leading-[1.05] tracking-tight text-foreground">
              Görüşünüze <br />
              <span className="italic text-primary font-light">Değer</span> Katıyoruz
            </h1>
            <p className="text-muted text-lg font-light leading-relaxed max-w-md pt-4">
              1991'den bu yana Ankara Batıkent'te dürüstlük, samimiyet ve güvenle hizmet veriyor; mesleki tutkumuzla fark yaratıyoruz.
            </p>
          </div>

          {/* Arch Image */}
          <div className="relative w-full h-[500px] flex justify-center lg:justify-end">
             <div className="relative w-full max-w-[400px] h-full arch-shape overflow-hidden editorial-border p-2 bg-white editorial-shadow mt-auto">
               <div className="relative w-full h-full arch-shape overflow-hidden bg-muted-bg">
                 <Image src="/optik-i/images/about-hero.png" alt="Cadde Optik" fill className="object-cover grayscale-[15%] contrast-110" unoptimized />
                 <div className="absolute inset-0 bg-[#B94C36]/10 mix-blend-multiply" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Biz Kimiz Section */}
      <section className="bg-muted-bg py-32 border-b border-border">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Overlapping Images Editorial Style */}
            <div className="relative h-[600px] w-full">
              <div className="absolute top-0 left-0 w-3/4 h-[450px] editorial-border bg-background p-2 editorial-shadow">
                <div className="relative w-full h-full overflow-hidden bg-muted-bg">
                  <Image src="/optik-i/images/about-model.png" alt="Model" fill className="object-cover" unoptimized />
                </div>
              </div>
              <div className="absolute bottom-10 right-0 w-2/3 h-[300px] editorial-border bg-background p-2 editorial-shadow z-10">
                <div className="relative w-full h-full overflow-hidden bg-muted-bg">
                  <Image src="/optik-i/images/banner-sunglasses-new.png" alt="Güneş Gözlüğü" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
              <span className="flex items-center gap-2.5 text-[11px] tracking-widest uppercase text-primary font-bold mb-4">
                <span className="inline-block w-6 h-[1px] bg-primary" />
                BİZ KİMİZ?
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground font-medium mb-8 leading-[1.1]">
                33 Yıllık <br/><span className="italic text-primary font-light">Tecrübe</span> ve Uzmanlık
              </h2>
              <div className="space-y-6 text-muted font-light leading-relaxed">
                <p>
                  Optik sektöründe doğru gözlük ve cam seçimi, sadece bir alışveriş değil, doğrudan göz sağlığınızı ilgilendiren medikal bir süreçtir. Cadde Optik olarak, sektöre adım attığımız ilk günden beri tam 33 yıldır esnaflık kültürünün getirdiği dürüstlük, samimiyet ve güvenle Ankara Batıkent'te hizmet vermeye devam ediyoruz.
                </p>
                <p>
                  Bizim hikayemiz, sadece bir gözlük mağazası olmanın çok ötesinde; çekirdekten yetişen bir ustalık ve mesleki bir tutku barındırıyor. Gözlük çerçeve sektöründe hem güneş gözlüğü hem de numaralı gözlük koleksiyonlarıyla öne çıkan Cadde Optik; Ray-Ban, Prada, Gucci, Vogue, Osse ve Mustang Eyewear gibi dünyanın önde gelen markaları ile sektörde fark yaratmaktadır.
                </p>
                <p>
                  Her zevke hitap eden geniş ürün çeşitliliği, ileri teknolojilerle desteklenen cam tasarımları ve uzman ekibiyle, müşterilerine benzersiz bir optik deneyimi sunmak için aralıksız çalışmaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="bg-background py-24 border-b border-border">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: '33+', label: 'Yıllık Tecrübe' },
              { num: '50k+', label: 'Mutlu Müşteri' },
              { num: '30+', label: 'Dünya Markası' },
              { num: '%100', label: 'Orijinal Ürün' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 editorial-border editorial-shadow hover:editorial-shadow-hover bg-muted-bg transition-all duration-300">
                <span className="font-serif text-5xl md:text-6xl text-foreground mb-4 block">{stat.num}</span>
                <div className="w-12 h-[1px] bg-primary mb-4" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-bold block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="bg-muted-bg py-32 border-b border-border">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-background p-12 editorial-border editorial-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
              <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4 block">AMACIMIZ</span>
              <h3 className="font-serif text-3xl text-foreground mb-6">Misyonumuz</h3>
              <p className="text-muted font-light leading-relaxed relative z-10">
                Misafirlerimizin göz sağlığını her şeyin üzerinde tutarak, estetik beklentilerini en iyi şekilde karşılayan optik çözümler sunmak. Modern teknolojiyi esnaflık kültürünün sıcaklığıyla birleştirerek, güven veren ve kalıcı bağlar kuran bir hizmet anlayışını sürdürmek.
              </p>
            </div>
            
            <div className="bg-primary p-12 editorial-border editorial-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
              <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-4 block">HEDEFİMİZ</span>
              <h3 className="font-serif text-3xl text-white mb-6">Vizyonumuz</h3>
              <p className="text-white/90 font-light leading-relaxed relative z-10">
                Optik sektöründeki yenilikleri yakından takip ederek, sadece Ankara'nın değil Türkiye'nin en güvenilir ve yenilikçi optik mağazalarından biri olmak. Kaliteden ödün vermeden, dünya modasını misafirlerimizin yüzüne taşıyan öncü bir marka değerine ulaşmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BrandShowcase />

    </div>
  );
}
