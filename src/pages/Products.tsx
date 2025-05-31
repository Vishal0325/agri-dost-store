
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();

  // Expanded product catalog with 32 products
  const products = [
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: 450,
      originalPrice: 550,
      rating: 4.5,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "SeedCorp",
      discount: "18% OFF",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 2,
      name: "Organic NPK Fertilizer",
      price: 1200,
      originalPrice: 1500,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "GreenGrow",
      discount: "20% OFF",
      badge: "Organic",
      inStock: true
    },
    {
      id: 3,
      name: "Smart Irrigation Kit",
      price: 8999,
      originalPrice: 12000,
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "TechFarm",
      discount: "25% OFF",
      badge: "Premium",
      inStock: true
    },
    {
      id: 4,
      name: "Bio Pesticide Spray",
      price: 800,
      originalPrice: 950,
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "BioCare",
      discount: "15% OFF",
      badge: "Eco-Friendly",
      inStock: true
    },
    {
      id: 5,
      name: "Wheat Seeds Premium",
      price: 350,
      originalPrice: 420,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "GrainMaster",
      discount: "17% OFF",
      badge: "High Yield",
      inStock: true
    },
    {
      id: 6,
      name: "Drip Irrigation System",
      price: 5999,
      originalPrice: 7500,
      rating: 4.5,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "WaterSave",
      discount: "20% OFF",
      badge: "Water Efficient",
      inStock: true
    },
    {
      id: 7,
      name: "Compost Maker Kit",
      price: 2500,
      originalPrice: 3200,
      rating: 4.4,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "EcoCompost",
      discount: "22% OFF",
      badge: "Eco-Friendly",
      inStock: true
    },
    {
      id: 8,
      name: "Rice Paddy Seeds",
      price: 280,
      originalPrice: 350,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "RiceGrow",
      discount: "20% OFF",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 9,
      name: "Garden Pruning Shears",
      price: 1200,
      originalPrice: 1500,
      rating: 4.3,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "CutMaster",
      discount: "20% OFF",
      badge: "Durable",
      inStock: true
    },
    {
      id: 10,
      name: "Organic Pesticide",
      price: 650,
      originalPrice: 800,
      rating: 4.5,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "NaturalGuard",
      discount: "19% OFF",
      badge: "Certified Organic",
      inStock: true
    },
    {
      id: 11,
      name: "Corn Hybrid Seeds",
      price: 420,
      originalPrice: 500,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "CornKing",
      discount: "16% OFF",
      badge: "High Protein",
      inStock: true
    },
    {
      id: 12,
      name: "Soil pH Meter",
      price: 899,
      originalPrice: 1200,
      rating: 4.4,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "SoilTest",
      discount: "25% OFF",
      badge: "Digital",
      inStock: true
    },
    {
      id: 13,
      name: "Potash Fertilizer",
      price: 850,
      originalPrice: 1000,
      rating: 4.5,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "NutriGrow",
      discount: "15% OFF",
      badge: "Essential Nutrients",
      inStock: true
    },
    {
      id: 14,
      name: "Fungicide Spray",
      price: 720,
      originalPrice: 900,
      rating: 4.3,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "FungiStop",
      discount: "20% OFF",
      badge: "Fast Acting",
      inStock: true
    },
    {
      id: 15,
      name: "Sunflower Seeds",
      price: 380,
      originalPrice: 450,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "SunBright",
      discount: "16% OFF",
      badge: "Oil Rich",
      inStock: true
    },
    {
      id: 16,
      name: "Garden Hose 50ft",
      price: 1800,
      originalPrice: 2200,
      rating: 4.4,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "FlowMax",
      discount: "18% OFF",
      badge: "Heavy Duty",
      inStock: true
    },
    {
      id: 17,
      name: "Calcium Nitrate",
      price: 950,
      originalPrice: 1150,
      rating: 4.6,
      reviews: 108,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "CalciumPlus",
      discount: "17% OFF",
      badge: "Quick Dissolving",
      inStock: true
    },
    {
      id: 18,
      name: "Herbicide Concentrate",
      price: 680,
      originalPrice: 850,
      rating: 4.2,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "WeedKill",
      discount: "20% OFF",
      badge: "Professional Grade",
      inStock: true
    },
    {
      id: 19,
      name: "Pepper Seeds Mix",
      price: 320,
      originalPrice: 400,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "SpiceGrow",
      discount: "20% OFF",
      badge: "Variety Pack",
      inStock: true
    },
    {
      id: 20,
      name: "Lawn Mower Electric",
      price: 15999,
      originalPrice: 19999,
      rating: 4.7,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "GrassCut",
      discount: "20% OFF",
      badge: "Eco-Friendly",
      inStock: true
    },
    {
      id: 21,
      name: "Phosphorus Fertilizer",
      price: 780,
      originalPrice: 950,
      rating: 4.4,
      reviews: 125,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "PhosphoGrow",
      discount: "18% OFF",
      badge: "Root Enhancer",
      inStock: true
    },
    {
      id: 22,
      name: "Insecticide Powder",
      price: 550,
      originalPrice: 700,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "BugAway",
      discount: "21% OFF",
      badge: "Long Lasting",
      inStock: true
    },
    {
      id: 23,
      name: "Carrot Seeds Premium",
      price: 250,
      originalPrice: 300,
      rating: 4.6,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "RootVeg",
      discount: "17% OFF",
      badge: "Sweet Variety",
      inStock: true
    },
    {
      id: 24,
      name: "Sprinkler System Kit",
      price: 3500,
      originalPrice: 4500,
      rating: 4.5,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "RainMaster",
      discount: "22% OFF",
      badge: "Auto Timer",
      inStock: true
    },
    {
      id: 25,
      name: "Urea Fertilizer",
      price: 650,
      originalPrice: 800,
      rating: 4.4,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "NitroMax",
      discount: "19% OFF",
      badge: "High Nitrogen",
      inStock: true
    },
    {
      id: 26,
      name: "Nematicide Solution",
      price: 890,
      originalPrice: 1100,
      rating: 4.2,
      reviews: 73,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "NemaStop",
      discount: "19% OFF",
      badge: "Soil Treatment",
      inStock: true
    },
    {
      id: 27,
      name: "Cucumber Seeds Hybrid",
      price: 290,
      originalPrice: 360,
      rating: 4.5,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "CucumberPro",
      discount: "19% OFF",
      badge: "Disease Resistant",
      inStock: true
    },
    {
      id: 28,
      name: "Garden Tiller Machine",
      price: 12999,
      originalPrice: 16000,
      rating: 4.6,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "TillMaster",
      discount: "19% OFF",
      badge: "Heavy Duty",
      inStock: true
    },
    {
      id: 29,
      name: "Micronutrient Mix",
      price: 1200,
      originalPrice: 1500,
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      category: "Fertilizers",
      brand: "MicroGrow",
      discount: "20% OFF",
      badge: "Complete Formula",
      inStock: true
    },
    {
      id: 30,
      name: "Rodenticide Bait",
      price: 450,
      originalPrice: 550,
      rating: 4.1,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "RatAway",
      discount: "18% OFF",
      badge: "Safe Formula",
      inStock: true
    },
    {
      id: 31,
      name: "Lettuce Seeds Organic",
      price: 220,
      originalPrice: 280,
      rating: 4.6,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      category: "Seeds",
      brand: "LeafyGreens",
      discount: "21% OFF",
      badge: "Organic Certified",
      inStock: true
    },
    {
      id: 32,
      name: "Greenhouse Kit Small",
      price: 25999,
      originalPrice: 32000,
      rating: 4.8,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      category: "Tools",
      brand: "GrowHouse",
      discount: "19% OFF",
      badge: "Complete Kit",
      inStock: true
    }
  ];

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'];
  const brands = ['SeedCorp', 'GreenGrow', 'TechFarm', 'BioCare', 'GrainMaster', 'WaterSave'];

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

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">सभी उत्पाद</h1>
              <p className="text-gray-600">किसानों के लिए प्रीमियम कृषि समाधान</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="उत्पाद खोजें..."
                  className="pl-10 pr-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl text-gray-800 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-green-600" />
                    फिल्टर
                  </h2>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    Clear All
                  </Button>
                </div>
                
                {/* Wallet Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">वॉलेट बैलेंस</p>
                      <p className="text-2xl font-bold">₹{balance.toLocaleString('en-IN')}</p>
                    </div>
                    <Wallet className="h-8 w-8 opacity-80" />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-700">श्रेणी</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox id={category} className="border-green-300" />
                        <label htmlFor={category} className="text-sm font-medium text-gray-600 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-700">मूल्य सीमा</h3>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="border-green-200">
                      <SelectValue placeholder="मूल्य चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">सभी मूल्य</SelectItem>
                      <SelectItem value="0-500">₹0 - ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                      <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                      <SelectItem value="5000+">₹5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-700">ब्रांड</h3>
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-3">
                        <Checkbox id={brand} className="border-green-300" />
                        <label htmlFor={brand} className="text-sm font-medium text-gray-600 cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">रेटिंग</h3>
                  <div className="space-y-3">
                    {[4, 3, 2].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <Checkbox id={`rating-${rating}`} className="border-green-300" />
                        <label htmlFor={`rating-${rating}`} className="text-sm font-medium text-gray-600 flex items-center cursor-pointer">
                          {rating}+ <Star className="h-3 w-3 text-yellow-400 fill-current ml-1" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and Results Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <p className="text-gray-600 mb-4 md:mb-0 text-lg">
                दिखाए जा रहे हैं {startIndex + 1}-{Math.min(endIndex, products.length)} का {products.length} उत्पादों में से
              </p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-green-200">
                  <SelectValue placeholder="क्रमबद्ध करें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">सबसे लोकप्रिय</SelectItem>
                  <SelectItem value="price-low">मूल्य: कम से अधिक</SelectItem>
                  <SelectItem value="price-high">मूल्य: अधिक से कम</SelectItem>
                  <SelectItem value="rating">उच्चतम रेटेड</SelectItem>
                  <SelectItem value="newest">नवीनतम पहले</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {currentProducts.map((product) => (
                <Card key={product.id} className={`group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden transform hover:scale-105 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`object-cover ${
                        viewMode === 'list' 
                          ? 'w-full h-full rounded-l-lg' 
                          : 'w-full h-56 rounded-t-lg'
                      }`}
                    />
                    <Badge className={`absolute top-3 left-3 font-semibold ${
                      product.badge === 'Best Seller' ? 'bg-orange-500' :
                      product.badge === 'Organic' || product.badge === 'Eco-Friendly' ? 'bg-green-500' :
                      product.badge === 'Premium' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}>
                      {product.badge}
                    </Badge>
                    <Badge variant="destructive" className="absolute top-3 right-3 font-bold">
                      {product.discount}
                    </Badge>
                    {balance < product.price && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <Badge className="w-full bg-red-500 text-white text-center">
                          अपर्याप्त बैलेंस
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''} p-6`}>
                    <div>
                      <p className="text-sm text-green-600 font-medium mb-1">{product.brand}</p>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-3">
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
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                          <span className="text-lg text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full py-3 font-semibold rounded-xl transition-all duration-200 ${
                        balance >= product.price 
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:scale-105' 
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                      disabled={!product.inStock || balance < product.price}
                      onClick={() => handlePurchase(product)}
                    >
                      <Wallet className="h-5 w-5 mr-2" />
                      {balance >= product.price ? 'वॉलेट से खरीदें' : 'अपर्याप्त बैलेंस'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  पिछला
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={isActive ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={isActive 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "border-green-200 text-green-700 hover:bg-green-50"
                      }
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button 
                  variant="outline" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  अगला
                </Button>
              </div>
            </div>

            {/* Products Summary */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                कुल {products.length} उत्पाद उपलब्ध • पेज {currentPage} का {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
