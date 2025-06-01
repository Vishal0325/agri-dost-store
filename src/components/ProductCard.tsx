
import React from 'react';
import { Eye, Trash2, User, Wallet, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log('Viewing product details for:', product.id);
    navigate(`/product/${product.id}`);
  };

  const handleViewFarmerDetails = () => {
    console.log('View farmer details for product:', product.id);
    toast({
      title: "किसान विवरण",
      description: "किसान संपर्क जानकारी दिखाई जा रही है",
    });
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product.id);
    toast({
      title: "कार्ट में जोड़ा गया!",
      description: `${product.name} आपके कार्ट में जोड़ दिया गया है`,
    });
  };

  const handleWalletPurchase = () => {
    console.log('Wallet purchase for product:', product.id);
    
    const productPrice = parseFloat(product.price);
    
    if (balance >= productPrice) {
      const success = deductMoney(productPrice);
      if (success) {
        toast({
          title: "खरीदारी सफल!",
          description: `आपने ${product.name} ₹${productPrice} में खरीदा`,
        });
      }
    } else {
      toast({
        title: "अपर्याप्त बैलेंस",
        description: `इस उत्पाद को खरीदने के लिए ₹${productPrice - balance} और चाहिए`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    console.log('Deleting product:', product.id);
    onDelete(product.id);
    toast({
      title: "उत्पाद हटाया गया",
      description: `${product.name} को सूची से हटा दिया गया`,
    });
  };

  const productPrice = parseFloat(product.price);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
          
          {/* Farmer Details Section */}
          <div className="mt-2 p-2 bg-green-50 rounded-md">
            <p className="text-xs text-green-700 font-medium">🌾 किसान: राम कुमार शर्मा</p>
            <p className="text-xs text-green-600">📍 उत्तर प्रदेश, भारत</p>
            <p className="text-xs text-green-600">⭐ 4.8/5 (234 समीक्षाएं)</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <Button size="sm" variant="outline" onClick={handleViewDetails}>
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-green-600 text-xl">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
            {product.badge && (
              <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
            )}
          </div>
          <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'स्टॉक में' : 'स्टॉक समाप्त'}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={handleViewFarmerDetails}
          >
            <User className="h-3 w-3 mr-1" />
            किसान विवरण
          </Button>
          <Button 
            size="sm" 
            className={`flex-1 text-xs ${
              balance >= productPrice 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            onClick={handleWalletPurchase}
            disabled={!product.inStock}
          >
            <Wallet className="h-3 w-3 mr-1" />
            {balance >= productPrice ? 'वॉलेट से खरीदें' : 'अपर्याप्त बैलेंस'}
          </Button>
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          कार्ट में जोड़ें
        </Button>
        
        {/* Wallet Balance Indicator */}
        <div className="text-xs text-gray-600 text-center">
          वॉलेट बैलेंस: ₹{balance.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
