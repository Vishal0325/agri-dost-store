
import React from 'react';
import { Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';

interface WalletDisplayProps {
  variant?: 'header' | 'inline' | 'card';
  showIcon?: boolean;
}

const WalletDisplay = ({ variant = 'header', showIcon = true }: WalletDisplayProps) => {
  const { balance } = useWallet();

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (variant === 'header') {
    return (
      <div className="flex items-center space-x-2 text-white">
        {showIcon && <Wallet className="h-5 w-5" />}
        <span className="font-semibold">{formatCurrency(balance)}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <Badge className="bg-green-600 text-white hover:bg-green-700 flex items-center space-x-1">
        {showIcon && <Wallet className="h-3 w-3" />}
        <span>{formatCurrency(balance)}</span>
      </Badge>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Wallet Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
          </div>
          {showIcon && <Wallet className="h-8 w-8 opacity-80" />}
        </div>
      </div>
    );
  }

  return null;
};

export default WalletDisplay;
