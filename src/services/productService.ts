
import { allProducts } from '@/lib/products';

export interface ProductDetail {
  id: number;
  name: string;
  mrp: number;
  sellingPrice: number;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  sku: string;
  availability: string;
  discount: string;
  badge: string;
  images: string[];
  measurementType: 'weight' | 'volume'; // New field to distinguish product type
  sizeOptions: {
    size: string;
    price: number;
    mrp: number;
    unit: string; // e.g., 'gm', 'kg', 'ml', 'L'
  }[];
  description: string;
  productUses: string[];
  features: string[];
  specifications: Record<string, string>;
  usageInstructions: string[];
}

// Mock function to simulate API call with delay
const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 10% chance of API failure for testing
      if (Math.random() < 0.1) {
        reject(new Error('Failed to load product data'));
      } else {
        resolve(data);
      }
    }, delay);
  });
};

export const getProductById = async (id: string): Promise<ProductDetail> => {
  try {
    // Find product in our mock data
    const baseProduct = allProducts.find(p => p.id === parseInt(id));
    
    if (!baseProduct) {
      throw new Error('Product not found');
    }

    // Determine product category and measurement type
    const getProductCategory = (productName: string) => {
      const name = productName.toLowerCase();
      if (name.includes('seed')) return { category: 'Seeds', measurementType: 'weight' as const };
      if (name.includes('fertilizer') || name.includes('manure')) return { category: 'Fertilizers', measurementType: 'weight' as const };
      if (name.includes('pesticide') || name.includes('insecticide')) return { category: 'Pesticides', measurementType: 'volume' as const };
      if (name.includes('growth') || name.includes('hormone')) return { category: 'Growth Promoters', measurementType: 'volume' as const };
      return { category: 'Seeds', measurementType: 'weight' as const };
    };

    const { category, measurementType } = getProductCategory(baseProduct.name);

    // Generate size options based on product type
    const getSizeOptions = (measurementType: 'weight' | 'volume', basePrice: number, baseMrp: number) => {
      if (measurementType === 'weight') {
        // Weight-based products (seeds, fertilizers)
        return [
          { size: '1', price: Math.round(basePrice * 0.1), mrp: Math.round(baseMrp * 0.1), unit: 'gm' },
          { size: '2', price: Math.round(basePrice * 0.18), mrp: Math.round(baseMrp * 0.18), unit: 'gm' },
          { size: '5', price: Math.round(basePrice * 0.4), mrp: Math.round(baseMrp * 0.4), unit: 'gm' },
          { size: '10', price: Math.round(basePrice * 0.7), mrp: Math.round(baseMrp * 0.7), unit: 'gm' },
          { size: '500', price: basePrice, mrp: baseMrp, unit: 'gm' },
          { size: '1', price: Math.round(basePrice * 1.8), mrp: Math.round(baseMrp * 1.8), unit: 'kg' },
          { size: '5', price: Math.round(basePrice * 8.5), mrp: Math.round(baseMrp * 8.5), unit: 'kg' },
          { size: '10', price: Math.round(basePrice * 16), mrp: Math.round(baseMrp * 16), unit: 'kg' },
          { size: '25', price: Math.round(basePrice * 38), mrp: Math.round(baseMrp * 38), unit: 'kg' }
        ];
      } else {
        // Volume-based products (liquids)
        return [
          { size: '10', price: Math.round(basePrice * 0.2), mrp: Math.round(baseMrp * 0.2), unit: 'ml' },
          { size: '25', price: Math.round(basePrice * 0.4), mrp: Math.round(baseMrp * 0.4), unit: 'ml' },
          { size: '50', price: Math.round(basePrice * 0.7), mrp: Math.round(baseMrp * 0.7), unit: 'ml' },
          { size: '100', price: basePrice, mrp: baseMrp, unit: 'ml' },
          { size: '250', price: Math.round(basePrice * 2.2), mrp: Math.round(baseMrp * 2.2), unit: 'ml' },
          { size: '500', price: Math.round(basePrice * 4), mrp: Math.round(baseMrp * 4), unit: 'ml' },
          { size: '1', price: Math.round(basePrice * 7.5), mrp: Math.round(baseMrp * 7.5), unit: 'L' },
          { size: '5', price: Math.round(basePrice * 35), mrp: Math.round(baseMrp * 35), unit: 'L' }
        ];
      }
    };

    // Create detailed product data
    const productDetail: ProductDetail = {
      id: baseProduct.id,
      name: baseProduct.name,
      mrp: baseProduct.originalPrice,
      sellingPrice: baseProduct.price,
      rating: baseProduct.rating,
      reviews: baseProduct.reviews,
      brand: baseProduct.company,
      category,
      measurementType,
      sku: `SKU${baseProduct.id.toString().padStart(3, '0')}`,
      availability: "In Stock",
      discount: `${baseProduct.discount}% OFF`,
      badge: baseProduct.badge,
      images: [
        baseProduct.image,
        "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?ixlib=rb-4.0.3"
      ],
      sizeOptions: getSizeOptions(measurementType, baseProduct.price, baseProduct.originalPrice),
      description: `Premium quality ${baseProduct.name.toLowerCase()} that produces high-yield, disease-resistant plants. Perfect for both greenhouse and open field cultivation. These products are specially treated for better results and healthier plants.`,
      productUses: [
        "Ideal for commercial farming and home gardening",
        "Suitable for greenhouse cultivation with controlled environment",
        "Perfect for open field farming in various soil conditions",
        "Excellent for organic farming practices",
        "Recommended for farmers seeking high-yield varieties",
        "Great for producing quality crops for fresh market sales",
        "Suitable for processing industries requiring quality products"
      ],
      features: [
        "High yield variety - excellent results guaranteed",
        "Disease resistant to most common plant diseases",
        "Suitable for all seasons",
        "Premium quality guaranteed",
        "Organic treatment for better growth"
      ],
      specifications: {
        "Product Type": "Premium Grade",
        "Quality": "A+ Grade",
        "Suitable Season": "All seasons",
        "Shelf Life": "2-3 years",
        "Storage": "Cool, dry place",
        "Origin": "India"
      },
      usageInstructions: [
        "Read all instructions carefully before use",
        "Use in well-prepared soil with good drainage",
        "Maintain optimal temperature for best results",
        "Water regularly but avoid waterlogging",
        "Apply as per recommended dosage",
        "Store in cool, dry place after opening"
      ]
    };

    return await simulateApiCall(productDetail);
  } catch (error) {
    throw error;
  }
};
