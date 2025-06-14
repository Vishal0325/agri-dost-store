
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, MessageCircle, Plus, Minus, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById, ProductDetail } from '@/services/productService';

const ProductDetailPage = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [activeTab, setActiveTab] = useState('description');
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { balance } = useWallet();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('MISSING_ID');
        setLoading(false);
        return;
      }

      // Validate that id is a valid number
      const productId = parseInt(id);
      if (isNaN(productId) || productId <= 0) {
        setError('INVALID_ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        setProduct(productData);
        setSelectedSize(productData.sizeOptions[3]?.size || productData.sizeOptions[0]?.size || '500ml');
      } catch (err) {
        console.error('Failed to load product:', err);
        if (err instanceof Error && err.message === 'Product not found') {
          setError('NOT_FOUND');
        } else {
          setError('FETCH_ERROR');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const getCurrentPrice = () => {
    if (!product) return 0;
    const currentOption = product.sizeOptions.find(option => option.size === selectedSize);
    return currentOption ? currentOption.price : product.sellingPrice;
  };

  const getCurrentMRP = () => {
    if (!product) return 0;
    const currentOption = product.sizeOptions.find(option => option.size === selectedSize);
    return currentOption ? currentOption.mrp : product.mrp;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToProducts = () => {
    navigate('/products');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const currentPrice = getCurrentPrice();
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: getCurrentMRP(),
      image: product.images[0],
      company: product.brand,
      badge: product.badge,
      quantity: quantity
    };
    
    addToCart(cartItem);
    console.log('Adding to cart:', product.name, 'Size:', selectedSize, 'Quantity:', quantity, 'Price:', currentPrice);
    toast({
      title: "कार्ट में जोड़ा गया!",
      description: `${quantity} ${product.name} (${selectedSize}) आपके कार्ट में जोड़ दिया गया है`,
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    console.log('Adding to wishlist:', product.name);
    toast({
      title: "विशलिस्ट में जोड़ा गया!",
      description: `${product.name} आपकी विशलिस्ट में जोड़ दिया गया है`,
    });
  };

  const handleShare = () => {
    if (!product) return;
    console.log('Sharing product:', product.name);
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "लिंक कॉपी किया गया!",
        description: "उत्पाद लिंक आपके क्लिपबोर्ड में कॉपी कर दिया गया है",
      });
    }
  };

  const handleWhatsAppSupport = () => {
    console.log('Opening WhatsApp support');
    toast({
      title: "WhatsApp सपोर्ट",
      description: "WhatsApp सपोर्ट खोला जा रहा है...",
    });
  };

  const handleWriteReview = () => {
    console.log('Opening review form');
    toast({
      title: "समीक्षा लिखें",
      description: "समीक्षा फॉर्म खोला जा रहा है...",
    });
  };

  const handleRetry = () => {
    if (id) {
      window.location.reload();
    }
  };

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case 'MISSING_ID':
        return {
          title: 'उत्पाद की जानकारी अनुपलब्ध',
          description: 'उत्पाद ID मिलते नहीं है। कृपया उत्पाद सूची से दोबारा चुनें।',
          showRetry: false
        };
      case 'INVALID_ID':
        return {
          title: 'अमान्य उत्पाद ID',
          description: 'यह एक अमान्य उत्पाद ID है। कृपया उत्पाद सूची से सही उत्पाद चुनें।',
          showRetry: false
        };
      case 'NOT_FOUND':
        return {
          title: 'उत्पाद उपलब्ध नहीं',
          description: 'यह उत्पाद अब उपलब्ध नहीं है या हटा दिया गया है। कृपया अन्य उत्पाद देखें।',
          showRetry: false
        };
      default:
        return {
          title: 'उत्पाद लोड नहीं हो सका',
          description: 'उत्पाद की जानकारी लोड करने में समस्या हुई है। कृपया दोबारा कोशिश करें।',
          showRetry: true
        };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Button variant="ghost" size="sm" className="p-0" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="w-full h-96 rounded-lg mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    const errorInfo = getErrorMessage(error || 'FETCH_ERROR');
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {errorInfo.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {errorInfo.description}
            </p>
            <div className="space-y-3">
              {errorInfo.showRetry && (
                <Button onClick={handleRetry} className="w-full">
                  <Loader2 className="h-4 w-4 mr-2" />
                  दोबारा कोशिश करें
                </Button>
              )}
              <Button variant="outline" onClick={handleBackToProducts} className="w-full">
                सभी उत्पाद देखें
              </Button>
              <Button variant="ghost" onClick={handleBackToCart} className="w-full">
                कार्ट पर वापस जाएं
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent product! Got great results as promised. Highly recommended.",
      location: "Punjab",
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "1 month ago", 
      comment: "Good quality product. Very satisfied with the results. Will order again.",
      location: "Haryana",
      verified: true
    },
    {
      id: 3,
      name: "Mohammad Ali",
      rating: 5,
      date: "1 month ago",
      comment: "Best product I have used. High quality and excellent results.",
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
            <Button variant="ghost" size="sm" className="p-0" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
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
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3';
                }}
              />
              <Badge className="absolute top-4 left-4 bg-orange-500">
                {product.badge}
              </Badge>
              <Badge variant="destructive" className="absolute top-4 right-4">
                {product.discount}
              </Badge>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
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
                    className="w-full h-16 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3';
                    }}
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

            {/* Size Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size Options</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizeOptions.map((option) => (
                    <SelectItem key={option.size} value={option.size}>
                      {option.size} - ₹{option.price} (MRP: ₹{option.mrp})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-green-600">₹{getCurrentPrice()}</span>
                <span className="text-xl text-gray-500 line-through">₹{getCurrentMRP()}</span>
                <Badge variant="destructive" className="text-sm">
                  Save {Math.round(((getCurrentMRP() - getCurrentPrice()) / getCurrentMRP()) * 100)}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">MRP: ₹{getCurrentMRP()} (Inclusive of all taxes)</p>
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
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{(getCurrentPrice() * quantity).toLocaleString()}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={handleShare}
                >
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
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleWhatsAppSupport}
                  >
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
            <TabsList className="grid grid-cols-5 w-full lg:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="uses">Product Uses</TabsTrigger>
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

            <TabsContent value="uses" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Uses & Applications</h3>
                  <div className="space-y-3">
                    {product.productUses.map((use, index) => (
                      <div key={index} className="flex items-start">
                        <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{use}</span>
                      </div>
                    ))}
                  </div>
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
                    <Button variant="outline" onClick={handleWriteReview}>
                      Write a Review
                    </Button>
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
