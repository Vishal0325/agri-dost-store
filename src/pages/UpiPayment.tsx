
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, QrCode, IndianRupee, Smartphone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const UpiPayment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [copied, setCopied] = useState(false);
  
  const orderAmount = 1299;
  const upiId = 'krishimart@paytm';
  const orderId = 'KM' + Date.now();
  
  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${upiId}&pn=KrishiMart&am=${orderAmount}&cu=INR&tn=Payment for Order ${orderId}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({
      title: "UPI ID Copied!",
      description: "UPI ID has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful!",
      description: `₹${orderAmount} paid successfully`,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-6">
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-gray-800">UPI Payment</h1>
        </div>

        {/* Timer */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium">
                Complete payment within: {formatTime(timeLeft)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Amount Card */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <IndianRupee className="h-8 w-8 text-green-600" />
              <span className="text-4xl font-bold text-green-800">{orderAmount}</span>
            </div>
            <p className="text-green-700">Amount to pay</p>
            <Badge className="mt-2 bg-green-600">Order ID: {orderId}</Badge>
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              <span>Scan QR Code</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Scan with any UPI app to pay</p>
          </CardHeader>
          <CardContent className="text-center">
            {/* QR Code Placeholder - In real app, use a QR code library */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4 mx-auto w-48 h-48 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">QR Code</p>
                <p className="text-xs text-gray-500">₹{orderAmount}</p>
              </div>
            </div>
            
            {/* UPI Apps */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app, index) => (
                <Button
                  key={app}
                  variant="outline"
                  className="h-16 flex-col p-2"
                  onClick={() => window.open(upiUrl, '_blank')}
                >
                  <Smartphone className="h-6 w-6 mb-1" />
                  <span className="text-xs">{app}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual UPI ID */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Manual Payment</CardTitle>
            <p className="text-sm text-gray-600">Copy UPI ID and pay manually</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
              <span className="font-mono text-sm">{upiId}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={copyUpiId}
                className="ml-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Open any UPI app</p>
              <p>2. Choose "Pay to Contact" or "Pay by UPI ID"</p>
              <p>3. Enter the UPI ID: {upiId}</p>
              <p>4. Enter amount: ₹{orderAmount}</p>
              <p>5. Add note: Payment for Order {orderId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Success Button */}
        <Button
          onClick={handlePaymentSuccess}
          className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
        >
          I've Completed the Payment
        </Button>

        {/* Security Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secured by UPI • Never share OTP or PIN
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;
