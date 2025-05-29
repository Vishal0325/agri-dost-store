
import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: 450,
      originalPrice: 550,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      brand: "SeedCorp",
      inStock: true
    },
    {
      id: 2,
      name: "Organic NPK Fertilizer",
      price: 1200,
      originalPrice: 1500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
      brand: "GreenGrow",
      inStock: true
    },
    {
      id: 3,
      name: "Bio Pesticide Spray",
      price: 800,
      originalPrice: 950,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      brand: "BioCare",
      inStock: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10, type: 'percentage' });
    } else if (couponCode === 'NEWUSER50') {
      setAppliedCoupon({ code: 'NEWUSER50', discount: 50, type: 'fixed' });
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
  const shippingCost = subtotal > 999 ? 0 : 50;
  const couponDiscount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;
  const total = subtotal + shippingCost - couponDiscount;

  const generateInvoice = () => {
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      subtotal,
      savings,
      shippingCost,
      couponDiscount,
      total,
      customerData: JSON.parse(localStorage.getItem('customerData') || '{}')
    };
    
    // Save to purchase history
    const existingHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    existingHistory.unshift(invoiceData);
    localStorage.setItem('purchaseHistory', JSON.stringify(existingHistory));
    
    // Generate and download invoice
    const invoiceContent = `
AGRI SHOP INVOICE
==================
Invoice Number: ${invoiceData.invoiceNumber}
Date: ${invoiceData.date}
Customer: ${invoiceData.customerData.name || 'Guest'}
Village: ${invoiceData.customerData.village || 'N/A'}
Ward: ${invoiceData.customerData.ward || 'N/A'}
Mobile: ${invoiceData.customerData.mobile || 'N/A'}

ITEMS:
------
${cartItems.map(item => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n')}

SUMMARY:
--------
Subtotal: ₹${subtotal.toLocaleString()}
Savings: -₹${savings.toLocaleString()}
Shipping: ₹${shippingCost}
${appliedCoupon ? `Coupon Discount: -₹${couponDiscount.toLocaleString()}` : ''}
TOTAL: ₹${total.toLocaleString()}

Thank you for shopping with Agri Shop!
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceData.invoiceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCheckout = () => {
    generateInvoice();
    setCartItems([]);
    toast({
      title: "Order Placed Successfully!",
      description: "Your invoice has been generated and order placed.",
    });
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to continue shopping</p>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({cartItems.length} items)</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/purchase-history')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Purchase History
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-gray-600">{item.brand}</p>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              {!item.inStock && (
                                <Badge variant="destructive" className="mt-1">Out of Stock</Badge>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">₹{item.price.toLocaleString()}</span>
                              <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border rounded-lg">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={!item.inStock}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-3 py-1 min-w-[2.5rem] text-center">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={!item.inStock}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {item.id !== cartItems[cartItems.length - 1].id && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                {/* Coupon Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Apply Coupon</h3>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      <Tag className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <span className="text-green-700 font-medium">
                        Coupon "{appliedCoupon.code}" applied!
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-green-700 hover:text-green-800"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600">
                    <p>Available coupons: SAVE10 (10% off), NEWUSER50 (₹50 off)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                {shippingCost > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Add ₹{(999 - subtotal).toLocaleString()} more to get FREE shipping!
                    </p>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-lg py-3"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={generateInvoice}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                
                {/* Payment Methods */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">We Accept</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">UPI</Badge>
                    <Badge variant="outline">COD</Badge>
                    <Badge variant="outline">Cards</Badge>
                    <Badge variant="outline">Net Banking</Badge>
                  </div>
                </div>
                
                {/* Security */}
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>🔒 Secure checkout with 256-bit SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
