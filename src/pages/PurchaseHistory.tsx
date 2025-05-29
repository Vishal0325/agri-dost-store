
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText, Calendar, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    setPurchaseHistory(history);
  }, []);

  const downloadInvoice = (order) => {
    const invoiceContent = `
AGRI SHOP INVOICE
==================
Invoice Number: ${order.invoiceNumber}
Date: ${order.date}
Customer: ${order.customerData.name || 'Guest'}
Village: ${order.customerData.village || 'N/A'}
Ward: ${order.customerData.ward || 'N/A'}
Mobile: ${order.customerData.mobile || 'N/A'}

ITEMS:
------
${order.items.map(item => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n')}

SUMMARY:
--------
Subtotal: ₹${order.subtotal.toLocaleString()}
Savings: -₹${order.savings.toLocaleString()}
Shipping: ₹${order.shippingCost}
${order.couponDiscount > 0 ? `Coupon Discount: -₹${order.couponDiscount.toLocaleString()}` : ''}
TOTAL: ₹${order.total.toLocaleString()}

Thank you for shopping with Agri Shop!
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.invoiceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (purchaseHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')} 
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
          </div>
          
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Purchase History</h2>
            <p className="text-gray-600 mb-6">You haven't made any purchases yet</p>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        </div>

        <div className="space-y-6">
          {purchaseHistory.map((order, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {order.invoiceNumber}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Calendar className="h-4 w-4" />
                      {order.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₹{order.total.toLocaleString()}</p>
                    <Badge variant="outline" className="mt-1">Completed</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium">{order.customerData.name || 'Guest'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Village:</span>
                        <p className="font-medium">{order.customerData.village || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Ward:</span>
                        <p className="font-medium">{order.customerData.ward || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mobile:</span>
                        <p className="font-medium">{order.customerData.mobile || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-3">Items Purchased ({order.items.length})</h4>
                    <div className="grid gap-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between w-48">
                        <span>Subtotal:</span>
                        <span>₹{order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between w-48 text-green-600">
                        <span>Savings:</span>
                        <span>-₹{order.savings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between w-48">
                        <span>Shipping:</span>
                        <span>₹{order.shippingCost}</span>
                      </div>
                      {order.couponDiscount > 0 && (
                        <div className="flex justify-between w-48 text-green-600">
                          <span>Coupon:</span>
                          <span>-₹{order.couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => downloadInvoice(order)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
