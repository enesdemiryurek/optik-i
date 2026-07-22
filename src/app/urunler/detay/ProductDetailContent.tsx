'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/types';
import API from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isReturnAccordionOpen, setIsReturnAccordionOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    fetch(API.product(id))
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then((data) => {
        setProduct(data);
        setActiveImage(data.images && data.images.length > 0 ? data.images[0] : data.image);
        setLoading(false);

        // Fetch related products
        fetch(API.products)
          .then(r => r.json())
          .then(allProducts => {
            if (Array.isArray(allProducts)) {
              const related = allProducts.filter((p: Product) => String(p.id) !== String(data.id) && p.category === data.category);
              setRelatedProducts(related.slice(0, 4));
            }
          })
          .catch(() => { });
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <span className="font-serif text-lg text-muted">Yükleniyor...</span>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#fafafa]">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl">Ürün Bulunamadı</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link href="/urunler" className="btn-primary">
            ÜRÜNLERE DÖN
          </Link>
        </motion.div>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    sunglasses: 'Güneş Gözlüğü',
    prescription: 'Numaralı Gözlük',
    lenses: 'Lens',
    accessories: 'Aksesuar',
    kids: 'Çocuk Gözlük',
  };

  const materialLabels: Record<string, string> = {
    titanium: 'Titanyum',
    acetate: 'Asetat',
    metal: 'Metal',
    mixed: 'Karma',
  };

  const genderLabels: Record<string, string> = {
    men: 'Erkek',
    women: 'Kadın',
    unisex: 'Unisex',
    child: 'Çocuk',
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Breadcrumb */}
      <div className="page-container pt-8">
        <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-xs font-semibold label-caps text-muted">
          <Link href="/" className="hover:text-black transition-colors">
            Anasayfa
          </Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-black transition-colors">
            Koleksiyon
          </Link>
          <span>/</span>
          <span className="text-black">{product.model}</span>
        </motion.nav>
      </div>

      {/* Product */}
      <section className="py-12 md:py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Images Left Column */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 space-y-4 lg:sticky top-32">
              <div
                className="bg-white rounded-3xl border border-border/50 shadow-sm aspect-square flex items-center justify-center overflow-hidden relative cursor-zoom-in group"
                onClick={() => setIsModalOpen(true)}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={API.imageUrl(activeImage)}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          imageRendering: 'auto',
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: isZooming ? 'scale(1.8)' : 'scale(1)',
                          transition: isZooming ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                        }}
                      />
                    </motion.div>
                </AnimatePresence>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`aspect-square bg-white rounded-xl border-2 transition-all p-1 overflow-hidden ${activeImage === img ? 'border-black shadow-md' : 'border-transparent hover:border-black/30 shadow-sm'}`}
                      onClick={() => setActiveImage(img)}
                    >
                      <div className="relative w-full h-full">
                        <Image src={API.imageUrl(img)} alt={`${product.name} view ${idx + 1}`} fill quality={90} className="object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info Right Column */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 flex flex-col justify-center">
              <span className="label-caps font-bold text-muted mb-3">{product.brand}</span>
              <h1 className="font-serif text-4xl md:text-5xl mb-2 text-foreground tracking-tight">{product.name}</h1>
              <p className="text-xl text-muted mb-8 font-light tracking-wide">{product.model}</p>

              <div className="glass px-8 py-6 rounded-3xl mb-10 shadow-sm border border-border/50 inline-block w-fit">
                <p className="text-3xl font-bold text-foreground">
                  {product.price.toLocaleString('tr-TR')} {product.currency || '₺'}
                </p>
              </div>

              {/* Actions - MOVED UP */}
              <div className="flex flex-col gap-4 mb-10 max-w-lg">
                <a href="tel:+905555555555" className="btn-primary w-full text-center py-5 text-sm shadow-md hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Telefon İle Bilgi Al
                </a>
                <a
                  href={`https://wa.me/905555555555?text=${encodeURIComponent('Merhaba, ' + product.brand + ' ' + product.model + ' modeli hakkında bilgi almak istiyorum. Ürün Linki: https://caddeoptikbatikent.com/urunler/detay?id=' + product.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-2xl bg-[#25D366] text-white py-5 text-sm font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
                  title="WhatsApp'tan Bilgi Al"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                  WHATSAPP İLE BİLGİ AL
                </a>
              </div>

              <p className="text-base text-muted leading-relaxed mb-10 max-w-lg whitespace-pre-wrap">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-border/60">
                <div className="glass px-6 py-3 rounded-2xl flex flex-col gap-1 border border-border/30">
                  <span className="text-[10px] text-muted font-bold label-caps">KATEGORİ</span>
                  <span className="text-sm font-semibold text-foreground">
                    {categoryLabels[product.category] || product.category}
                  </span>
                </div>

                <div className="glass px-6 py-3 rounded-2xl flex flex-col gap-1 border border-border/30">
                  <span className="text-[10px] text-muted font-bold label-caps">CİNSİYET</span>
                  <span className="text-sm font-semibold text-foreground">
                    {genderLabels[product.gender] || product.gender}
                  </span>
                </div>
              </div>

              {/* Dimensions removed as requested */}

              {/* Return Policy Accordion */}
              <div className="mb-12 border-b border-border/60 pb-6">
                <button 
                  onClick={() => setIsReturnAccordionOpen(!isReturnAccordionOpen)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-bold label-caps text-foreground group-hover:text-[#C8A97E] transition-colors">İADE & DEĞİŞİM</span>
                  <motion.div
                    animate={{ rotate: isReturnAccordionOpen ? 45 : 0 }}
                    className="text-foreground"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isReturnAccordionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4 space-y-6 text-sm text-muted leading-relaxed">
                        <div>
                          <h4 className="font-bold text-foreground mb-2">İADE PROSEDÜRÜ</h4>
                          <p>
                            Satın aldığınız ürünü, teslim tarihinden itibaren 14 gün içerisinde faturası ile birlikte tarafımıza göndererek iade edebilirsiniz. Faturasız, eksik aksesuarlı (kutu, silme bezi vb.) veya hasar görmüş ürünlerde iade kabul edilmemektedir. İade edilecek ürünün kullanılmamış, etiketleri koparılmamış ve orijinal ambalajında yeniden satılabilir durumda olması gerekmektedir. Numaralı gözlük camları kişiye özel üretildiği için iade kapsamı dışındadır.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-2">DEĞİŞİM PROSEDÜRÜ</h4>
                          <p>
                            Web sitemizden satın aldığınız ürünlerin değişim işlemlerini, teslim tarihinden itibaren 14 gün içerisinde mağazamızdan veya anlaşmalı kargo firmalarımız aracılığıyla gerçekleştirebilirsiniz. Değişim yapılacak ürünün kullanılmamış ve hasarsız olması zorunludur.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions moved to top */}

              {/* Stock */}
              <div className="flex items-center gap-3 mt-8 glass px-5 py-3 rounded-full w-fit border border-border/30">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-foreground">
                  Stokta mevcut
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white border-t border-border/50 py-20">
          <div className="page-container">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl mb-12 text-center text-foreground">Benzer Seçimler</motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((p, index) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Link href={`/urunler/detay?id=${p.id}`} className="group block">
                    <div className="aspect-[4/5] bg-[#fafafa] rounded-3xl overflow-hidden mb-4 border border-border/30 relative shadow-sm group-hover:shadow-lg transition-all duration-500">
                      <Image
                        src={API.imageUrl(p.image || (p.images && p.images[0]) || '')}
                        alt={p.name}
                        fill
                        className="object-cover p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="px-2">
                      <p className="label-caps font-bold text-[10px] text-muted mb-1">{p.brand}</p>
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-foreground">{p.model}</p>
                        <p className="text-sm font-bold text-foreground shrink-0">
                          {p.price.toLocaleString('tr-TR')} {p.currency || '₺'}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-12 backdrop-blur-xl cursor-zoom-out"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-14 h-14 flex items-center justify-center transition-all backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Navigation & Image Container */}
            <div className="relative w-full max-w-6xl flex items-center justify-center gap-4 md:gap-8 cursor-default" onClick={(e) => e.stopPropagation()}>
              
              {/* Prev Button */}
              {product.images && product.images.length > 1 && (
                <button
                  className="hidden md:flex text-white/50 hover:text-white hover:scale-110 transition-all p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIdx = product.images!.indexOf(activeImage);
                    const prevIdx = (currentIdx - 1 + product.images!.length) % product.images!.length;
                    setActiveImage(product.images![prevIdx]);
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
              )}

              {/* Main Image */}
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full aspect-square md:aspect-[4/3] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center p-8"
              >
                <Image src={API.imageUrl(activeImage)} alt={product.name} fill className="object-contain p-4 md:p-12" quality={100} priority />
              </motion.div>

              {/* Next Button */}
              {product.images && product.images.length > 1 && (
                <button
                  className="hidden md:flex text-white/50 hover:text-white hover:scale-110 transition-all p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIdx = product.images!.indexOf(activeImage);
                    const nextIdx = (currentIdx + 1) % product.images!.length;
                    setActiveImage(product.images![nextIdx]);
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              )}
            </div>

            {/* Mobile Navigation & Counter */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-10 flex items-center gap-6 cursor-default" onClick={(e) => e.stopPropagation()}>
                <button
                  className="md:hidden text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIdx = product.images!.indexOf(activeImage);
                    const prevIdx = (currentIdx - 1 + product.images!.length) % product.images!.length;
                    setActiveImage(product.images![prevIdx]);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <div className="bg-white/10 backdrop-blur-md text-white/90 px-6 py-2 rounded-full font-medium tracking-widest text-sm border border-white/10 shadow-lg">
                  {product.images.indexOf(activeImage) + 1} / {product.images.length}
                </div>

                <button
                  className="md:hidden text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIdx = product.images!.indexOf(activeImage);
                    const nextIdx = (currentIdx + 1) % product.images!.length;
                    setActiveImage(product.images![nextIdx]);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
