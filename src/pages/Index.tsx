
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Phone, Truck, Leaf, Star, ArrowRight, Crown, Gift, Heart, Sprout, SprayCan, Wrench, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WalletDisplay from '@/components/WalletDisplay';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import VoiceSearch from '@/components/VoiceSearch';
import SearchResults from '@/components/SearchResults';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();
  
  // Add state for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // ... keep existing code (categories array)
  const categories = [
    {
      id: 1,
      name: t('categories.seeds'),
      icon: Sprout,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      count: t('categories.seedsCount'),
      bgColor: "from-green-400 to-green-600"
    },
    {
      id: 2,
      name: t('categories.pgr'),
      icon: Leaf,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: t('categories.pgrCount'),
      bgColor: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      name: t('categories.pesticides'),
      icon: SprayCan,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      count: t('categories.pesticidesCount'),
      bgColor: "from-red-400 to-red-600"
    },
    {
      id: 4,
      name: t('categories.herbicide'),
      icon: Crown,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: t('categories.herbicideCount'),
      bgColor: "from-purple-400 to-purple-600"
    },
    {
      id: 5,
      name: t('categories.sprayMachine'),
      icon: SprayCan,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      count: t('categories.sprayMachineCount'),
      bgColor: "from-orange-400 to-orange-600"
    },
    {
      id: 6,
      name: t('categories.tools'),
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: t('categories.toolsCount'),
      bgColor: "from-amber-400 to-amber-600"
    }
  ];

  // ... keep existing code (products array)
  const products = [
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: 450,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      rating: 4.8,
      reviews: 234,
      badge: "Premium",
      discount: 18
    },
    {
      id: 2,
      name: "Organic NPK Fertilizer",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.9,
      reviews: 187,
      badge: "Bestseller",
      discount: 20
    },
    {
      id: 3,
      name: "Bio Pesticide Spray",
      price: 800,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 156,
      badge: "Eco-friendly",
      discount: 16
    },
    {
      id: 4,
      name: "Smart Irrigation Kit",
      price: 2500,
      originalPrice: 3000,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 89,
      badge: "New",
      discount: 17
    }
  ];

  // Enhanced search function for both text and voice
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    console.log('Performing search for:', query);

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.badge.toLowerCase().includes(query.toLowerCase()) ||
      (query.toLowerCase().includes('seed') && product.name.toLowerCase().includes('seed')) ||
      (query.toLowerCase().includes('fertilizer') && product.name.toLowerCase().includes('fertilizer')) ||
      (query.toLowerCase().includes('pesticide') && product.name.toLowerCase().includes('pesticide')) ||
      (query.toLowerCase().includes('organic') && product.name.toLowerCase().includes('organic')) ||
      (query.toLowerCase().includes('tomato') && product.name.toLowerCase().includes('tomato')) ||
      (query.toLowerCase().includes('wheat') && product.name.toLowerCase().includes('wheat')) ||
      (query.toLowerCase().includes('rice') && product.name.toLowerCase().includes('rice')) ||
      (query.toLowerCase().includes('smart') && product.name.toLowerCase().includes('smart')) ||
      (query.toLowerCase().includes('irrigation') && product.name.toLowerCase().includes('irrigation'))
    );
    
    console.log('Search results:', filteredProducts);
    setSearchResults(filteredProducts);
    setShowSearchResults(true);
    
    toast({
      title: "Search Complete",
      description: `Found ${filteredProducts.length} products matching "${query}"`,
    });
  };

  // Handle text search from button click
  const handleTextSearch = () => {
    console.log('Search button clicked with query:', searchQuery);
    performSearch(searchQuery);
  };

  // Handle voice search - updates the visible search query and performs search
  const handleVoiceSearch = (query: string) => {
    console.log('Voice search captured:', query);
    setSearchQuery(query); // Update the visible search input
    performSearch(query);
  };

  // Handle search input change with real-time feedback
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search input changed:', value);
    setSearchQuery(value);
    
    // Perform instant search as user types (after 2 characters)
    if (value.length > 2) {
      performSearch(value);
    } else if (value.length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed, performing search');
      handleTextSearch();
    }
  };

  const handlePurchase = (product: any) => {
    const productPrice = product.price;
    
    if (balance >= productPrice) {
      const success = deductMoney(productPrice);
      if (success) {
        toast({
          title: "Purchase Successful!",
          description: `You bought ${product.name} for ₹${productPrice}`,
        });
      }
    } else {
      toast({
        title: "Insufficient Balance",
        description: `You need ₹${productPrice - balance} more to buy this product`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white shadow-2xl">
        {/* Top bar */}
        <div className="border-b border-green-500 bg-green-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{t('header.phone')}</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>{t('header.shipping')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <WalletDisplay variant="header" />
                <LanguageSwitcher />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-green-700"
                  onClick={() => navigate('/login')}
                >
                  {t('header.login')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {t('header.title')}
                </h1>
                <p className="text-sm text-green-200">{t('header.subtitle')}</p>
              </div>
            </div>

            {/* Enhanced Search bar with Real-time Text and Voice Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={t('header.search')}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-20 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                />
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <VoiceSearch onSearchResults={handleVoiceSearch} />
                </div>
                <Button 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={handleTextSearch}
                >
                  {t('common.search')}
                </Button>
              </div>
              {/* Real-time search feedback */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 text-xs text-green-200 bg-green-800/80 px-3 py-1 rounded-md backdrop-blur-sm">
                  Searching for: "{searchQuery}"
                </div>
              )}
            </div>

            {/* Cart and Wallet */}
            <div className="flex items-center space-x-4">
              <WalletDisplay variant="inline" />
              <Button 
                variant="ghost" 
                className="relative p-3 hover:bg-green-700 rounded-full"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">3</Badge>
                <span className="ml-2 hidden md:inline">{t('header.cart')}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-green-500 bg-green-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-6 py-3 flex-wrap">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button 
                    key={category.id}
                    variant="ghost" 
                    className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2 text-sm"
                    onClick={() => navigate('/products')}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{category.name}</span>
                  </Button>
                );
              })}
              <Button 
                variant="ghost" 
                className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2"
                onClick={() => navigate('/crop-products')}
              >
                <Sprout className="h-4 w-4" />
                <span className="hidden md:inline">{t('nav.cropSuggestions')}</span>
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2"
                onClick={() => navigate('/blog')}
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{t('nav.blog')}</span>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Results Modal */}
      {showSearchResults && (
        <SearchResults 
          query={searchQuery}
          products={searchResults}
          onClose={() => setShowSearchResults(false)}
        />
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoryGrid />

      {/* Featured Products - keep existing implementation */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{t('products.title')}</h3>
            <p className="text-xl text-gray-600">अधिकतम उत्पादन और गुणवत्ता के लिए हस्तचयनित उत्पाद</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
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
                      className="w-full h-64 object-cover"
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
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-3 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className={`w-full font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-200 ${
                        balance >= product.price 
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white' 
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                      disabled={balance < product.price}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(product);
                      }}
                    >
                      <Wallet className="h-5 w-5 mr-2" />
                      {balance >= product.price ? `वॉलेट से खरीदें ₹${product.price}` : 'अपर्याप्त बैलेंस'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/products')}
            >
              {t('products.viewAll')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - keep existing implementation */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-bold">{t('header.title')}</h4>
              </div>
              <p className="text-green-200">
                {t('header.subtitle')}
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{t('footer.quickLinks')}</h5>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{t('footer.productCategories')}</h5>
              <ul className="space-y-2 text-green-200">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors flex items-center space-x-2"
                      onClick={() => navigate('/products')}
                    >
                      <category.icon className="h-3 w-3" />
                      <span>{category.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">{t('footer.contactInfo')}</h5>
              <div className="space-y-2 text-green-200">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {t('header.phone')}
                </p>
                <p>📧 info@krishimart.com</p>
                <p>📍 New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
