
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const products = [
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: "₹450",
      originalPrice: "₹550",
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
      price: "₹1,200",
      originalPrice: "₹1,500",
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
      price: "₹8,999",
      originalPrice: "₹12,000",
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
      price: "₹800",
      originalPrice: "₹950",
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      category: "Pesticides",
      brand: "BioCare",
      discount: "15% OFF",
      badge: "Eco-Friendly",
      inStock: false
    }
  ];

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'];
  const brands = ['SeedCorp', 'GreenGrow', 'TechFarm', 'BioCare'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button variant="ghost" size="sm">Clear All</Button>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-500">₹0 - ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                      <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                      <SelectItem value="5000+">₹5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <p className="text-gray-600 mb-4 md:mb-0">Showing {products.length} of {products.length} products</p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {products.map((product) => (
                <Card key={product.id} className={`group hover:shadow-lg transition-shadow duration-300 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`object-cover ${
                        viewMode === 'list' 
                          ? 'w-full h-full rounded-l-lg' 
                          : 'w-full h-48 rounded-t-lg'
                      }`}
                    />
                    <Badge className={`absolute top-2 left-2 ${
                      product.badge === 'Best Seller' ? 'bg-orange-500' :
                      product.badge === 'Organic' ? 'bg-green-500' :
                      product.badge === 'Premium' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}>
                      {product.badge}
                    </Badge>
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      {product.discount}
                    </Badge>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''} p-4`}>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
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
                    </div>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
