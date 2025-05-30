
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.seeds': 'Seeds',
    'nav.fertilizers': 'Fertilizers',
    'nav.pesticides': 'Pesticides',
    'nav.tools': 'Tools',
    'nav.offers': 'Special Offers',
    'nav.blog': 'Farming Tips',
    'header.login': 'Login',
    'header.cart': 'Cart',
    'header.search': 'Search for seeds, fertilizers, tools...',
    'header.phone': '1800-123-4567',
    'header.shipping': 'Free shipping on orders above ₹999',
    'hero.title1': 'Premium Seeds at Best Prices',
    'hero.subtitle1': 'Get 20% off on all hybrid seeds',
    'hero.cta1': 'Shop Seeds',
    'categories.title': 'Shop by Category',
    'products.title': 'Featured Products',
    'products.addToCart': 'Add to Cart',
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
    'cart.secureCheckout': 'Secure checkout with 256-bit SSL encryption'
  },
  hi: {
    'nav.seeds': 'बीज',
    'nav.fertilizers': 'खाद',
    'nav.pesticides': 'कीटनाशक',
    'nav.tools': 'उपकरण',
    'nav.offers': 'विशेष ऑफर',
    'nav.blog': 'खेती की जानकारी',
    'header.login': 'लॉगिन',
    'header.cart': 'कार्ट',
    'header.search': 'बीज, खाद, उपकरण खोजें...',
    'header.phone': '1800-123-4567',
    'header.shipping': '₹999 से अधिक के ऑर्डर पर मुफ्त शिपिंग',
    'hero.title1': 'सर्वोत्तम कीमतों पर प्रीमियम बीज',
    'hero.subtitle1': 'सभी हाइब्रिड बीजों पर 20% की छूट',
    'hero.cta1': 'बीज खरीदें',
    'categories.title': 'श्रेणी के अनुसार खरीदारी करें',
    'products.title': 'फीचर्ड उत्पाद',
    'products.addToCart': 'कार्ट में जोड़ें',
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
    'cart.secureCheckout': '256-बिट SSL एन्क्रिप्शन के साथ सुरक्षित चेकआउट'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

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
