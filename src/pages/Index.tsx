import React, { useState } from 'react';
import { ShoppingCart, Star, ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import BrandsSection from '@/components/BrandsSection';
import { useWallet } from '@/contexts/WalletContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { allProducts } from '@/lib/products';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { balance } = useWallet();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get products for current page (30 products per page)
  const productsPerPage = 30;
  const totalPages = 10;
  const displayedProducts = allProducts.slice(0, currentPage * productsPerPage);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleSeeMoreProducts = () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true);
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsLoadingMore(false);
        
        toast({
          title: "More Products Loaded!",
          description: `Showing page ${currentPage + 1} of ${totalPages}`,
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <HeroSection />

      <CategoryGrid />

      <BrandsSection />

      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{t('products.title')}</h3>
            <p className="text-xl text-gray-600 mb-4">अधिकतम उत्पादन और गुणवत्ता के लिए हस्तचयनित उत्पाद</p>
            <div className="flex justify-center items-center space-x-4 text-lg">
              <Badge className="bg-green-600 text-white px-4 py-2">
                दिखाए जा रहे: {displayedProducts.length} उत्पाद
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                पेज {currentPage} का {totalPages}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-0 bg-white overflow-hidden"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
                      -{product.discount}%
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      {product.badge}
                    </Badge>
                    {balance < product.price && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge className="w-full bg-orange-500 text-white text-center py-1">
                          अपर्याप्त वॉलेट बैलेंस
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-gray-900 hover:bg-gray-100">
                        Quick View
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-green-600 font-medium mb-1">{product.company}</p>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-full transform hover:scale-105 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        कार्ट में जोड़ें
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            {currentPage < totalPages ? (
              <Button 
                size="lg" 
                className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold ${
                  isLoadingMore ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSeeMoreProducts}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    लोड हो रहा है...
                  </>
                ) : (
                  <>
                    और उत्पाद देखें ({totalPages - currentPage} पेज बाकी)
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center">
                <Badge className="bg-green-600 text-white px-8 py-4 text-lg">
                  ✅ सभी {displayedProducts.length} उत्पाद दिखाए गए
                </Badge>
                <p className="text-gray-600 mt-4 text-lg">
                  अधिक उत्पादों के लिए उत्पाद पेज पर जाएं
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 mt-4"
                  onClick={() => navigate('/products')}
                >
                  सभी उत्पाद देखें
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
