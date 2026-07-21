import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Cadde Optik',
  description: 'Cadde Optik çerez (cookie) politikası sayfası.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-24 md:py-32">
      <div className="page-container max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Çerez Politikası
          </h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p>
              Web sitemizin daha verimli çalışmasını sağlamak ve kullanıcı deneyiminizi geliştirmek amacıyla çerezler (cookies) kullanmaktayız.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Çerez Nedir?</h3>
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.
              Sitenin kullanımını analiz etmek, tercihlerinizi hatırlamak ve size özel içerik sunmak için kullanılırlar.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Kullandığımız Çerez Türleri</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini yerine getirebilmesi için gereklidir.</li>
              <li><strong>Performans ve Analiz Çerezleri:</strong> Sitenin nasıl kullanıldığını analiz ederek geliştirmeler yapmamıza yardımcı olur.</li>
            </ul>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Çerezlerin Yönetimi</h3>
            <p>
              Tarayıcınızın ayarlarını değiştirerek çerez kullanımını kısıtlayabilir veya engelleyebilirsiniz. Ancak bu durumda, 
              web sitemizin bazı özelliklerinden tam olarak faydalanamayabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
