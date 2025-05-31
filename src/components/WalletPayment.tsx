
import React, { useState } from 'react';
import { Wallet, CreditCard, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface WalletPaymentProps {
  amount: number;
  productName: string;
  onPaymentSuccess?: () => void;
  onPaymentCancel?: () => void;
}

const WalletPayment = ({ amount, productName, onPaymentSuccess, onPaymentCancel }: WalletPaymentProps) => {
  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'external'>('wallet');

  const canPayWithWallet = balance >= amount;
  const shortfall = amount - balance;

  const handleWalletPayment = async () => {
    if (!canPayWithWallet) {
      toast({
        title: "अपर्याप्त बैलेंस",
        description: `आपको ₹${shortfall} की आवश्यकता है`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const success = deductMoney(amount);
      setIsProcessing(false);
      
      if (success) {
        toast({
          title: "भुगतान सफल!",
          description: `${productName} के लिए ₹${amount} का भुगतान हो गया`,
        });
        onPaymentSuccess?.();
      } else {
        toast({
          title: "भुगतान असफल",
          description: "कृपया पुनः प्रयास करें",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const handleExternalPayment = () => {
    toast({
      title: "External Payment",
      description: "Redirecting to payment gateway...",
    });
    // Here you would integrate with external payment gateway
    onPaymentSuccess?.();
  };

  return (
    <Card className="max-w-md mx-auto shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-xl">
          <Wallet className="h-6 w-6 mr-3" />
          भुगतान विकल्प
        </CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm opacity-90">कुल राशि</p>
            <p className="text-3xl font-bold">₹{amount.toLocaleString()}</p>
          </div>
          <Badge className="bg-white text-green-700 font-semibold">
            {productName}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Wallet Balance Display */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">वॉलेट बैलेंस</span>
            <span className="text-2xl font-bold text-green-600">₹{balance.toLocaleString()}</span>
          </div>
          {!canPayWithWallet && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              ₹{shortfall.toLocaleString()} की कमी है
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">भुगतान विधि चुनें</h4>
          
          {/* Wallet Payment Option */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'wallet' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('wallet')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'wallet' ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}>
                {paymentMethod === 'wallet' && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-green-600" />
                  <span className="font-medium">वॉलेट से भुगतान</span>
                  {canPayWithWallet && (
                    <Badge className="bg-green-500 text-white text-xs">उपलब्ध</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {canPayWithWallet 
                    ? 'तुरंत और सुरक्षित भुगतान' 
                    : 'अपर्याप्त बैलेंस - कृपया वॉलेट में पैसे जोड़ें'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* External Payment Option */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'external' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('external')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'external' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
                {paymentMethod === 'external' && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">कार्ड/UPI/नेट बैंकिंग</span>
                  <Badge className="bg-blue-500 text-white text-xs">सभी तरीके</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  डेबिट/क्रेडिट कार्ड, UPI, नेट बैंकिंग
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="space-y-3">
          {paymentMethod === 'wallet' ? (
            <Button 
              onClick={handleWalletPayment}
              disabled={!canPayWithWallet || isProcessing}
              className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                canPayWithWallet 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  भुगतान हो रहा है...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  {canPayWithWallet ? `₹${amount} का भुगतान करें` : 'अपर्याप्त बैलेंस'}
                </div>
              )}
            </Button>
          ) : (
            <Button 
              onClick={handleExternalPayment}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold rounded-xl"
            >
              <div className="flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                अन्य तरीकों से भुगतान करें
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </Button>
          )}
          
          {onPaymentCancel && (
            <Button 
              variant="outline" 
              onClick={onPaymentCancel}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              रद्द करें
            </Button>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center text-blue-800 text-sm">
            <Check className="h-4 w-4 mr-2 text-blue-600" />
            <span className="font-medium">100% सुरक्षित भुगतान</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            आपकी सभी जानकारी SSL एन्क्रिप्शन से सुरक्षित है
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletPayment;
