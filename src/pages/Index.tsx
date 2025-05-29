import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Phone, MessageCircle, Truck, Shield, Star, ArrowRight, Leaf, Sprout, Bug, Wrench, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from '@/components/LoginModal';
import DeliveryTimer from '@/components/DeliveryTimer';

interface CustomerData {
  name: string;
  village: string;
  ward: string;
  mobile: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const banners = [
    {
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      cta: t('hero.cta1')
    },
    {
      title: "Organic Fertilizers Available",
      subtitle: "Boost your crop yield naturally",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      cta: "Shop Fertilizers"
    },
    {
      title: "Modern Farming Tools",
      subtitle: "Latest technology for better farming",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      cta: "Shop Tools"
    }
  ];

  const categories = [
    { name: t('nav.seeds'), icon: Sprout, color: 'bg-gradient-to-br from-green-400 to-green-600', count: '500+' },
    { name: t('nav.fertilizers'), icon: Leaf, color: 'bg-gradient-to-br from-emerald-400 to-emerald-600', count: '200+' },
    { name: t('nav.pesticides'), icon: Bug, color: 'bg-gradient-to-br from-red-400 to-red-600', count: '150+' },
    { name: t('nav.tools'), icon: Wrench, color: 'bg-gradient-to-br from-blue-400 to-blue-600', count: '300+' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: "₹450",
      originalPrice: "₹550",
      rating: 4.5,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      discount: "18% OFF",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Organic NPK Fertilizer",
      price: "₹1,200",
      originalPrice: "₹1,500",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      discount: "20% OFF",
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Smart Irrigation System",
      price: "₹8,999",
      originalPrice: "₹12,000",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      discount: "25% OFF",
      badge: "Premium"
    },
    {
      id: 4,
      name: "Bio Pesticide Spray",
      price: "₹800",
      originalPrice: "₹950",
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      discount: "15% OFF",
      badge: "Eco-Friendly"
    },
    {
      id: 5,
      name: "Cucumber Seeds",
      price: "₹320",
      originalPrice: "₹400",
      rating: 4.4,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3",
      discount: "20% OFF",
      badge: "Best Seller"
    },
    {
      id: 6,
      name: "Phosphorus Fertilizer",
      price: "₹850",
      originalPrice: "₹1,000",
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      discount: "15% OFF",
      badge: "Organic"
    },
    {
      id: 7,
      name: "Garden Pruning Shears",
      price: "₹1,200",
      originalPrice: "₹1,500",
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      discount: "20% OFF",
      badge: "Premium"
    },
    {
      id: 8,
      name: "Insect Repellent",
      price: "₹650",
      originalPrice: "₹800",
      rating: 4.2,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      discount: "18% OFF",
      badge: "Natural"
    },
    {
      id: 9,
      name: "Carrot Seeds",
      price: "₹280",
      originalPrice: "₹350",
      rating: 4.5,
      reviews: 101,
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3",
      discount: "20% OFF",
      badge: "Best Seller"
    },
    {
      id: 10,
      name: "Potassium Fertilizer",
      price: "₹950",
      originalPrice: "₹1,200",
      rating: 4.6,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      discount: "21% OFF",
      badge: "New Arrival"
    },
    {
      id: 11,
      name: "Watering Can",
      price: "₹750",
      originalPrice: "₹900",
      rating: 4.3,
      reviews: 38,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      discount: "16% OFF",
      badge: "Eco-Friendly"
    },
    {
      id: 12,
      name: "Fungicide Spray",
      price: "₹720",
      originalPrice: "₹900",
      rating: 4.4,
      reviews: 72,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      discount: "20% OFF",
      badge: "Premium"
    },
    {
      id: 13,
      name: "Bell Pepper Seeds",
      price: "₹380",
      originalPrice: "₹450",
      rating: 4.7,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3",
      discount: "15% OFF",
      badge: "Organic"
    },
    {
      id: 14,
      name: "Calcium Fertilizer",
      price: "₹1,100",
      originalPrice: "₹1,400",
      rating: 4.5,
      reviews: 54,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      discount: "21% OFF",
      badge: "Best Seller"
    },
    {
      id: 15,
      name: "Garden Hoe",
      price: "₹1,500",
      originalPrice: "₹1,800",
      rating: 4.8,
      reviews: 29,
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      discount: "16% OFF",
      badge: "Premium"
    },
    {
      id: 16,
      name: "Herbicide Spray",
      price: "₹890",
      originalPrice: "₹1,100",
      rating: 4.3,
      reviews: 61,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      discount: "19% OFF",
      badge: "Natural"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'hi');
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogin = (userData: CustomerData) => {
    setCustomerData(userData);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          {/* Top bar with enhanced design */}
          <div className="flex justify-between items-center py-3 text-sm border-b border-gray-100">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-green-600 hover:text-green-700 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-medium">{t('header.phone')}</span>
              </span>
              <span className="text-gray-600 flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                {t('header.shipping')}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">Download App</span>
              <select 
                className="text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1 hover:border-green-500 focus:border-green-500 focus:outline-none transition-colors"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>

          {/* Main header with modern design */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Leaf className="h-7 w-7" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  KrishiMart
                </span>
              </Link>
              
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder={t('header.search')}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-lg px-4">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-700 transition-colors rounded-xl px-4 py-2"
                onClick={handleLoginClick}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">{customerData ? customerData.name : t('header.login')}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 relative hover:bg-green-50 hover:text-green-700 transition-colors rounded-xl px-4 py-2"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">{t('header.cart')}</span>
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs animate-pulse">
                  3
                </Badge>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="py-4 border-t border-gray-100">
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link 
                      to={`/category/${category.name.toLowerCase()}`} 
                      className="block text-gray-700 hover:text-green-600 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-all duration-300"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/offers" 
                    className="block text-red-600 hover:text-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-all duration-300"
                  >
                    {t('nav.offers')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="block text-gray-700 hover:text-green-600 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-all duration-300"
                  >
                    {t('nav.blog')}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Customer Delivery Timer */}
      {customerData && (
        <div className="container mx-auto px-4 py-4">
          <DeliveryTimer 
            customerName={customerData.name}
            village={customerData.village}
            ward={customerData.ward}
          />
        </div>
      )}

      {/* Enhanced Hero Banner */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl animate-fade-in">
                <h1 className="text-6xl font-bold mb-6 leading-tight">{banner.title}</h1>
                <p className="text-xl mb-8 opacity-90">{banner.subtitle}</p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  {banner.cta} <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Banner indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('categories.title')}</h2>
            <p className="text-xl text-gray-600">Discover our wide range of agricultural products</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase()}`}
                  className="group"
                >
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 group-hover:scale-105 transform border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-8">
                      <div className={`${category.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-green-600 transition-colors">{category.name}</h3>
                      <p className="text-gray-600 font-medium">{category.count} products</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('products.title')}</h2>
            <Link to="/products" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-2 left-2 ${
                    product.badge === 'Best Seller' ? 'bg-orange-500' :
                    product.badge === 'New Arrival' ? 'bg-blue-500' :
                    product.badge === 'Premium' ? 'bg-purple-500' :
                    product.badge === 'Organic' ? 'bg-green-500' :
                    product.badge === 'Natural' ? 'bg-emerald-500' :
                    'bg-green-500'
                  }`}>
                    {product.badge}
                  </Badge>
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    {product.discount}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
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
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {t('products.addToCart')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders above ₹999</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">UPI, COD, Cards - 100% secure</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Call us anytime for help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Download KrishiMart App</h2>
              <p className="text-green-100 mb-4">Get exclusive deals and faster checkout</p>
              <div className="flex space-x-4">
                <Button variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-6" />
                </Button>
                <Button variant="outline" className="bg-white text-green-600 hover:bg-gray-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-6" />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3" 
                alt="Mobile App" 
                className="h-48 mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <Leaf className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold">KrishiMart</span>
              </div>
              <p className="text-gray-300 mb-4">Your trusted partner for all farming needs</p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/seeds" className="hover:text-white">Seeds</Link></li>
                <li><Link to="/fertilizers" className="hover:text-white">Fertilizers</Link></li>
                <li><Link to="/pesticides" className="hover:text-white">Pesticides</Link></li>
                <li><Link to="/tools" className="hover:text-white">Tools</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> 1800-123-4567</p>
                <p>Email: support@krishimart.com</p>
                <p>Address: 123 Farm Street, Agriculture City, India</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 KrishiMart. All rights reserved. | Made with ❤️ for Indian Farmers</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="bg-green-500 hover:bg-green-600 rounded-full h-14 w-14 shadow-lg animate-pulse"
          onClick={() => window.open('https://wa.me/918001234567', '_blank')}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default HomePage;
