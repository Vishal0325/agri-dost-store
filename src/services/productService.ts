
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
  sizeOptions: {
    size: string;
    price: number;
    mrp: number;
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

    // Create detailed product data
    const productDetail: ProductDetail = {
      id: baseProduct.id,
      name: baseProduct.name,
      mrp: baseProduct.originalPrice,
      sellingPrice: baseProduct.price,
      rating: baseProduct.rating,
      reviews: baseProduct.reviews,
      brand: baseProduct.company,
      category: "Seeds", // Default category
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
      sizeOptions: [
        { size: '50ml', price: Math.round(baseProduct.price * 0.3), mrp: Math.round(baseProduct.originalPrice * 0.3) },
        { size: '100ml', price: Math.round(baseProduct.price * 0.6), mrp: Math.round(baseProduct.originalPrice * 0.6) },
        { size: '250ml', price: Math.round(baseProduct.price * 0.8), mrp: Math.round(baseProduct.originalPrice * 0.8) },
        { size: '500ml', price: baseProduct.price, mrp: baseProduct.originalPrice },
        { size: '1L', price: Math.round(baseProduct.price * 1.8), mrp: Math.round(baseProduct.originalPrice * 1.8) },
        { size: '2.5L', price: Math.round(baseProduct.price * 4), mrp: Math.round(baseProduct.originalPrice * 4) },
        { size: '5L', price: Math.round(baseProduct.price * 7.5), mrp: Math.round(baseProduct.originalPrice * 7.5) }
      ],
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
