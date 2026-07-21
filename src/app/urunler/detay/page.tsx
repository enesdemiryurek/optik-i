import { Suspense } from 'react';
import ProductDetailContent from './ProductDetailContent';

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-2xl">Yükleniyor...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
