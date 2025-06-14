import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { CartProvider } from '@/contexts/CartContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import Chatbot from '@/components/Chatbot';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import BrandDetail from '@/pages/BrandDetail';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Wallet from '@/pages/Wallet';
import Payment from '@/pages/Payment';
import UpiPayment from '@/pages/UpiPayment';
import PurchaseHistory from '@/pages/PurchaseHistory';
import CropProducts from '@/pages/CropProducts';
import ProductUpload from '@/pages/ProductUpload';
import Blog from '@/pages/Blog';
import ChatbotPage from '@/pages/ChatbotPage';
import NotFound from '@/pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from '@/pages/AdminDashboard';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ['/login'];

  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/brand/:brandName" element={<BrandDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/upi-payment" element={<UpiPayment />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/crop-products" element={<CropProducts />} />
          <Route path="/upload" element={<ProductUpload />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Chatbot />
      {showHeaderFooter && <Footer />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WalletProvider>
          <CartProvider>
            <ChatbotProvider>
              <Router>
                <AppContent />
              </Router>
            </ChatbotProvider>
          </CartProvider>
        </WalletProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
