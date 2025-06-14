import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Wallet, ShoppingCart } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  discount: string;
  badge: string;
  inStock: boolean;
}

interface SearchResultsProps {
  query: string;
  products: Product[];
  onClose: () => void;
}

const SearchResults = ({ query, products, onClose }: SearchResultsProps) => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (!query) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Voice Search Results</h2>
              <p className="text-green-100">Search: "{query}"</p>
              <p className="text-sm text-green-200">{products.length} products found</p>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-green-600"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No products found matching your search</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or speak more clearly</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                          <Badge className="ml-2 text-xs">{product.badge}</Badge>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-1">₹{product.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm"
                          className='w-full text-xs bg-green-600 hover:bg-green-700 text-white'
                          disabled={!product.inStock}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
