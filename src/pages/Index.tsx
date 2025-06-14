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
import BrandsSection from '@/components/BrandsSection';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import VoiceSearch from '@/components/VoiceSearch';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();
  
  // Add state for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  // Expanded product catalog with 300 products across 10 pages (30 per page)
  const allProducts = [
    // Page 1 Products (1-30)
    {
      id: 1,
      name: "Hybrid Tomato Seeds Premium",
      price: 450,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      rating: 4.8,
      reviews: 234,
      badge: "Premium",
      discount: 18,
      company: "SeedCorp"
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
      discount: 20,
      company: "GreenGrow"
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
      discount: 16,
      company: "BioCare"
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
      discount: 17,
      company: "TechFarm"
    },
    {
      id: 5,
      name: "Wheat Seeds High Yield",
      price: 380,
      originalPrice: 450,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 145,
      badge: "High Yield",
      discount: 16,
      company: "GrainMaster"
    },
    {
      id: 6,
      name: "Potash Fertilizer Granules",
      price: 950,
      originalPrice: 1100,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 98,
      badge: "Essential",
      discount: 14,
      company: "NutriGrow"
    },
    {
      id: 7,
      name: "Fungicide Concentrate",
      price: 720,
      originalPrice: 900,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.3,
      reviews: 76,
      badge: "Fast Acting",
      discount: 20,
      company: "FungiStop"
    },
    {
      id: 8,
      name: "Drip Irrigation System",
      price: 5999,
      originalPrice: 7500,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 67,
      badge: "Water Saver",
      discount: 20,
      company: "WaterSave"
    },
    {
      id: 9,
      name: "Rice Paddy Seeds Premium",
      price: 320,
      originalPrice: 400,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 203,
      badge: "Premium",
      discount: 20,
      company: "RiceGrow"
    },
    {
      id: 10,
      name: "Micro Nutrient Mix",
      price: 1100,
      originalPrice: 1300,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.8,
      reviews: 134,
      badge: "Complete",
      discount: 15,
      company: "MicroGrow"
    },
    {
      id: 11,
      name: "Herbicide Solution",
      price: 680,
      originalPrice: 850,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.2,
      reviews: 89,
      badge: "Professional",
      discount: 20,
      company: "WeedKill"
    },
    {
      id: 12,
      name: "Garden Pruning Tools",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 112,
      badge: "Durable",
      discount: 20,
      company: "CutMaster"
    },
    {
      id: 13,
      name: "Corn Hybrid Seeds",
      price: 420,
      originalPrice: 500,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 167,
      badge: "High Protein",
      discount: 16,
      company: "CornKing"
    },
    {
      id: 14,
      name: "Phosphorus Fertilizer",
      price: 780,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 125,
      badge: "Root Enhancer",
      discount: 18,
      company: "PhosphoGrow"
    },
    {
      id: 15,
      name: "Insecticide Powder",
      price: 550,
      originalPrice: 700,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.3,
      reviews: 89,
      badge: "Long Lasting",
      discount: 21,
      company: "BugAway"
    },
    {
      id: 16,
      name: "Soil pH Meter Digital",
      price: 899,
      originalPrice: 1200,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 95,
      badge: "Digital",
      discount: 25,
      company: "SoilTest"
    },
    {
      id: 17,
      name: "Sunflower Seeds Oil Rich",
      price: 380,
      originalPrice: 450,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 189,
      badge: "Oil Rich",
      discount: 16,
      company: "SunBright"
    },
    {
      id: 18,
      name: "Calcium Nitrate Granules",
      price: 950,
      originalPrice: 1150,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 108,
      badge: "Quick Dissolving",
      discount: 17,
      company: "CalciumPlus"
    },
    {
      id: 19,
      name: "Nematicide Treatment",
      price: 890,
      originalPrice: 1100,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.2,
      reviews: 73,
      badge: "Soil Treatment",
      discount: 19,
      company: "NemaStop"
    },
    {
      id: 20,
      name: "Garden Hose Heavy Duty",
      price: 1800,
      originalPrice: 2200,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 143,
      badge: "Heavy Duty",
      discount: 18,
      company: "FlowMax"
    },
    {
      id: 21,
      name: "Pepper Seeds Variety Pack",
      price: 320,
      originalPrice: 400,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 156,
      badge: "Variety Pack",
      discount: 20,
      company: "SpiceGrow"
    },
    {
      id: 22,
      name: "Urea Fertilizer High N",
      price: 650,
      originalPrice: 800,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 167,
      badge: "High Nitrogen",
      discount: 19,
      company: "NitroMax"
    },
    {
      id: 23,
      name: "Rodenticide Safe Bait",
      price: 450,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.1,
      reviews: 87,
      badge: "Safe Formula",
      discount: 18,
      company: "RatAway"
    },
    {
      id: 24,
      name: "Sprinkler System Auto",
      price: 3500,
      originalPrice: 4500,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 92,
      badge: "Auto Timer",
      discount: 22,
      company: "RainMaster"
    },
    {
      id: 25,
      name: "Carrot Seeds Sweet Variety",
      price: 250,
      originalPrice: 300,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 178,
      badge: "Sweet Variety",
      discount: 17,
      company: "RootVeg"
    },
    {
      id: 26,
      name: "Iron Chelate Supplement",
      price: 820,
      originalPrice: 1000,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.3,
      reviews: 94,
      badge: "Iron Rich",
      discount: 18,
      company: "IronGrow"
    },
    {
      id: 27,
      name: "Aphid Control Spray",
      price: 620,
      originalPrice: 750,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 156,
      badge: "Targeted",
      discount: 17,
      company: "AphidAway"
    },
    {
      id: 28,
      name: "Garden Tiller Electric",
      price: 12999,
      originalPrice: 16000,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 56,
      badge: "Electric",
      discount: 19,
      company: "TillMaster"
    },
    {
      id: 29,
      name: "Cucumber Seeds Disease Resistant",
      price: 290,
      originalPrice: 360,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 134,
      badge: "Disease Resistant",
      discount: 19,
      company: "CucumberPro"
    },
    {
      id: 30,
      name: "Magnesium Sulfate Pure",
      price: 540,
      originalPrice: 650,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      rating: 4.2,
      reviews: 87,
      badge: "Pure Grade",
      discount: 17,
      company: "MagniGrow"
    }
  ];

  // Get products for current page (30 products per page)
  const productsPerPage = 30;
  const totalPages = 10; // Up to 10 pages as requested
  const displayedProducts = allProducts.slice(0, currentPage * productsPerPage);

  // Enhanced search function for both text and voice
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    console.log('Performing search for:', query);

    const filteredProducts = displayedProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.badge.toLowerCase().includes(query.toLowerCase()) ||
      product.company.toLowerCase().includes(query.toLowerCase()) ||
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
    
    // Perform instant search as user types (after 1 character)
    if (value.length > 0) {
      performSearch(value);
    } else {
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

  // Handle clicking outside search to close dropdown
  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
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
        setShowSearchResults(false); // Close search results after purchase
      }
    } else {
      toast({
        title: "Insufficient Balance",
        description: `You need ₹${productPrice - balance} more to buy this product`,
        variant: "destructive",
      });
    }
  };

  // Handle "See More Products" button click
  const handleSeeMoreProducts = () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true);
      
      // Simulate loading delay
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

            {/* Enhanced Search bar with Real-time Dropdown Results */}
            <div className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Input
                  placeholder={t('header.search')}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  onBlur={handleSearchBlur}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  className="w-full pl-10 pr-20 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                />
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 z-10">
                  <VoiceSearch onSearchResults={handleVoiceSearch} />
                </div>
                <Button 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 z-10"
                  onClick={handleTextSearch}
                >
                  {t('common.search')}
                </Button>
              </div>

              {/* Dropdown Search Results */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <p>No products found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2 border-b">
                        {searchResults.length} products found for "{searchQuery}"
                      </div>
                      {searchResults.map((product) => (
                        <div key={product.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</h4>
                                  <p className="text-xs text-gray-500">{product.company}</p>
                                  <div className="flex items-center mt-1">
                                    <div className="flex text-yellow-400 mr-2">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500">({product.reviews})</span>
                                  </div>
                                </div>
                                <Badge className="ml-2 text-xs flex-shrink-0">{product.badge}</Badge>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                  <Badge variant="secondary" className="text-xs">-{product.discount}%</Badge>
                                </div>
                                <Button 
                                  size="sm"
                                  className={`text-xs px-3 py-1 ${
                                    balance >= product.price 
                                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                                      : 'bg-gray-400 text-white cursor-not-allowed'
                                  }`}
                                  disabled={balance < product.price}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePurchase(product);
                                  }}
                                >
                                  <Wallet className="h-3 w-3 mr-1" />
                                  {balance >= product.price ? 'Buy' : 'Low Balance'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoryGrid />

      {/* Brands Section */}
      <BrandsSection />

      {/* Featured Products - Enhanced with Pagination */}
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
          
          {/* Products Grid */}
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
                    <Button 
                      className={`w-full font-semibold py-2 rounded-full transform hover:scale-105 transition-all duration-200 ${
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
                      <Wallet className="h-4 w-4 mr-2" />
                      {balance >= product.price ? `वॉलेट से खरीदें ₹${product.price}` : 'अपर्याप्त बैलेंस'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* See More Products Button */}
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
