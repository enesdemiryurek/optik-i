import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Cadde Optik',
  description: 'Cadde Optik KVKK aydınlatma metni sayfası.',
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-24 md:py-32">
      <div className="page-container max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Kişisel Verilerin Korunması (KVKK)
          </h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p>
              Cadde Optik olarak, kişisel verilerinizin güvenliğine büyük önem veriyoruz. 6698 sayılı Kişisel Verilerin 
              Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verileriniz aşağıda açıklanan şartlarda 
              ve mevzuatta öngörülen sınırlar dahilinde işlenmektedir.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Verilerin İşlenme Amacı</h3>
            <p>
              Kişisel verileriniz, size daha iyi hizmet sunabilmek, ürün ve hizmetlerimiz hakkında bilgilendirme yapmak,
              taleplerinize yanıt vermek ve yasal yükümlülüklerimizi yerine getirmek amacıyla işlenmektedir.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Veri Sahibinin Hakları</h3>
            <p>
              KVKK'nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,
              yanlış işlenmişse düzeltilmesini isteme ve yasal sınırlar çerçevesinde silinmesini talep etme hakkına sahipsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
