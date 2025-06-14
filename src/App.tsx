import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductUpload from './pages/ProductUpload';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { WalletProvider } from './contexts/WalletContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import UpiPayment from './pages/UpiPayment';
import PurchaseHistory from './pages/PurchaseHistory';
import CropProducts from './pages/CropProducts';
import Payment from './pages/Payment';

function App() {
  return (
    <WalletProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/upload" element={<ProductUpload />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/upi-payment" element={<UpiPayment />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/crop-products" element={<CropProducts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </WalletProvider>
  );
}

export default App;
