
import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Wallet, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PaymentGateway = ({ orderTotal = 1299, onPaymentSuccess }) => {
  const { toast } = useToast();
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
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Pay using Google Pay, PhonePe, Paytm, etc.',
      popular: true
    },
    {
      id: 'cards',
      name: 'Credit/Debit Cards',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Visa, Mastercard, RuPay accepted',
      popular: false
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Banknote className="h-5 w-5" />,
      description: 'Pay directly from your bank account',
      popular: false
    },
    {
      id: 'wallet',
      name: 'Digital Wallets',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Paytm, Mobikwik, Amazon Pay',
      popular: false
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Banknote className="h-5 w-5" />,
      description: 'Pay when your order arrives',
      popular: true
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
    setIsProcessing(true);

    // Simulate payment processing
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
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Secure Payment
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">₹{orderTotal}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              SSL Secured
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Methods */}
          <div>
            <Label className="text-base font-medium mb-4 block">Choose Payment Method</Label>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-gray-600">{method.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          {method.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Payment Form */}
          <div className="border-t pt-6">
            {renderPaymentForm()}
          </div>

          {/* Security Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Your payment is secure</span>
            </div>
            <p className="text-xs text-blue-700">
              We use industry-standard encryption to protect your payment information. 
              Your card details are never stored on our servers.
            </p>
          </div>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {selectedMethod === 'cod' ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Place Order (COD)
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Pay ₹{orderTotal}
                  </>
                )}
              </div>
            )}
          </Button>

          {/* Accepted Cards */}
          {selectedMethod === 'cards' && (
            <div className="flex justify-center space-x-4 pt-4 border-t">
              <span className="text-xs text-gray-600">We accept:</span>
              <div className="flex space-x-2">
                {['Visa', 'Mastercard', 'RuPay', 'Maestro'].map((card) => (
                  <Badge key={card} variant="outline" className="text-xs">
                    {card}
                  </Badge>
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
