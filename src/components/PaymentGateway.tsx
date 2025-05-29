
import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Wallet, Shield, Check, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = ({ orderTotal = 1299, onPaymentSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <IndianRupee className="h-5 w-5" />,
      description: 'Google Pay, PhonePe, Paytm, BHIM',
      popular: true,
      instant: true
    },
    {
      id: 'cards',
      name: 'Credit/Debit Cards',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Visa, Mastercard, RuPay accepted',
      popular: false,
      instant: false
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Banknote className="h-5 w-5" />,
      description: 'All major banks supported',
      popular: false,
      instant: false
    },
    {
      id: 'wallet',
      name: 'Digital Wallets',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Paytm, Mobikwik, Amazon Pay',
      popular: false,
      instant: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Banknote className="h-5 w-5" />,
      description: 'Pay when order arrives (+₹40)',
      popular: true,
      instant: false
    }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank'
  ];

  const upiApps = [
    { name: 'Google Pay', id: 'googlepay' },
    { name: 'PhonePe', id: 'phonepe' },
    { name: 'Paytm', id: 'paytm' },
    { name: 'Amazon Pay', id: 'amazonpay' },
    { name: 'BHIM UPI', id: 'bhim' }
  ];

  const handlePayment = async () => {
    if (selectedMethod === 'upi') {
      // Navigate to UPI payment page
      navigate('/upi-payment');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing for other methods
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `₹${orderTotal} paid successfully via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`,
      });
      onPaymentSuccess?.();
    }, 3000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <div>
              <Label>Or choose UPI app</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {upiApps.map((app) => (
                  <Button key={app.id} variant="outline" className="justify-start">
                    {app.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cards':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div>
            <Label>Select Your Bank</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank} value={bank.toLowerCase().replace(/\s+/g, '')}>{bank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-3">
            <Label>Select Wallet</Label>
            <div className="grid grid-cols-1 gap-2">
              {['Paytm', 'Mobikwik', 'Amazon Pay', 'Freecharge'].map((wallet) => (
                <Button key={wallet} variant="outline" className="justify-start">
                  {wallet}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Banknote className="h-5 w-5 text-orange-600 mr-2" />
              <h4 className="font-medium text-orange-800">Cash on Delivery</h4>
            </div>
            <p className="text-sm text-orange-700">
              Pay ₹{orderTotal} in cash when your order arrives. Additional COD charges: ₹40
            </p>
            <p className="text-xs text-orange-600 mt-2">
              * Please keep exact change ready for faster delivery
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Shield className="h-6 w-6 mr-3" />
            Secure Payment Gateway
          </CardTitle>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 mr-2" />
              <span className="text-3xl font-bold">{orderTotal}</span>
            </div>
            <Badge className="bg-white text-green-700 font-semibold">
              🔒 SSL Secured
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Payment Methods */}
          <div>
            <Label className="text-lg font-semibold mb-4 block text-gray-800">
              Choose Payment Method
            </Label>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <div className="flex items-center space-x-4 border-2 rounded-xl p-4 hover:bg-green-50 hover:border-green-300 transition-all duration-200 cursor-pointer">
                      <RadioGroupItem value={method.id} id={method.id} className="border-2" />
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="text-green-600 bg-green-100 p-2 rounded-lg">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Label htmlFor={method.id} className="font-semibold cursor-pointer text-gray-800">
                              {method.name}
                            </Label>
                            {method.popular && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                Popular
                              </Badge>
                            )}
                            {method.instant && (
                              <Badge className="bg-green-500 text-white text-xs">
                                Instant
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Payment Form */}
          <div className="border-t-2 border-gray-100 pt-6">
            {renderPaymentForm()}
          </div>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {selectedMethod === 'cod' ? (
                  <>
                    <Check className="h-6 w-6 mr-3" />
                    Place Order (COD)
                  </>
                ) : selectedMethod === 'upi' ? (
                  <>
                    <IndianRupee className="h-6 w-6 mr-3" />
                    Pay with UPI
                  </>
                ) : (
                  <>
                    <Shield className="h-6 w-6 mr-3" />
                    Pay ₹{orderTotal}
                  </>
                )}
              </div>
            )}
          </Button>

          {/* Trust Indicators */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">100% Secure Payment</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-blue-700">
              <div className="text-center">
                <p className="font-medium">🛡️ Bank Level Security</p>
                <p>256-bit SSL encryption</p>
              </div>
              <div className="text-center">
                <p className="font-medium">🏪 Trusted by 10L+ Farmers</p>
                <p>RBI approved gateway</p>
              </div>
            </div>
          </div>

          {/* UPI Apps for UPI method */}
          {selectedMethod === 'upi' && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-3 text-center">
                Supported UPI Apps
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                  <div key={app} className="text-center p-2 bg-white rounded-lg shadow-sm">
                    <Smartphone className="h-6 w-6 mx-auto mb-1 text-green-600" />
                    <p className="text-xs font-medium text-gray-700">{app}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
