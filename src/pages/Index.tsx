import React from 'react';
import { Search, ShoppingCart, User, Phone, Truck, Leaf, Star, ArrowRight, Crown, Gift, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const categories = [
    {
      id: 1,
      name: t('nav.seeds'),
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      count: "500+ varieties",
      bgColor: "from-green-400 to-green-600"
    },
    {
      id: 2,
      name: t('nav.fertilizers'),
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: "200+ products",
      bgColor: "from-amber-400 to-orange-600"
    },
    {
      id: 3,
      name: t('nav.pesticides'),
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      count: "150+ solutions",
      bgColor: "from-red-400 to-red-600"
    },
    {
      id: 4,
      name: t('nav.tools'),
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: "300+ tools",
      bgColor: "from-blue-400 to-blue-600"
    }
  ];

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
                <LanguageSwitcher />
                <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
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
                  कृषि मार्ट
                </h1>
                <p className="text-sm text-green-200">Premium Agricultural Solutions</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={t('header.search')}
                  className="w-full pl-10 pr-4 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-yellow-400"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Search
                </Button>
              </div>
            </div>

            {/* Cart */}
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

        {/* Navigation */}
        <nav className="border-t border-green-500 bg-green-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-3">
              {[
                { name: t('nav.seeds'), icon: Leaf },
                { name: t('nav.fertilizers'), icon: Crown },
                { name: t('nav.pesticides'), icon: Gift },
                { name: t('nav.tools'), icon: Star },
                { name: t('nav.offers'), icon: Heart },
                { name: t('nav.blog'), icon: User }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2"
                    onClick={() => {
                      if (item.name === t('nav.blog')) {
                        navigate('/blog');
                      } else {
                        navigate('/products');
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-semibold rounded-full">
                🎉 {t('nav.offers')} - Limited Time!
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-orange-600 bg-clip-text text-transparent leading-tight">
                {t('hero.title1')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('hero.subtitle1')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/products')}
                >
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Explore Offers
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3" 
                  alt="Agricultural products"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-bold text-lg shadow-xl animate-bounce">
                20% OFF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">{t('categories.title')}</h3>
            <p className="text-xl text-gray-600">Discover our wide range of premium agricultural products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-0 overflow-hidden"
                onClick={() => navigate('/products')}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${category.bgColor} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-full -ml-8 -mb-8"></div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2">{category.name}</h4>
                      <p className="text-sm opacity-90">{category.count}</p>
                      <div className="mt-4">
                        <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">{t('products.title')}</h3>
            <p className="text-xl text-gray-600">Handpicked products for maximum yield and quality</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
                      -{product.discount}%
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                      {product.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-gray-900 hover:bg-gray-100">
                        Quick View
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 rounded-full transform hover:scale-105 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/cart');
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t('products.addToCart')}
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
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-bold">कृषि मार्ट</h4>
              </div>
              <p className="text-green-200">
                Your trusted partner for premium agricultural solutions and farming success.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Seeds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fertilizers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-green-200">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1800-123-4567
                </p>
                <p>📧 info@krishimart.com</p>
                <p>📍 New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2024 कृषि मार्ट. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
