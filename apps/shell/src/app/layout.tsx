// apps/shell/src/app/layout.tsx
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | StarShirt',
    default: 'StarShirt — Premium Space-Themed Apparel',
  },
  description: 'Explore our cosmic collection of space-themed T-shirts, hoodies, and accessories. Premium quality meets interstellar design.',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-deep-nebula-900 text-deep-nebula-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}