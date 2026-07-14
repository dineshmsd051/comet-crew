// apps/products/src/app/layout.tsx
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: { template: '%s | ShopZone', default: 'Products | ShopZone' },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}