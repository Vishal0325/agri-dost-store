
import React, { useState, useEffect } from 'react';
import { Clock, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DeliveryTimerProps {
  customerName: string;
  village: string;
  ward: string;
}

const DeliveryTimer = ({ customerName, village, ward }: DeliveryTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 text-white p-2 rounded-full">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Delivery to {customerName}</h3>
              <p className="text-sm text-green-600">{village}, Ward {ward}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-green-700">
              <Clock className="h-4 w-4" />
              <span className="text-lg font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-xs text-green-600">Estimated delivery</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryTimer;
