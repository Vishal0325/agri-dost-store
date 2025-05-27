
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
    'products.addToCart': 'Add to Cart'
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
    'products.addToCart': 'कार्ट में जोड़ें'
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
