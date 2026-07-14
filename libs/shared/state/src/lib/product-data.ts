export interface ProductColor {
  name: string;
  hex: string;
}

export interface FullProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  colors: ProductColor[];
}

export const DEMO_PRODUCTS: FullProduct[] = [
  {
    id: 'prod-001',
    name: 'Cosmic Explorer Tee',
    category: 'T-Shirts',
    description: 'Navigate the universe in style with our flagship explorer design. Made from premium organic cotton with a comfortable regular fit.',
    price: 34.99,
    originalPrice: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 2341,
    badge: 'Best Seller',
    inStock: true,
    stockCount: 47,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Deep Black', hex: '#0a0a0f' },
      { name: 'Cosmic Purple', hex: '#8b3dff' },
      { name: 'Nebula Blue', hex: '#1ab3ff' },
    ],
  },
  {
    id: 'prod-002',
    name: 'Nebula Drift Hoodie',
    category: 'Hoodies',
    description: 'Premium heavyweight hoodie with embroidered nebula artwork. Fleece-lined interior for ultimate warmth on cosmic adventures.',
    price: 59.99,
    originalPrice: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1843,
    badge: 'New',
    inStock: true,
    stockCount: 23,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Black', hex: '#050508' },
      { name: 'Storm Gray', hex: '#3f3f52' },
    ],
  },
  {
    id: 'prod-003',
    name: 'Starlight Vintage Tee',
    category: 'T-Shirts',
    description: 'Retro 80s space aesthetic meets modern comfort. Soft-washed fabric for that perfectly worn-in feel.',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd43?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3dd43?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 912,
    inStock: true,
    stockCount: 68,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage White', hex: '#f5f5f7' },
      { name: 'Faded Navy', hex: '#3f4a8a' },
    ],
  },
  {
    id: 'prod-004',
    name: 'Void Oversized Crewneck',
    category: 'Sweatshirts',
    description: 'Luxury oversized fit with minimalist cosmic print. Drop-shoulder design for a relaxed, contemporary silhouette.',
    price: 54.99,
    originalPrice: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1552508744-18e2b18049ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1552508744-18e2b18049ff?w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 654,
    badge: 'Sale',
    inStock: true,
    stockCount: 15,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Charcoal', hex: '#2a2a38' }],
  },
  {
    id: 'prod-005',
    name: 'Aurora Long Sleeve',
    category: 'Long Sleeve',
    description: 'Ethereal northern lights design with glow-in-the-dark accents. Perfect for stargazing nights.',
    price: 42.99,
    originalPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1455088733894-e80bd3d86b47?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1455088733894-e80bd3d86b47?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1203,
    badge: 'Hot',
    inStock: true,
    stockCount: 31,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Aurora Green', hex: '#1ab3ff' },
      { name: 'Deep Space', hex: '#1a0a3d' },
    ],
  },
  {
    id: 'prod-006',
    name: 'Galactic Mesh Tank',
    category: 'Tanks',
    description: 'Breathable mesh with holographic cosmic print. Ideal for training or summer cosmic festivals.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1515898369411-8a378ca1311f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515898369411-8a378ca1311f?w=800&q=80',
    ],
    rating: 4.5,
    reviewCount: 431,
    inStock: false,
    stockCount: 0,
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Holographic Silver', hex: '#a9aab8' }],
  },
  {
    id: 'prod-007',
    name: 'Constellation Sweatshirt',
    category: 'Sweatshirts',
    description: 'Embroidered zodiac constellation map on premium fleece. Each star hand-placed for accuracy.',
    price: 64.99,
    originalPrice: 84.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821552-12073c92ec8f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821552-12073c92ec8f?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 876,
    badge: 'Premium',
    inStock: true,
    stockCount: 19,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Navy', hex: '#151d52' },
      { name: 'Onyx Black', hex: '#0d1117' },
    ],
  },
  {
    id: 'prod-008',
    name: 'Supernova Limited Edition',
    category: 'T-Shirts',
    description: 'One-of-a-kind holographic print with metallic threading. Limited to 500 pieces worldwide.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    ],
    rating: 5.0,
    reviewCount: 342,
    badge: 'Limited',
    inStock: true,
    stockCount: 8,
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Supernova Gold', hex: '#f5b800' }],
  },
];

export function getProductById(id: string): FullProduct | undefined {
  return DEMO_PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: string, category: string, limit = 4): FullProduct[] {
  return DEMO_PRODUCTS
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}