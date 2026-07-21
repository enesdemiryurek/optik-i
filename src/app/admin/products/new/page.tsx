'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '@/lib/api';

export default function AdminProductsNewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    brand: '',
    price: '',
    category: 'sunglasses',
    gender: 'unisex',
    material: 'acetate',
    description: '',
    featured: false,
  });

  const [specs, setSpecs] = useState({
    frameWidth: '',
    lensWidth: '',
    bridgeWidth: '',
    templeLength: '',
    lensHeight: '',
    weight: '',
    color: '',
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    // Fetch brands from PHP API
    fetch(API.brands)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBrands(data);
      })
      .catch(() => {});
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecs({ ...specs, [e.target.name]: e.target.value });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    const newImages = [...images.filter(img => img !== '')];
    
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      
      try {
        const res = await fetch(API.upload, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
          body: fd
        });
        if (res.ok) {
          const data = await res.json();
          newImages.push(data.url);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    setImages(newImages);
    setUploading(false);
  };

  const moveImage = (idx: number, direction: 'left' | 'right') => {
    const newImages = [...images.filter(img => img !== '')];
    if (direction === 'left' && idx > 0) {
      const temp = newImages[idx];
      newImages[idx] = newImages[idx - 1];
      newImages[idx - 1] = temp;
    } else if (direction === 'right' && idx < newImages.length - 1) {
      const temp = newImages[idx];
      newImages[idx] = newImages[idx + 1];
      newImages[idx + 1] = temp;
    }
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const validImages = images.filter(img => img.trim() !== '');

    const payload = {
      ...formData,
      price: parseFloat(formData.price.toString().replace(',', '.')),
      images: validImages,
      specs: specs,
      inStock: true,
      featured: formData.featured
    };

    try {
      const res = await fetch(API.products, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Ürün başarıyla eklendi!');
        router.push('/admin/dashboard');
      } else {
        const errorData = await res.json().catch(() => null);
        alert(`Ürün kaydedilirken bir sorun oluştu. Lütfen bilgileri kontrol edip tekrar deneyin.\n\nSistem Notu: ${errorData?.error || res.statusText || 'Bilinmeyen Hata'}`);
      }
    } catch (err: any) {
      alert(`Sistemle bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="bg-white border-b border-border/50 px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="font-serif text-xl tracking-widest uppercase flex items-center gap-3">
          <Link href="/admin/dashboard" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </Link>
          Yeni Ürün Ekle
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <h2 className="text-lg font-serif mb-6 flex items-center gap-3 border-b border-border/30 pb-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span> 
              Temel Bilgiler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Marka</label>
                <select 
                  name="brand"
                  className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" 
                  value={formData.brand} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Marka Seçiniz</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Model Kodu</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" required placeholder="Örn: RB3025" />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Ürün Adı</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" required placeholder="Örn: Aviator Classic" />
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 border border-border/50 rounded-xl bg-gray-50">
              <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 accent-black cursor-pointer" />
              <label htmlFor="featured" className="text-sm font-bold text-gray-800 cursor-pointer">Ana Sayfada Popüler Model Olarak Göster (Maks 10)</label>
            </div>
          </div>

          {/* Section 2: Details */}
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <h2 className="text-lg font-serif mb-6 flex items-center gap-3 border-b border-border/30 pb-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span> 
              Ürün Detayları
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Kategori</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all">
                  <option value="sunglasses">Güneş Gözlüğü</option>
                  <option value="prescription">Numaralı</option>
                  <option value="lenses">Lens</option>
                  <option value="kids">Çocuk</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Fiyat (₺)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
                  <input type="text" inputMode="decimal" pattern="[0-9.,]*" name="price" value={formData.price} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 pl-8 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 font-mono transition-all" required placeholder="0.00" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Cinsiyet</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all">
                  <option value="unisex">Unisex</option>
                  <option value="men">Erkek</option>
                  <option value="women">Kadın</option>
                  <option value="child">Çocuk</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs font-bold label-caps mb-2 text-gray-700">Açıklama</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-border/50 rounded-xl p-3.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" rows={4} placeholder="Ürün özelliklerini detaylı bir şekilde açıklayın..." />
            </div>
          </div>



          {/* Section 4: Images */}
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <h2 className="text-lg font-serif mb-6 flex items-center gap-3 border-b border-border/30 pb-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</span> 
              Görseller
            </h2>
            <div>
              <div className="border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative rounded-2xl group overflow-hidden">
                <input 
                  type="file" 
                  multiple 
                  accept="image/png, image/webp, image/avif" 
                  onChange={handleFileSelect} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  disabled={uploading}
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <span className="font-bold label-caps text-sm text-gray-800">FOTOĞRAFLARI SEÇ VEYA SÜRÜKLE</span>
                  <span className="text-xs text-muted mt-2 max-w-xs">Birden fazla fotoğraf seçebilirsiniz. İlk fotoğraf vitrin (ana resim) olacaktır.</span>
                  {uploading && <span className="text-xs text-blue-600 mt-4 font-bold bg-blue-50 px-4 py-2 rounded-full inline-block">Yükleniyor... Lütfen bekleyin.</span>}
                </div>
              </div>
              
              {images.filter(img => img !== '').length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {images.filter(img => img !== '').map((img, idx) => (
                    <div key={idx} className="relative border border-border/50 rounded-xl aspect-square bg-gray-50 group overflow-hidden shadow-sm">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      
                      {/* Reorder Buttons */}
                      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx > 0 ? (
                          <button type="button" onClick={() => moveImage(idx, 'left')} className="bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-md">
                            &lt;
                          </button>
                        ) : <div />}
                        {idx < images.filter(i => i !== '').length - 1 ? (
                          <button type="button" onClick={() => moveImage(idx, 'right')} className="bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-md">
                            &gt;
                          </button>
                        ) : <div />}
                      </div>

                      <button 
                        type="button" 
                        onClick={() => setImages(images.filter((_, i) => i !== idx))} 
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10"
                      >
                        ×
                      </button>
                      {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white text-[10px] text-center py-1.5 uppercase tracking-wider font-bold z-10">Ana Resim</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:bg-black/80 transition-colors shadow-lg hover:shadow-xl text-lg tracking-wide uppercase">
            ÜRÜNÜ KAYDET
          </button>
        </form>
      </main>
    </div>
  );
}
