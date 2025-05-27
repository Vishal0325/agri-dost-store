
import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, MessageCircle, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: 1,
    name: "Premium Hybrid Tomato Seeds",
    price: "₹450",
    originalPrice: "₹550",
    rating: 4.5,
    reviews: 124,
    brand: "SeedCorp",
    category: "Seeds",
    sku: "SKU001",
    availability: "In Stock",
    discount: "18% OFF",
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3"
    ],
    description: "Premium quality hybrid tomato seeds that produce high-yield, disease-resistant plants. Perfect for both greenhouse and open field cultivation. These seeds are specially treated for better germination rate and healthier plants.",
    features: [
      "High yield variety - up to 40-50 kg per plant",
      "Disease resistant to most common tomato diseases",
      "Suitable for all seasons",
      "90% germination rate guaranteed",
      "Organic treatment for better growth"
    ],
    specifications: {
      "Seed Type": "Hybrid",
      "Germination Rate": "90%+",
      "Planting Season": "All seasons",
      "Harvest Time": "75-80 days",
      "Plant Height": "4-6 feet",
      "Fruit Weight": "80-120 grams"
    },
    usageInstructions: [
      "Soak seeds in lukewarm water for 2-3 hours before sowing",
      "Sow seeds in well-prepared seedbed with good drainage",
      "Maintain soil temperature between 20-25°C for best germination",
      "Water regularly but avoid waterlogging",
      "Transplant seedlings after 25-30 days",
      "Apply organic fertilizer every 15 days"
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent seeds! Got 90% germination rate as promised. My tomato plants are growing very well.",
      location: "Punjab",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "1 month ago", 
      comment: "Good quality seeds. Plants are healthy and disease-free. Will order again.",
      location: "Haryana",
      verified: true
    },
    {
      id: 3,
      name: "Mohammad Ali",
      rating: 5,
      date: "1 month ago",
      comment: "Best tomato seeds I have used. High yield and excellent fruit quality.",
      location: "UP",
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Button variant="ghost" size="sm" className="p-0">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Seeds</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Vegetable Seeds</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Badge className="absolute top-4 left-4 bg-orange-500">
                {product.badge}
              </Badge>
              <Badge variant="destructive" className="absolute top-4 right-4">
                {product.discount}
              </Badge>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-green-600 font-medium mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-green-600">{product.price}</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                <Badge variant="destructive" className="text-sm">
                  Save {((550-450)/550*100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-green-600 font-medium">✓ {product.availability}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-gray-600">packets</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{(450 * quantity).toLocaleString()}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Truck className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <MessageCircle className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">24/7 Support</p>
              </div>
            </div>

            {/* Quick Contact */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">Need help choosing?</p>
                    <p className="text-sm text-green-600">Talk to our farming expert</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full lg:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="usage">Usage Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Usage Instructions</h3>
                  <ol className="space-y-3">
                    {product.usageInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                              <span className="text-sm text-gray-600">• {review.location}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        {review.id !== reviews[reviews.length - 1].id && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
