
import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Smartphone, Wallet as WalletIcon, TrendingUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { useLanguage } from '@/contexts/LanguageContext';
import WalletDisplay from '@/components/WalletDisplay';
import AddMoneyModal from '@/components/AddMoneyModal';

const Wallet = () => {
  const navigate = useNavigate();
  const { balance, transactions } = useWallet();
  const { t } = useLanguage();
  const [showAddMoney, setShowAddMoney] = useState(false);

  const recentTransactions = transactions.slice(0, 5);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <WalletIcon className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">My Wallet</h1>
                <p className="text-green-100 text-sm">Manage your wallet balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Wallet Balance Card */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-2">Current Balance</p>
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold">₹{balance.toLocaleString('en-IN')}</span>
                  <Badge className="bg-green-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
              <WalletIcon className="h-12 w-12 text-green-200" />
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => setShowAddMoney(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-6 w-6 mr-3" />
                Add Money to Wallet
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/purchase-history')}
                className="border-green-600 text-green-600 hover:bg-green-50 py-6 text-lg font-semibold"
              >
                <History className="h-6 w-6 mr-3" />
                Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-green-200">
            <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Quick Add ₹500</h3>
            <p className="text-gray-600 text-sm">Add money instantly</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
            <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">UPI Payment</h3>
            <p className="text-gray-600 text-sm">Pay with UPI apps</p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Cashback Offers</h3>
            <p className="text-gray-600 text-sm">Earn rewards</p>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <History className="h-6 w-6 mr-3 text-green-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <Plus className={`h-4 w-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                        ) : (
                          <WalletIcon className={`h-4 w-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <WalletIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>No transactions yet</p>
                <p className="text-sm">Start by adding money to your wallet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <AddMoneyModal 
          isOpen={showAddMoney} 
          onClose={() => setShowAddMoney(false)} 
        />
      )}
    </div>
  );
};

export default Wallet;
