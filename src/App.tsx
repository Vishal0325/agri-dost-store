import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WalletProvider } from '@/contexts/WalletContext';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import CropProducts from '@/pages/CropProducts';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import ProductUpload from '@/pages/ProductUpload';
import Blog from '@/pages/Blog';
import PurchaseHistory from '@/pages/PurchaseHistory';
import UpiPayment from '@/pages/UpiPayment';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/crop-products" element={<CropProducts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/upload" element={<ProductUpload />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/upi-payment" element={<UpiPayment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
