
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.seeds': 'Seeds',
    'nav.fertilizers': 'Fertilizers',
    'nav.pesticides': 'Pesticides',
    'nav.tools': 'Tools',
    'nav.offers': 'Special Offers',
    'nav.blog': 'Farming Tips',
    'nav.cropSuggestions': 'Crop Suggestions',
    
    // Header
    'header.login': 'Login',
    'header.cart': 'Cart',
    'header.search': 'Search for seeds, fertilizers, tools...',
    'header.phone': '1800-123-4567',
    'header.shipping': 'Free shipping on orders above ₹999',
    'header.title': 'कृषि मार्ट',
    'header.subtitle': 'Premium Agricultural Solutions',
    
    // Hero
    'hero.title1': 'Premium Seeds at Best Prices',
    'hero.subtitle1': 'Get 20% off on all hybrid seeds',
    'hero.cta1': 'Shop Seeds',
    'hero.title2': 'High Quality Fertilizers',
    'hero.subtitle2': 'Boost your crop yield with organic solutions',
    'hero.cta2': 'Shop Fertilizers',
    'hero.title3': 'Modern Farming Tools',
    'hero.subtitle3': 'Latest technology for better farming',
    'hero.cta3': 'Shop Tools',
    
    // Categories
    'categories.title': 'Shop by Category',
    'categories.seeds': 'Seeds',
    'categories.pgr': 'PGR (Plant Growth Regulator)',
    'categories.pesticides': 'Pesticides',
    'categories.herbicide': 'Herbicide',
    'categories.sprayMachine': 'Spray Machine',
    'categories.tools': 'Tools',
    'categories.seedsCount': '500+ varieties',
    'categories.pgrCount': '100+ products',
    'categories.pesticidesCount': '200+ solutions',
    'categories.herbicideCount': '150+ products',
    'categories.sprayMachineCount': '80+ machines',
    'categories.toolsCount': '300+ tools',
    
    // Products
    'products.title': 'Featured Products',
    'products.addToCart': 'Add to Cart',
    'products.buyWithWallet': 'Buy with Wallet',
    'products.insufficientBalance': 'Insufficient Balance',
    'products.viewAll': 'View All Products',
    'products.quickView': 'Quick View',
    'products.reviews': 'reviews',
    
    // Cart
    'cart.empty': 'Your cart is empty',
    'cart.emptyDescription': 'Add some products to your cart to continue shopping',
    'cart.continueShopping': 'Continue Shopping',
    'cart.title': 'Shopping Cart',
    'cart.items': 'items',
    'cart.purchaseHistory': 'Purchase History',
    'cart.outOfStock': 'Out of Stock',
    'cart.applyCoupon': 'Apply Coupon',
    'cart.enterCoupon': 'Enter coupon code',
    'cart.apply': 'Apply',
    'cart.couponApplied': 'Coupon applied',
    'cart.remove': 'Remove',
    'cart.availableCoupons': 'Available coupons',
    'cart.orderSummary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.savings': 'Savings',
    'cart.shipping': 'Shipping',
    'cart.free': 'FREE',
    'cart.couponDiscount': 'Coupon Discount',
    'cart.total': 'Total',
    'cart.freeShippingMessage': 'Add more to get FREE shipping!',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.downloadInvoice': 'Download Invoice',
    'cart.weAccept': 'We Accept',
    'cart.secureCheckout': 'Secure checkout with 256-bit SSL encryption',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.support': 'Support',
    'footer.terms': 'Terms',
    'footer.productCategories': 'Product Categories',
    'footer.contactInfo': 'Contact Info',
    'footer.copyright': '© 2024 कृषि मार्ट. All rights reserved.',
    
    // Common
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success'
  },
  hi: {
    // Navigation
    'nav.seeds': 'बीज',
    'nav.fertilizers': 'खाद',
    'nav.pesticides': 'कीटनाशक',
    'nav.tools': 'उपकरण',
    'nav.offers': 'विशेष ऑफर',
    'nav.blog': 'खेती की जानकारी',
    'nav.cropSuggestions': 'फसल सुझाव',
    
    // Header
    'header.login': 'लॉगिन',
    'header.cart': 'कार्ट',
    'header.search': 'बीज, खाद, उपकरण खोजें...',
    'header.phone': '1800-123-4567',
    'header.shipping': '₹999 से अधिक के ऑर्डर पर मुफ्त शिपिंग',
    'header.title': 'कृषि मार्ट',
    'header.subtitle': 'प्रीमियम कृषि समाधान',
    
    // Hero
    'hero.title1': 'सर्वोत्तम कीमतों पर प्रीमियम बीज',
    'hero.subtitle1': 'सभी हाइब्रिड बीजों पर 20% की छूट',
    'hero.cta1': 'बीज खरीदें',
    'hero.title2': 'उच्च गुणवत्ता वाले उर्वरक',
    'hero.subtitle2': 'जैविक समाधानों से अपनी फसल की पैदावार बढ़ाएं',
    'hero.cta2': 'उर्वरक खरीदें',
    'hero.title3': 'आधुनिक कृषि उपकरण',
    'hero.subtitle3': 'बेहतर खेती के लिए नवीनतम तकनीक',
    'hero.cta3': 'उपकरण खरीदें',
    
    // Categories
    'categories.title': 'श्रेणी के अनुसार खरीदारी करें',
    'categories.seeds': 'बीज',
    'categories.pgr': 'PGR (पौधे की वृद्धि नियामक)',
    'categories.pesticides': 'कीटनाशक',
    'categories.herbicide': 'खरपतवारनाशी',
    'categories.sprayMachine': 'स्प्रे मशीन',
    'categories.tools': 'उपकरण',
    'categories.seedsCount': '500+ किस्में',
    'categories.pgrCount': '100+ उत्पाद',
    'categories.pesticidesCount': '200+ समाधान',
    'categories.herbicideCount': '150+ उत्पाद',
    'categories.sprayMachineCount': '80+ मशीनें',
    'categories.toolsCount': '300+ उपकरण',
    
    // Products
    'products.title': 'विशेष उत्पाद',
    'products.addToCart': 'कार्ट में जोड़ें',
    'products.buyWithWallet': 'वॉलेट से खरीदें',
    'products.insufficientBalance': 'अपर्याप्त बैलेंस',
    'products.viewAll': 'सभी उत्पाद देखें',
    'products.quickView': 'त्वरित दृश्य',
    'products.reviews': 'समीक्षाएं',
    
    // Cart
    'cart.empty': 'आपका कार्ट खाली है',
    'cart.emptyDescription': 'खरीदारी जारी रखने के लिए अपने कार्ट में कुछ उत्पाद जोड़ें',
    'cart.continueShopping': 'खरीदारी जारी रखें',
    'cart.title': 'शॉपिंग कार्ट',
    'cart.items': 'आइटम',
    'cart.purchaseHistory': 'खरीदारी का इतिहास',
    'cart.outOfStock': 'स्टॉक में नहीं',
    'cart.applyCoupon': 'कूपन लगाएं',
    'cart.enterCoupon': 'कूपन कोड डालें',
    'cart.apply': 'लगाएं',
    'cart.couponApplied': 'कूपन लगाया गया',
    'cart.remove': 'हटाएं',
    'cart.availableCoupons': 'उपलब्ध कूपन',
    'cart.orderSummary': 'ऑर्डर सारांश',
    'cart.subtotal': 'उप-योग',
    'cart.savings': 'बचत',
    'cart.shipping': 'शिपिंग',
    'cart.free': 'मुफ्त',
    'cart.couponDiscount': 'कूपन छूट',
    'cart.total': 'कुल',
    'cart.freeShippingMessage': 'मुफ्त शिपिंग पाने के लिए और जोड़ें!',
    'cart.proceedToCheckout': 'चेकआउट पर जाएं',
    'cart.downloadInvoice': 'इनवॉइस डाउनलोड करें',
    'cart.weAccept': 'हम स्वीकार करते हैं',
    'cart.secureCheckout': '256-बिट SSL एन्क्रिप्शन के साथ सुरक्षित चेकआउट',
    
    // Footer
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.aboutUs': 'हमारे बारे में',
    'footer.contact': 'संपर्क',
    'footer.support': 'सहायता',
    'footer.terms': 'नियम',
    'footer.productCategories': 'उत्पाद श्रेणियां',
    'footer.contactInfo': 'संपर्क जानकारी',
    'footer.copyright': '© 2024 कृषि मार्ट. सभी अधिकार सुरक्षित।',
    
    // Common
    'common.search': 'खोजें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('agri-mart-language');
    return (savedLanguage as Language) || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('agri-mart-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
