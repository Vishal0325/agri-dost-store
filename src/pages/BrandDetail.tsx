
import React from 'react';
import { ArrowLeft, Star, ShoppingCart, Award, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const BrandDetailPage = () => {
  const navigate = useNavigate();
  const { brandName } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = (product: any) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      company: brandName || 'Unknown Brand',
      badge: product.inStock ? 'In Stock' : 'Out of Stock'
    };
    addToCart(cartProduct);
  };

  // Brand information
  const brandInfo = {
    name: brandName || 'Brand Name',
    description: "Leading agricultural solutions provider committed to empowering farmers with innovative products and sustainable farming practices.",
    history: "With over 25 years of experience in the agricultural sector, we have been at the forefront of agricultural innovation.",
    commitment: "Our commitment to quality ensures that every product meets the highest standards for agricultural excellence.",
    stats: {
      experience: "25+ Years",
      farmers: "10,000+ Farmers",
      products: "50+ Products"
    }
  };

  // Mock brand products data - in real app this would come from API
  const brandProducts = [
    {
      id: 1,
      name: "Premium Hybrid Tomato Seeds",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=300",
      price: 450,
      originalPrice: 550,
      size: "500ml",
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: "Disease Resistant Wheat Seeds",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=300",
      price: 320,
      originalPrice: 380,
      size: "1kg",
      rating: 4.3,
      inStock: true
    },
    {
      id: 3,
      name: "High Yield Rice Variety",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&w=300",
      price: 280,
      originalPrice: 350,
      size: "2kg",
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: "Organic Fertilizer NPK",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=300",
      price: 650,
      originalPrice: 750,
      size: "5kg",
      rating: 4.4,
      inStock: true
    },
    {
      id: 5,
      name: "Bio Pesticide Spray",
      image: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?ixlib=rb-4.0.3&w=300",
      price: 380,
      originalPrice: 450,
      size: "1L",
      rating: 4.2,
      inStock: true
    },
    {
      id: 6,
      name: "Soil Conditioner Premium",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=300",
      price: 520,
      originalPrice: 600,
      size: "3kg",
      rating: 4.6,
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{brandName || 'Brand Name'}</h1>
                <p className="text-gray-600">{brandProducts.length} products available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Brand Introduction Section */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
              <Leaf className="h-8 w-8 mr-3 text-green-600" />
              {brandInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-4">{brandInfo.description}</p>
                <p className="text-gray-600 mb-4">{brandInfo.history}</p>
                <p className="text-gray-600">{brandInfo.commitment}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Legacy</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Award className="h-6 w-6 text-green-600" />
                    <span className="font-medium">{brandInfo.stats.experience} Experience</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{brandInfo.stats.farmers} Served</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <ShoppingCart className="h-6 w-6 text-purple-600" />
                    <span className="font-medium">{brandInfo.stats.products} Available</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Catalog Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Catalog</h2>
          <p className="text-gray-600">Discover our range of high-quality agricultural products</p>
        </div>
        
        <div className="space-y-4">
          {brandProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center p-4 space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>

                      {/* Size */}
                      <p className="text-sm text-gray-600 mb-2">
                        Size: <span className="font-medium">{product.size}</span>
                      </p>

                      {/* Stock Status */}
                      <div className="flex items-center space-x-2">
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="text-right">
                      <div className="mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                        <div className="text-xs text-green-600">
                          Save ₹{product.originalPrice - product.price}
                        </div>
                      </div>

                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {brandProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found for this brand</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetailPage;
