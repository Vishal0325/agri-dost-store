
export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: string;
  originalPrice: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  inStock: boolean;
  badge: string;
  discount: string;
}
