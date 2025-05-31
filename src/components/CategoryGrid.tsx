
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Sprout, SprayCan, Wrench, Leaf, Crown, Gift } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: React.ComponentType<any>;
  image: string;
  count: string;
  bgColor: string;
  route: string;
}

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: 'fertilizer',
      name: 'Fertilizer',
      nameHindi: 'उर्वरक',
      icon: Leaf,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: '500+ products',
      bgColor: 'from-green-400 to-green-600',
      route: '/products?category=fertilizer'
    },
    {
      id: 'pesticide',
      name: 'Pesticide',
      nameHindi: 'कीटनाशक',
      icon: SprayCan,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      count: '300+ solutions',
      bgColor: 'from-red-400 to-red-600',
      route: '/products?category=pesticide'
    },
    {
      id: 'seeds',
      name: 'Seeds',
      nameHindi: 'बीज',
      icon: Sprout,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      count: '800+ varieties',
      bgColor: 'from-blue-400 to-blue-600',
      route: '/products?category=seeds'
    },
    {
      id: 'tools',
      name: 'Tools',
      nameHindi: 'उपकरण',
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: '400+ tools',
      bgColor: 'from-orange-400 to-orange-600',
      route: '/products?category=tools'
    },
    {
      id: 'npk',
      name: 'NPK',
      nameHindi: 'एनपीके',
      icon: Crown,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: '200+ formulas',
      bgColor: 'from-purple-400 to-purple-600',
      route: '/products?category=npk'
    },
    {
      id: 'organic',
      name: 'Organic',
      nameHindi: 'जैविक',
      icon: Gift,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      count: '150+ organic',
      bgColor: 'from-amber-400 to-amber-600',
      route: '/products?category=organic'
    }
  ];

  const handleCategoryClick = (category: Category) => {
    navigate(category.route);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600">Choose from our wide range of agricultural products</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 overflow-hidden bg-white"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${category.bgColor} p-6 text-white relative overflow-hidden min-h-[140px] flex flex-col justify-center items-center`}>
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/20 rounded-full -ml-6 -mb-6"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3 mx-auto w-fit">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-sm font-bold mb-1">{category.name}</h3>
                      <p className="text-xs opacity-90 mb-1">{category.nameHindi}</p>
                      <p className="text-xs opacity-75">{category.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Special Crop Recommendations Section */}
        <div className="mt-12 text-center">
          <Card 
            className="inline-block cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50"
            onClick={() => navigate('/crop-products')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 text-white p-3 rounded-full">
                  <Sprout className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">फसल आधारित सुझाव</h3>
                  <p className="text-sm text-gray-600">Get personalized product recommendations for your crops</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
