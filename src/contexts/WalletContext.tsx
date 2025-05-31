
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
  balance: number;
  addMoney: (amount: number) => void;
  deductMoney: (amount: number) => boolean;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [balance, setBalance] = useState(5000); // Default balance
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 5000,
      description: 'Welcome bonus',
      timestamp: new Date()
    }
  ]);

  // Load wallet data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    const savedTransactions = localStorage.getItem('walletTransactions');
    
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save wallet data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('walletBalance', balance.toString());
    localStorage.setItem('walletTransactions', JSON.stringify(transactions));
  }, [balance, transactions]);

  const addMoney = (amount: number) => {
    setBalance(prev => prev + amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'credit',
      amount,
      description: 'Money added to wallet',
      timestamp: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deductMoney = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount,
        description: 'Purchase made',
        timestamp: new Date()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney, transactions }}>
      {children}
    </WalletContext.Provider>
  );
};
