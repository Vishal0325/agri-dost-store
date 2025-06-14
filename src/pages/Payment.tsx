
import React, { useEffect, useState } from 'react';
import PaymentGateway from '@/components/PaymentGateway';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderTotal, setOrderTotal] = useState(1299);

  useEffect(() => {
    // Get order data from session storage
    const orderData = sessionStorage.getItem('orderData');
    if (orderData) {
      const parsedData = JSON.parse(orderData);
      setOrderTotal(parsedData.total);
    }
  }, []);

  const handlePaymentSuccess = () => {
    // Clear cart and order data
    sessionStorage.removeItem('orderData');
    
    toast({
      title: "भुगतान सफल!",
      description: "आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है",
    });
    navigate('/');
  };

  const handlePaymentCancel = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentGateway 
        orderTotal={orderTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Payment;
