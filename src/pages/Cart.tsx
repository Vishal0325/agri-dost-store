import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, Wallet, CreditCard, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems, 
    toggleItemSelection, 
    removePurchasedItems,
    selectAllItems
  } = useCart();
  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems(); // Selected items count
  const totalCartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const allItemsSelected = cartItems.length > 0 && cartItems.every(item => item.selectedForCheckout);
  
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryFee;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleWalletCheckout = async () => {
    const selectedItems = cartItems.filter(item => item.selectedForCheckout);
    if (selectedItems.length === 0) {
      toast({
        title: "कोई आइटम नहीं चुना गया",
        description: "चेकआउट करने के लिए कृपया आइटम चुनें।",
        variant: "destructive",
      });
      return;
    }

    if (balance < finalTotal) {
      toast({
        title: "अपर्याप्त वॉलेट बैलेंस",
        description: `आपके पास ₹${balance} है, लेकिन ₹${finalTotal} की आवश्यकता है`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const success = deductMoney(finalTotal);
      if (success) {
        toast({
          title: "ऑर्डर सफल!",
          description: `₹${finalTotal} का भुगतान पूरा हो गया। ${totalItems} उत्पाद ऑर्डर किए गए`,
        });
        removePurchasedItems();
        navigate('/purchase-history');
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handlePaymentGateway = () => {
    const selectedItems = cartItems.filter(item => item.selectedForCheckout);
    if (selectedItems.length === 0) {
      toast({
        title: "कोई आइटम नहीं चुना गया",
        description: "चेकआउट करने के लिए कृपया आइटम चुनें।",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/payment', { 
      state: { 
        amount: finalTotal, 
        items: selectedItems,
        type: 'cart_checkout'
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 hover:bg-green-50"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>वापस जाएं</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="h-8 w-8 mr-3 text-green-600" />
                आपका कार्ट
              </h1>
              <p className="text-gray-600 mt-1">
                {totalItems > 0 ? `${totalItems} उत्पाद चुने गए • कुल ₹${totalPrice.toLocaleString()}` : 'कार्ट खाली है'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">आपका कार्ट खाली है</h2>
              <p className="text-gray-600 mb-8">अभी तक कोई उत्पाद नहीं जोड़ा गया है</p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/')}
              >
                खरीदारी शुरू करें
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 mb-4 text-center md:text-left">“Select the items you want to order now”</p>
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                    <span>कार्ट आइटम ({totalItems} / {totalCartItemsCount} चुने गए)</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm font-normal">
                        <Checkbox
                          id="select-all"
                          checked={allItemsSelected}
                          onCheckedChange={(checked) => selectAllItems(Boolean(checked))}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-green-700 h-5 w-5"
                        />
                        <label htmlFor="select-all" className="cursor-pointer">सभी चुनें</label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-green-600"
                        onClick={clearCart}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        सभी हटाएं
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-6">
                  <div className="space-y-0 sm:space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className={`flex items-start space-x-4 p-4 transition-all duration-300 ${item.selectedForCheckout ? 'bg-green-50' : 'bg-gray-50 opacity-60'} border-b sm:rounded-xl sm:border-0`}>
                        <div className="flex items-center h-full pt-8 sm:pt-1">
                           <Checkbox
                            id={`select-${item.id}`}
                            checked={item.selectedForCheckout}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                            className="h-6 w-6"
                          />
                        </div>
                        <div 
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleViewProduct(item.id)}
                        >
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 
                                className="font-semibold text-lg text-gray-900 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors"
                                onClick={() => handleViewProduct(item.id)}
                              >
                                {item.name}
                              </h3>
                              <p className="text-sm text-green-600 font-medium">{item.company}</p>
                              {item.badge && (
                                <Badge className="mt-1">{item.badge}</Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto"
                                onClick={() => handleViewProduct(item.id)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                विवरण देखें
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold text-lg w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                ₹{item.price} प्रति यूनिट
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle>ऑर्डर सारांश (चुने हुए आइटम)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>उत्पाद ({totalItems})</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>डिलीवरी शुल्क</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                        {deliveryFee === 0 ? 'मुफ्त' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {deliveryFee === 0 && (
                      <p className="text-xs text-green-600">
                        ₹500+ ऑर्डर पर मुफ्त डिलीवरी
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>कुल राशि</span>
                      <span className="text-green-600">₹{finalTotal.toLocaleString()}</span>
                    </div>
                    
                    {/* Wallet Balance Display */}
                    <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">वॉलेट बैलेंस</span>
                        <span className="text-xl font-bold text-green-700">
                          ₹{balance.toLocaleString()}
                        </span>
                      </div>
                      {balance < finalTotal && (
                        <p className="text-sm text-red-600 mt-2">
                          ₹{(finalTotal - balance).toLocaleString()} अधिक बैलेंस चाहिए
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-3 mt-6">
                    <Button 
                      className={`w-full py-3 font-semibold rounded-xl transition-all duration-200 ${
                        balance >= finalTotal 
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:scale-105' 
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                      disabled={balance < finalTotal || isProcessing}
                      onClick={handleWalletCheckout}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          प्रक्रिया में...
                        </>
                      ) : (
                        <>
                          <Wallet className="h-5 w-5 mr-2" />
                          वॉलेट से भुगतान करें
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full py-3 font-semibold rounded-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                      onClick={handlePaymentGateway}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      कार्ड/UPI से भुगतान करें
                    </Button>
                  </div>

                  {/* Continue Shopping */}
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => navigate('/')}
                  >
                    खरीदारी जारी रखें
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
