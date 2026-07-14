import { notFound } from 'next/navigation';
import { getProductById, DEMO_PRODUCTS } from '@comet-crew/shared/state';
import { ProductDetailClient } from './product-detail-client';
import { Header } from '@comet-crew/shared/ui';

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return DEMO_PRODUCTS.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  // ✅ Critical: handle missing product BEFORE passing to client component
  if (!product) {
    notFound();
  }

  return (
    <>
      <Header activeZone="products" theme="deep" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />
      </main>
    </>
  );
}