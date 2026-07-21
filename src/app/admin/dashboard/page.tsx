'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [newBrand, setNewBrand] = useState('');
  const [brandMsg, setBrandMsg] = useState('');
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch(API.products)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(API.brands)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBrands(data);
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(API.product(String(id)), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Silme işlemi başarısız.');
      }
    } catch {
      alert('Sunucu hatası.');
    }
  };

  const handleToggleFeatured = async (product: any) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(API.product(String(product.id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...product, featured: !product.featured })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p));
      } else {
        alert('Güncelleme başarısız.');
      }
    } catch {
      alert('Sunucu hatası.');
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.trim()) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(API.brands, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ brand: newBrand.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setBrands(data.brands);
        setNewBrand('');
        setBrandMsg('✓ Marka eklendi!');
        setTimeout(() => setBrandMsg(''), 3000);
      } else {
        setBrandMsg(data.error || 'Hata oluştu');
        setTimeout(() => setBrandMsg(''), 3000);
      }
    } catch {
      setBrandMsg('Sunucu hatası');
      setTimeout(() => setBrandMsg(''), 3000);
    }
  };

  const confirmDeleteBrand = (brand: string) => {
    setBrandToDelete(brand);
  };

  const handleDeleteBrand = async () => {
    if (!brandToDelete) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(API.brands, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ brand: brandToDelete })
      });
      const data = await res.json();
      if (res.ok) {
        setBrands(data.brands);
        setBrandToDelete(null);
      } else {
        alert(data.error || 'Hata oluştu');
      }
    } catch {
      alert('Sunucu hatası');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-admin flex items-center justify-center font-serif text-xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
          Yükleniyor...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin text-foreground">
      {/* Navbar - Glassmorphism */}
      <nav className="glass sticky top-0 z-50 px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="font-serif text-xl tracking-widest uppercase">Cadde Optik Admin</div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-muted hover:text-black transition-colors">Siteye Dön</Link>
          <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors">Çıkış Yap</button>
        </div>
      </nav>

      <main className="w-full max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-serif mb-4 tracking-tight">Yönetim Paneli</h1>
          <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Cadde Optik mağaza yönetim sistemine hoş geldiniz. İşlemlerinizi aşağıdan modern ve hızlı bir şekilde yönetebilirsiniz.
          </p>
        </motion.div>

        {/* Quick Links / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link href="/admin/dashboard" className="flex flex-col items-center text-center admin-card p-8 group h-full">
              <div className="w-16 h-16 bg-gray-100 text-black rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="label-caps text-sm mb-3 font-bold text-black">Ürün Yönetimi</h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">Sistemde ekli olan tüm ürünlerinizi görüntüleyin ve düzenleyin.</p>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/admin/products/new" className="flex flex-col items-center text-center admin-card p-8 group h-full">
              <div className="w-16 h-16 bg-gray-100 text-black rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <h3 className="label-caps text-sm mb-3 font-bold text-black">Yeni Ürün Ekle</h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">Koleksiyonunuza yeni bir ürün eklemek için pürüzsüz formu kullanın.</p>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/" className="flex flex-col items-center text-center admin-card p-8 group h-full" target="_blank">
              <div className="w-16 h-16 bg-gray-100 text-black rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <h3 className="label-caps text-sm mb-3 font-bold text-black">Siteyi Görüntüle</h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">Müşterilerin gördüğü modern vitrini yeni sekmede açın.</p>
            </Link>
          </motion.div>
        </div>

        {/* Brand Management */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="admin-card p-10 mb-16"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-black mb-2">Marka Yönetimi</h2>
            <p className="text-sm text-muted">Ürün eklerken kullanacağınız markaları buradan hızlıca yönetin.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddBrand()}
              className="input-modern"
              placeholder="Yeni marka adı giriniz..."
            />
            <button type="button" onClick={handleAddBrand} className="btn-primary shrink-0">
              MARKA EKLE
            </button>
          </div>

          {brandMsg && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-sm font-bold mb-6 px-4 py-3 rounded-xl inline-block ${brandMsg.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {brandMsg}
            </motion.div>
          )}

          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => (
              <motion.div whileHover={{ scale: 1.05 }} key={brand} className="flex items-center gap-2 bg-gray-50 border border-border/50 rounded-full px-5 py-2 group hover:border-black/20 hover:shadow-sm transition-all">
                <span className="text-sm font-semibold">{brand}</span>
                <button
                  onClick={() => confirmDeleteBrand(brand)}
                  className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                  title="Markayı sil"
                >
                  ×
                </button>
              </motion.div>
            ))}
            {brands.length === 0 && (
              <p className="text-sm text-muted">Henüz marka eklenmemiş.</p>
            )}
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="admin-card overflow-hidden"
        >
          <div className="p-10 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-serif text-black mb-2">Mevcut Ürünler</h2>
              <p className="text-sm text-muted">Sistemdeki tüm ürünleriniz (Toplam {products.length})</p>
            </div>
            <Link href="/admin/products/new" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mr-2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              YENİ ÜRÜN
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>GÖRSEL</th>
                  <th>MARKA & MODEL</th>
                  <th>KATEGORİ</th>
                  <th>FİYAT</th>
                  <th className="text-center">POPÜLER</th>
                  <th className="text-right">İŞLEMLER</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-muted">Henüz ürün eklenmemiş.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="group">
                      <td>
                        {product.images && product.images.length > 0 ? (
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-[10px] text-muted font-semibold">YOK</div>
                        )}
                      </td>
                      <td>
                        <div className="font-bold text-black text-base">{product.brand}</div>
                        <div className="text-muted text-sm mt-1 font-medium">{product.model}</div>
                      </td>
                      <td className="capitalize text-sm font-medium">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          {product.category === 'prescription' ? 'Numaralı' : product.category === 'sunglasses' ? 'Güneş' : 'Lens'}
                        </span>
                      </td>
                      <td className="font-bold text-black">
                        {product.price?.toLocaleString('tr-TR')} {product.currency || '₺'}
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center">
                          <button onClick={() => handleToggleFeatured(product)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${product.featured ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`} title="Popüler Modellerde Göster (Maks 10)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={product.featured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/urun-duzenle/?id=${product.id}`} className="admin-btn bg-gray-100 hover:bg-gray-200 text-black">
                            Düzenle
                          </Link>
                          <button onClick={() => handleDelete(product.id)} className="admin-btn bg-red-50 hover:bg-red-100 text-red-600">
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Brand Delete Confirmation Modal */}
      <AnimatePresence>
        {brandToDelete && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }} 
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border/50 text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </div>
              <h3 className="text-2xl font-serif text-black mb-2">Markayı Sil</h3>
              <p className="text-muted mb-8">
                <strong>"{brandToDelete}"</strong> markasını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setBrandToDelete(null)} className="flex-1 py-3 px-4 rounded-xl border border-border/80 text-black font-bold hover:bg-gray-50 transition-colors">
                  İPTAL
                </button>
                <button onClick={handleDeleteBrand} className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                  SİL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
