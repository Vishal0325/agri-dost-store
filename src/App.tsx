
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { CartProvider } from '@/contexts/CartContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import BrandDetail from '@/pages/BrandDetail';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Wallet from '@/pages/Wallet';
import Payment from '@/pages/Payment';
import UpiPayment from '@/pages/UpiPayment';
import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/AdminDashboard';
import ProductUpload from '@/pages/ProductUpload';
import PurchaseHistory from '@/pages/PurchaseHistory';
import CropProducts from '@/pages/CropProducts';
import Blog from '@/pages/Blog';
import ChatbotPage from '@/pages/ChatbotPage';
import CategoriesPage from '@/pages/admin/CategoriesPage';
import DataPage from '@/pages/admin/DataPage';
import PagesPage from '@/pages/admin/PagesPage';
import SectionsPage from '@/pages/admin/SectionsPage';
import Chatbot from '@/components/Chatbot';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WalletProvider>
          <CartProvider>
            <ChatbotProvider>
              <Router>
                <div className="min-h-screen bg-background">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/brand/:brandSlug" element={<BrandDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/upi-payment" element={<UpiPayment />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/upload" element={<ProductUpload />} />
                      <Route path="/history" element={<PurchaseHistory />} />
                      <Route path="/crop-products" element={<CropProducts />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/chat" element={<ChatbotPage />} />
                      <Route path="/admin/categories" element={<CategoriesPage />} />
                      <Route path="/admin/data" element={<DataPage />} />
                      <Route path="/admin/pages" element={<PagesPage />} />
                      <Route path="/admin/sections" element={<SectionsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Chatbot />
                  <Toaster />
                </div>
              </Router>
            </ChatbotProvider>
          </CartProvider>
        </WalletProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
