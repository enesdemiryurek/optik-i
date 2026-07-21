import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#222] mt-16">
      {/* Top Banner / Call to Action */}
      <div className="border-b border-[#222]">
        <div className="page-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="w-12 h-px bg-[#D4AF37]" />
            <h3 className="font-serif text-2xl text-white tracking-wide">Premium Optik Çözümler</h3>
          </div>
          <Link href="/iletisim" className="text-[#D4AF37] hover:text-white transition-colors text-sm tracking-[0.2em] uppercase font-bold flex items-center gap-2 group">
            BİZE ULAŞIN
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 pr-0 md:pr-10">
            <Link href="/" className="font-serif text-4xl tracking-[0.15em] font-medium block mb-6 text-white">
              CADDE OPTİK
            </Link>
            <p className="text-[15px] text-white/60 leading-relaxed max-w-sm font-light mb-10">
              Ankara Batıkent Çakırlar'ın en iyi gözlükçü ve optik mağazası olarak mükemmel görüşün ve kusursuz tasarımın buluşma noktasıyız. Dünyaca ünlü lüks güneş gözlükleri ve numaralı optik çözümlerini üstün hizmet anlayışıyla sunuyoruz.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', path: 'M7.8 2h8.4C19 2 22 5 22 7.8v8.4A5.8 5.8 0 0116.2 22H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z', href: 'https://instagram.com/caddeoptik' },
                { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: '#' },
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href || '#'}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[12px] font-black tracking-[0.25em] mb-8 text-white uppercase relative inline-block [text-shadow:1px_0_0_rgba(0,195,255,0.8),-1px_0_0_rgba(255,0,0,0.8)]">SAYFALAR</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Anasayfa' },
                { href: '/urunler', label: 'Özel Koleksiyon' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D4AF37] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[12px] font-black tracking-[0.25em] mb-8 text-white uppercase relative inline-block [text-shadow:1px_0_0_rgba(0,195,255,0.8),-1px_0_0_rgba(255,0,0,0.8)]">KURUMSAL</h4>
            <ul className="space-y-3">
              {[
                { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
                { label: 'KVKK', href: '/kvkk' },
                { label: 'Çerez Politikası', href: '/cerez-politikasi' },
                { label: 'Gizlilik', href: '/gizlilik' }
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] font-medium text-white/60 hover:text-white transition-colors relative group inline-block">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D4AF37] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-[12px] font-black tracking-[0.25em] mb-8 text-white uppercase relative inline-block [text-shadow:1px_0_0_rgba(0,195,255,0.8),-1px_0_0_rgba(255,0,0,0.8)]">İLETİŞİM</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors duration-300 text-white/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <a href="https://maps.app.goo.gl/rynL919ULwXyU7w3q" target="_blank" rel="noreferrer" className="text-sm text-white/60 leading-relaxed mt-1 group-hover:text-white transition-colors block">
                  Turgut Özel mah. Şehit Kaymakam<br />Muhammed Fatih Safitürk Bulv.<br />No: 102-G Çakırlar/Batıkent/ANKARA
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors duration-300 text-white/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <a href="tel:+905468005269" className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
                  +90 546 800 52 69
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors duration-300 text-white/60">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <a href="mailto:ozcandemiryurek@hotmail.com" className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
                  ozcandemiryurek@hotmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#222]">
        <div className="page-container py-10 flex flex-col gap-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4">
            <p className="text-xs text-white/40 tracking-wider">
              © {new Date().getFullYear()} CADDE OPTİK. Tüm hakları saklıdır.
            </p>
          </div>
          
          {/* Credit */}
          <div className="pt-6 border-t border-[#222]/40 w-full flex justify-center">
            <p className="text-[11px] text-white/30 tracking-widest uppercase">
              Bu site <a href="https://www.webustan.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-semibold hover:text-white transition-colors cursor-pointer">Webustan</a> tarafından yapılmıştır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
