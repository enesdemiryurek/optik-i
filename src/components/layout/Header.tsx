'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialTooltip from '@/components/ui/SocialTooltip';

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isAdmin = pathname.startsWith('/admin');
  const hasHero = pathname === '/' || pathname === '/hakkimizda' || pathname === '/urunler';
  const isTransparent = hasHero && !scrolled;
  const isLightHero = pathname === '/';
  
  const getTextColor = () => isTransparent && isLightHero ? 'text-black' : 'text-white';
  const getTextColorMuted = () => isTransparent && isLightHero ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white';
  const getLineColor = () => isTransparent && isLightHero ? 'bg-black' : 'bg-white';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/urunler?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  if (isAdmin) return null;

  return (
    <>
      <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 animate-in slide-in-from-top-full ${
        isTransparent 
          ? 'bg-transparent py-8' 
          : 'bg-[#0A0A0A]/80 backdrop-blur-2xl py-5 border-b border-white/5 shadow-2xl'
      }`}
    >
      <div className="page-container max-w-[1440px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`font-sans text-2xl transition-all duration-500 hover:opacity-80 flex items-center ${getTextColor()}`}
          >
            <span className="font-black tracking-[0.3em]">CADDE</span>
            <span className={`font-light tracking-[0.2em] ml-1 text-primary`}>OPTİK</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-500 group py-2 ${getTextColorMuted()} ${pathname === link.href ? `!${getTextColor()}` : ''}`}
              >
                {link.label}
                {/* Hover line */}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${getLineColor()}`} />
                {/* Active line */}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 w-full h-[1px] bg-primary`}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search */}
            <button 
              aria-label="Ara" 
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-all duration-500 hover:scale-110 ${getTextColorMuted()}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <div className={`pl-4 ml-2 border-l ${isTransparent && isLightHero ? 'border-black/10' : 'border-white/10'}`}>
              <SocialTooltip />
            </div>
            {/* WhatsApp Button Desktop */}
            <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all duration-300 ${isTransparent && isLightHero ? 'bg-black/5 text-black hover:bg-[#25D366] hover:text-white' : isTransparent ? 'bg-white/10 text-white hover:bg-[#25D366]' : 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WHATSAPP
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 relative z-[101] transition-colors duration-300 ${getTextColor()}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <motion.g initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </motion.g>
              ) : (
                <motion.g initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </motion.g>
              )}
            </svg>
          </button>
        </div>
      </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Drawer Content */}
            <motion.nav 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[400px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.2)] rounded-l-[40px] flex flex-col overflow-hidden"
            >
              {/* Header Spacer */}
              <div className="h-28 flex items-center justify-start px-12 bg-gray-50 border-b border-gray-100">
                <span className="font-sans font-extrabold text-2xl tracking-[0.25em] text-[#111111]">
                  CADDE<span className="text-[#C8A97E]">OPTİK</span>
                </span>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center px-12 gap-8 bg-white">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`font-serif text-3xl transition-all block flex items-center justify-between ${
                        pathname === link.href ? 'text-[#C8A97E]' : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <motion.div layoutId="mobileActiveNav" className="w-2 h-2 rounded-full bg-[#C8A97E]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col gap-6">
                <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  WhatsApp Destek
                </a>
                <div className="flex gap-4">
                  <SocialTooltip />
                </div>
                <p className="text-[13px] text-gray-400 font-medium">© 2026 Cadde Optik.<br/>Tüm hakları saklıdır.</p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-start justify-center pt-32 px-6"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-5xl relative mt-12 md:mt-24"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="relative flex flex-col items-center w-full">
                <span className="text-[#C8A97E] text-xs md:text-sm tracking-[0.4em] font-semibold uppercase mb-8 md:mb-12">Özel Koleksiyonda Ara</span>
                <div className="relative w-full flex items-center border-b border-white/20 focus-within:border-white transition-colors duration-500 pb-4 md:pb-6">
                  <input
                    type="text"
                    placeholder="Marka, model veya stil..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-white text-3xl md:text-5xl lg:text-7xl font-sans font-light focus:outline-none placeholder:text-white/20 px-2 md:px-4"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 md:right-4 text-white hover:text-[#C8A97E] transition-all duration-300 hover:scale-110">
                    <svg width="32" height="32" className="md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSearchOpen(false)}
                  className="mt-16 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase group"
                >
                  <span className="w-8 h-[1px] bg-white/40 group-hover:bg-white transition-colors"></span>
                  KAPAT
                  <span className="w-8 h-[1px] bg-white/40 group-hover:bg-white transition-colors"></span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
