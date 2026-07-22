'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialTooltip from '@/components/ui/SocialTooltip';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bilgi Almak İstiyorum',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: 'Bilgi Almak İstiyorum', message: '' });
  };

  const faqs = [
    { 
      q: 'SGK anlaşmanız bulunuyor mu?', 
      a: 'Evet, Sosyal Güvenlik Kurumu (SGK) ile resmi anlaşmamız bulunmaktadır. Reçetenizle başvurduğunuzda tüm optik cam ve çerçeve işlemleriniz kurum katkısı düşülerek gerçekleştirilir.' 
    },
    { 
      q: 'Çerçeve ayarı ve bakım yapıyor musunuz?', 
      a: 'Evet, şubemizde uzman ekibimiz tarafından ücretsiz çerçeve ayarı, ultrasonik temizlik ve genel bakım/onarım hizmetleri sunulmaktadır.' 
    },
    { 
      q: 'Göz muayenesi yapıyor musunuz?', 
      a: 'Yasa gereği optik mağazalarında göz muayenesi yapılamamaktadır. Ancak hastaneden aldığınız e-reçete veya fiziksel reçetenizle geldiğinizde, alanında uzman optisyenlerimiz sizin için en doğru cam ve çerçeve seçimini yapacaktır.' 
    },
    { 
      q: 'Garanti ve servis şartlarınız nelerdir?', 
      a: 'Cadde Optik\'ten satın aldığınız tüm optik çerçeveler ve güneş gözlükleri 2 yıl distribütör garantilidir. Ayrıca ömür boyu ücretsiz temizlik ve ayar garantisi sağlıyoruz.' 
    },
  ];

  return (
    <div className="bg-background min-h-screen font-sans pt-24">
      
      {/* ─── EDITORIAL HERO SECTION ─── */}
      <section className="relative py-20 lg:py-32 border-b border-border overflow-hidden">
        {/* Subtle Arch Decor */}
        <div className="absolute top-0 left-0 w-[30vw] h-[60vh] bg-muted-bg arch-shape-inverted opacity-40 pointer-events-none -translate-y-1/2" />
        
        <div className="page-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 text-primary text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
          >
            <span className="inline-block w-6 h-[1px] bg-primary" />
            SİZE NASIL YARDIMCI OLABİLİRİZ?
            <span className="inline-block w-6 h-[1px] bg-primary" />
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-[5rem] font-medium text-foreground tracking-tight mb-8"
          >
            Bize <span className="text-primary italic font-light pr-2">Ulaşın</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Stil danışmanlarımız ve uzman optisyenlerimiz, göz sağlığınız ve şıklığınız için size özel çözümler sunmaya hazır.
          </motion.p>
        </div>
      </section>

      {/* ─── CONTACT FORM & INFO GRID ─── */}
      <section className="py-24 bg-muted-bg border-b border-border">
        <div className="page-container max-w-6xl mx-auto">
          <div className="bg-background editorial-border editorial-shadow p-8 md:p-16 flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Contact Form */}
            <div className="flex-1">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Mesaj Gönderin</h2>
              <p className="text-muted font-light mb-12">Talebinizi iletin, en kısa sürede size dönüş yapalım.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="text" id="name" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-4 text-base focus:outline-none focus:border-primary transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute left-0 top-4 text-muted text-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-valid:-top-3 peer-valid:text-xs peer-valid:text-foreground uppercase tracking-widest cursor-text">
                      İSİM & SOYİSİM
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" id="email" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-4 text-base focus:outline-none focus:border-primary transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute left-0 top-4 text-muted text-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-valid:-top-3 peer-valid:text-xs peer-valid:text-foreground uppercase tracking-widest cursor-text">
                      E-POSTA ADRESİ
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="tel" id="phone" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-4 text-base focus:outline-none focus:border-primary transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="phone" className="absolute left-0 top-4 text-muted text-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-foreground uppercase tracking-widest cursor-text">
                      TELEFON (OPSİYONEL)
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      id="subject" value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-4 text-foreground text-base focus:outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
                    >
                      <option value="Bilgi Almak İstiyorum">Bilgi Almak İstiyorum</option>
                      <option value="Gözlük Çerçeveleri">Gözlük Çerçeveleri Hakkında</option>
                      <option value="Lens Çözümleri">Kontakt Lens Çözümleri</option>
                      <option value="SGK Hak Sorgulama">SGK Hak Sorgulama</option>
                      <option value="Öneri / Şikayet">Öneri & Şikayet</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                  </div>
                </div>

                <div className="relative group pt-4">
                  <textarea
                    id="message" required rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-4 text-base focus:outline-none focus:border-primary transition-colors resize-none peer"
                    placeholder=" "
                  />
                  <label htmlFor="message" className="absolute left-0 top-8 text-muted text-base transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-valid:top-0 peer-valid:text-xs peer-valid:text-foreground uppercase tracking-widest cursor-text">
                    MESAJINIZ
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full md:w-auto px-12 py-5 bg-foreground text-background text-[12px] font-bold tracking-widest uppercase hover:bg-primary transition-colors duration-300 flex items-center justify-center gap-3 group editorial-shadow hover:editorial-shadow-hover"
                >
                  {submitted ? 'MESAJINIZ İLETİLDİ' : 'GÖNDER'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                    {submitted ? <polyline points="20 6 9 17 4 12" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
                  </svg>
                </button>
              </form>
            </div>

            {/* Right: Info Panels */}
            <div className="lg:w-[400px] flex flex-col gap-6">
              <div className="bg-muted-bg p-8 editorial-border editorial-shadow-hover transition-all duration-300 group">
                <div className="w-12 h-12 bg-background editorial-border flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-2">MERKEZ MAĞAZA</h3>
                <p className="text-xl font-serif text-foreground mb-4">Cadde Optik Batıkent</p>
                <a href="https://maps.app.goo.gl/rynL919ULwXyU7w3q" target="_blank" rel="noreferrer" className="block text-muted font-light leading-relaxed mb-6 hover:text-primary transition-colors">Örnek Mahallesi, Cadde Sokak No: 1, Merkez/ANKARA</a>
                <a href="https://maps.app.goo.gl/rynL919ULwXyU7w3q" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors">
                  Haritada Gör <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </div>

              <div className="bg-muted-bg p-8 editorial-border editorial-shadow-hover transition-all duration-300 group">
                <div className="w-12 h-12 bg-background editorial-border flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                </div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-2">İLETİŞİM HATTI</h3>
                <a href="tel:+905555555555" className="block text-2xl font-serif text-foreground mb-2 hover:text-primary transition-colors">0555 555 55 55</a>
                <a href="mailto:info@caddeoptik.com" className="block text-muted font-light hover:text-primary transition-colors">info@caddeoptik.com</a>
              </div>

              <a href="https://wa.me/905555555555" target="_blank" rel="noreferrer" className="bg-[#2C4A3B]/5 p-6 editorial-border border-[#2C4A3B]/20 flex items-center gap-6 hover:bg-[#2C4A3B] hover:text-background group transition-all duration-300">
                <div className="w-12 h-12 bg-[#2C4A3B] editorial-border flex items-center justify-center text-white shrink-0 group-hover:bg-background group-hover:text-[#2C4A3B] transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[11px] text-[#2C4A3B] group-hover:text-background uppercase tracking-widest mb-1">WhatsApp Destek</h4>
                  <p className="text-xs text-[#2C4A3B]/80 group-hover:text-background/90 font-light">Hızlıca mesaj gönderin</p>
                </div>
              </a>

              <div className="bg-muted-bg p-8 editorial-border flex flex-col items-center justify-center">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-6 text-center">SOSYAL MEDYA</h3>
                <SocialTooltip scale={1.2} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MAP SECTION ─── */}
      <section className="h-[400px] w-full relative border-b border-border">
        <iframe
          src="https://maps.google.com/maps?q=Ankara+Türkiye&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%" height="100%" style={{ border: 0, filter: 'grayscale(80%) sepia(20%) hue-rotate(330deg)' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Cadde Optik Batıkent Konum"
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)]" />
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="py-24 bg-background">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">BİLİNMESİ GEREKENLER</span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-border last:border-0 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={`font-serif text-xl transition-colors ${openFaq === idx ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 editorial-border flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === idx ? 'bg-primary border-primary text-background rotate-45' : 'bg-background text-foreground group-hover:border-primary group-hover:text-primary'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted font-light leading-relaxed pb-6 pr-12">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
