import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Cadde Optik',
  description: 'Cadde Optik gizlilik politikası sayfası.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] py-24 md:py-32">
      <div className="page-container max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Gizlilik Politikası
          </h1>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p>
              Cadde Optik olarak, bizimle paylaştığınız bilgilerin gizliliğine saygı duyuyor ve bu bilgileri güvence 
              altına almak için gerekli tüm önlemleri alıyoruz.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Bilgilerin Toplanması ve Kullanımı</h3>
            <p>
              İletişim formları veya WhatsApp üzerinden bize ulaştığınızda paylaştığınız ad, e-posta, telefon gibi 
              iletişim bilgileriniz yalnızca taleplerinize dönüş yapmak ve hizmet kalitemizi artırmak için kullanılır.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Bilgilerin Üçüncü Kişilerle Paylaşımı</h3>
            <p>
              Toplanan bilgileriniz, yasal zorunluluklar haricinde hiçbir şart altında üçüncü şahıs veya kurumlarla paylaşılmaz.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-8 mb-4">Güvenlik</h3>
            <p>
              Verilerinizin güvenliğini sağlamak amacıyla sitemizde SSL sertifikası başta olmak üzere çeşitli teknik güvenlik önlemleri uygulanmaktadır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
