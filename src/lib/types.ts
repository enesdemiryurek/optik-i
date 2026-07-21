export interface Product {
  id: string;
  name: string;
  model: string;
  brand: string;
  price: number;
  currency: string;
  description: string;
  category: 'sunglasses' | 'prescription' | 'lenses' | 'accessories' | 'kids';
  gender: 'men' | 'women' | 'unisex' | 'child';
  material: 'titanium' | 'acetate' | 'mixed' | 'metal';
  image: string;
  images?: string[];
  featured: boolean;
  inStock: boolean;
  specs?: ProductSpecs;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpecs {
  frameWidth?: string;
  lensWidth?: string;
  bridgeWidth?: string;
  templeLength?: string;
  lensHeight?: string;
  weight?: string;
  color?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

export interface FilterState {
  gender: string[];
  category: string[];
  color: string[];
  brand: string[];
  priceRange?: [number, number];
  searchQuery?: string;
}
