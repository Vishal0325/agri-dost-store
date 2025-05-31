
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
  // New fields for enhanced functionality
  nameHindi?: string;
  packSize?: string;
  unit?: string;
  usageStage?: string[];
  cropTypes?: string[];
  rating?: number;
  reviews?: number;
  frequentlyBoughtWith?: string[];
  seasonal?: boolean;
  organicCertified?: boolean;
  mrp?: number;
  sellingPrice?: number;
}
