/**
 * Cadde Optik — PHP API Yardımcısı
 *
 * Next.js static export ile PHP backend arasındaki iletişimi yönetir.
 *
 * Geliştirmede NEXT_PUBLIC_API_URL environment variable'ı ayarlayın:
 *   NEXT_PUBLIC_API_URL=http://localhost/caddeoptik
 *
 * Canlıda bu değer otomatik olarak aynı domain'i kullanır.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

export const API = {
  // Auth
  login: `${API_BASE}/api/auth/login.php`,

  // Products
  products: `${API_BASE}/api/products/index.php`,
  product:  (id: string) => `${API_BASE}/api/products/item.php?id=${id}`,

  // Brands
  brands: `${API_BASE}/api/brands/index.php`,

  // Upload
  upload: `${API_BASE}/api/upload/index.php`,

  // Helper for image URLs
  imageUrl: (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  },
};

export default API;
