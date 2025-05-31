
export interface CropCategory {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  season: 'kharif' | 'rabi' | 'zaid' | 'all';
  growthStages: string[];
  commonProducts: string[];
}

export interface CropProduct {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  subcategory: string;
  brand: string;
  mrp: number;
  sellingPrice: number;
  discount: number;
  packSize: string;
  unit: string;
  usageStage: string[];
  cropTypes: string[];
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  frequentlyBoughtWith: string[];
  seasonal: boolean;
  organicCertified: boolean;
}

export interface FilterOptions {
  brands: string[];
  usageStages: string[];
  priceRange: { min: number; max: number };
  categories: string[];
  packSizes: string[];
  organicOnly: boolean;
}
