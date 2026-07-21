import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsPageContent from './ProductsPageContent';

export const metadata: Metadata = {
  title: "Tüm Ürünler | Cadde Optik Ankara Batıkent Optikçi",
  description: "Ankara Batıkent Cadde Optik'te dünyaca ünlü güneş gözlükleri, gözlük modelleri ve lens çeşitlerini keşfedin.",
  keywords: "ankara batıkent optikçi, gözlükçü, güneş gözlükleri, güneş gözlüğü, güneş gözlükçü, cadde optik ürünler",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Yükleniyor...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
