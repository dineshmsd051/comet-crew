// apps/products/src/app/[id]/page.tsx
// ─────────────────────────────────────────────────────────────────
// PRODUCTS ZONE — Product Detail Page
// Within-zone navigation: "Back to products" uses Next.js <Link>
// because we stay inside the products zone.
// ─────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import Link from 'next/link';  // ✅ WITHIN-ZONE: use <Link>
import { Header } from '@comet-crew/shared/ui';
import { ProductDetailClient } from './product-detail-client';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product ${params.id}`,
    description: `View details for product ${params.id}`,
  };
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <>
      <Header activeZone="products" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Breadcrumb — within-zone: use Next.js Link */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            {/* ⚠️ Cross-zone: home is in shell zone */}
            <li><a href="/" className="hover:text-brand-600 transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            {/* ✅ Within-zone: products list is in this zone */}
            <li>
              <Link href="/products" className="hover:text-brand-600 transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-700" aria-current="page">
              #{params.id}
            </li>
          </ol>
        </nav>

        <ProductDetailClient product={params} />
      </main>
    </>
  );
}