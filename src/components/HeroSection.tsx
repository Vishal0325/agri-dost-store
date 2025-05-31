
import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWallet } from '@/contexts/WalletContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { balance } = useWallet();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-orange-600/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 text-base font-semibold rounded-full shadow-lg">
              🎉 {t('nav.offers')} - Limited Time Offers!
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-orange-600 bg-clip-text text-transparent leading-tight">
                कृषि मार्ट
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {t('hero.title1')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t('hero.subtitle1')}. From premium seeds to advanced farming tools, find everything you need for successful farming.
              </p>
            </div>
            
            {/* Enhanced Wallet Display */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-3xl shadow-2xl border border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">💰 Your Wallet Balance</p>
                  <p className="text-4xl font-bold mb-2">₹{balance.toLocaleString('en-IN')}</p>
                  <p className="text-sm opacity-75">Shop directly from your wallet!</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Wallet className="h-12 w-12" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs opacity-75">Today's Savings</p>
                  <p className="text-lg font-bold">₹2,450</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs opacity-75">Total Orders</p>
                  <p className="text-lg font-bold">12</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-xl px-10 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/products')}
              >
                {t('hero.cta1')}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-3 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white text-xl px-10 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/crop-products')}
              >
                🌾 Crop Recommendations
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3" 
                alt="Agricultural products"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-8 py-4 rounded-full font-bold text-xl shadow-2xl animate-bounce">
              UP TO 25% OFF
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-green-600 px-6 py-3 rounded-full font-bold shadow-xl">
              ✅ Free Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
