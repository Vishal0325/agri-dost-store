
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMoneyModal = ({ isOpen, onClose }: AddMoneyModalProps) => {
  const { addMoney } = useWallet();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleAddMoney = async () => {
    const amountNum = parseFloat(amount);
    
    if (!amountNum || amountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (amountNum < 10) {
      toast({
        title: "Minimum Amount",
        description: "Minimum amount to add is ₹10",
        variant: "destructive",
      });
      return;
    }

    if (amountNum > 50000) {
      toast({
        title: "Maximum Amount",
        description: "Maximum amount to add is ₹50,000",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      addMoney(amountNum);
      toast({
        title: "Money Added Successfully!",
        description: `₹${amountNum.toLocaleString('en-IN')} has been added to your wallet`,
      });
      setIsProcessing(false);
      onClose();
      setAmount('');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Add Money to Wallet</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-green-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-lg font-semibold">Enter Amount</Label>
            <div className="mt-2">
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (₹10 - ₹50,000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg py-3"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Quick Add</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-sm"
                >
                  ₹{quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-lg font-semibold">Choose Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-4 border-2 rounded-xl p-4 hover:bg-green-50 hover:border-green-300 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-green-600 bg-green-100 p-2 rounded-lg">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <Label htmlFor="upi" className="font-semibold cursor-pointer">UPI Payment</Label>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 border-2 rounded-xl p-4 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-blue-600 bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <Label htmlFor="card" className="font-semibold cursor-pointer">Credit/Debit Card</Label>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Add Money Button */}
          <Button
            onClick={handleAddMoney}
            disabled={isProcessing || !amount}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Plus className="h-6 w-6 mr-3" />
                Add ₹{amount || '0'} to Wallet
              </div>
            )}
          </Button>

          {/* Security Note */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <Check className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">100% Secure Payment</span>
            </div>
            <p className="text-xs text-blue-700 text-center">
              Your payment is secured with bank-level encryption
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMoneyModal;
