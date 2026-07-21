import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | Cadde Optik',
  description: 'Cadde Optik kullanım koşulları sayfası.',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-24 md:py-32">
      <div className="page-container max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Kullanım Koşulları
          </h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p>
              Bu web sitesini ziyaret ederek veya kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız. 
              Cadde Optik olarak, bu koşulları önceden haber vermeksizin değiştirme hakkımızı saklı tutuyoruz.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">1. Hizmet Kullanımı</h3>
            <p>
              Web sitemizde sunulan içerik ve hizmetler yalnızca bilgilendirme amacı taşımaktadır. Sunulan ürün bilgileri 
              ve fiyatları değişebilir; kesin bilgiler mağazamızdan teyit edilmelidir.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">2. Fikri Mülkiyet Hakları</h3>
            <p>
              Sitedeki tüm metin, görsel, logo ve tasarımlar Cadde Optik'e veya ilgili marka sahiplerine aittir. 
              İzinsiz kullanımı, kopyalanması veya dağıtılması yasaktır.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">3. Sorumluluk Reddi</h3>
            <p>
              Web sitemizde yer alan bilgilerin güncel ve doğru olması için çaba gösterilmekle birlikte, 
              herhangi bir hata veya eksiklikten Cadde Optik sorumlu tutulamaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
