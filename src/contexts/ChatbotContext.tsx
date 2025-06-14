import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

export interface ChatAction {
  id: string;
  label: string;
  labelHindi: string;
  action: () => void;
}

export interface UserProfile {
  name: string;
  village: string;
  ward: string;
  mobile: string;
  farmSize: string;
  primaryCrops: string[];
}

interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  userProfile: UserProfile;
  addMessage: (content: string, type: 'user' | 'bot', actions?: ChatAction[]) => void;
  openChatbot: () => void;
  closeChatbot: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearChat: () => void;
  detectLanguageAndIntent: (input: string) => { language: string; intent: string; isHinglish: boolean };
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    village: '',
    ward: '',
    mobile: '',
    farmSize: '',
    primaryCrops: []
  });
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Hinglish and intent detection
  const detectLanguageAndIntent = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Common Hinglish patterns and rural farming terms
    const hinglishPatterns = [
      /\b(mero|mera|tera|uska|humko|tumko|aapko)\b/,
      /\b(dekho|batao|karo|hoga|hai|nahi|kya|kaise|kahan|kab)\b/,
      /\b(paani|kheti|fasal|beej|khet|gaon|season|time)\b/,
      /\b(according|session|problem|help|chahiye|lagta)\b/
    ];
    
    const isHinglish = hinglishPatterns.some(pattern => pattern.test(lowerInput));
    
    // Intent detection for farming queries
    let intent = 'general';
    if (lowerInput.match(/(weather|mausam|paani|rain|barish)/)) {
      intent = 'weather';
    } else if (lowerInput.match(/(crop|fasal|ugana|grow|dekho|advice|salah)/)) {
      intent = 'crop';
    } else if (lowerInput.match(/(seed|beej|fertilizer|khad|buy|kharidna)/)) {
      intent = 'product';
    } else if (lowerInput.match(/(price|rate|market|mandi|sell|bechna)/)) {
      intent = 'market';
    } else if (lowerInput.match(/(disease|bimari|problem|samasya|pest|kida)/)) {
      intent = 'problem';
    }
    
    const detectedLanguage = isHinglish ? 'hinglish' : (language === 'hi' ? 'hindi' : 'english');
    
    return { language: detectedLanguage, intent, isHinglish };
  };

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setProfileLoaded(true);
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Initial welcome message
  useEffect(() => {
    if (profileLoaded && messages.length === 0) {
      const name = userProfile.name || (language === 'hi' ? 'किसान भाई' : 'Farmer');
      const welcomeMessage = language === 'hi'
        ? `नमस्ते ${name} जी! मैं आपकी क्या सहायता कर सकता हूँ? आप मौसम, फसल सलाह, या उत्पादों के बारे में पूछ सकते हैं। आप हिंग्लिश में भी बात कर सकते हैं।`
        : `Namaste ${name}! How can I help you today? You can ask about weather, crop advice, or products. Aap Hinglish mein bhi baat kar sakte hain.`;
      
      addMessage(welcomeMessage, 'bot');
    }
  }, [profileLoaded, language, userProfile.name]);

  const addMessage = (content: string, type: 'user' | 'bot', actions?: ChatAction[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const clearChat = () => {
    setMessages([]);
    const name = userProfile.name || (language === 'hi' ? 'किसान भाई' : 'Farmer');
    const welcomeMessage = language === 'hi'
      ? `नमस्ते ${name} जी! मैं आपकी क्या सहायता कर सकता हूँ? आप मौसम, फसल सलाह, या उत्पादों के बारे में पूछ सकते हैं। आप हिंग्लिश में भी बात कर सकते हैं।`
      : `Namaste ${name}! How can I help you today? You can ask about weather, crop advice, or products. Aap Hinglish mein bhi baat kar sakte hain.`;
    addMessage(welcomeMessage, 'bot');
  };

  const handleProfileUpdate = () => {
    const message = language === 'hi'
      ? 'कृपया अपनी जानकारी अपडेट करें। आप कौन सी जानकारी बदलना चाहते हैं?'
      : 'Please update your information. What would you like to change?';
    
    const actions: ChatAction[] = [
      {
        id: 'name',
        label: 'Name',
        labelHindi: 'नाम',
        action: () => promptForName()
      },
      {
        id: 'village',
        label: 'Village',
        labelHindi: 'गांव',
        action: () => promptForVillage()
      },
      {
        id: 'mobile',
        label: 'Mobile',
        labelHindi: 'मोबाइल',
        action: () => promptForMobile()
      },
      {
        id: 'farmSize',
        label: 'Farm Size',
        labelHindi: 'खेत का आकार',
        action: () => promptForFarmSize()
      }
    ];

    addMessage(message, 'bot', actions);
  };

  const handlePurchaseHistory = () => {
    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    const recentHistory = history.slice(0, 5);
    
    if (recentHistory.length === 0) {
      const message = language === 'hi'
        ? 'आपका कोई खरीदारी इतिहास नहीं मिला।'
        : 'No purchase history found.';
      addMessage(message, 'bot');
      return;
    }

    const message = language === 'hi'
      ? `आपके अंतिम ${recentHistory.length} ऑर्डर:\n\n` + 
        recentHistory.map((order: any, index: number) => 
          `${index + 1}. ${order.invoiceNumber} - ₹${order.total.toLocaleString()} (${order.date})`
        ).join('\n')
      : `Your last ${recentHistory.length} orders:\n\n` +
        recentHistory.map((order: any, index: number) => 
          `${index + 1}. ${order.invoiceNumber} - ₹${order.total.toLocaleString()} (${order.date})`
        ).join('\n');

    addMessage(message, 'bot');
  };

  const handleCropInfo = () => {
    const message = language === 'hi'
      ? 'आप किस फसल के बारे में जानना चाहते हैं?'
      : 'Which crop would you like to know about?';
    
    const actions: ChatAction[] = [
      {
        id: 'paddy',
        label: 'Paddy/Rice',
        labelHindi: 'धान',
        action: () => showCropDetails('paddy')
      },
      {
        id: 'wheat',
        label: 'Wheat',
        labelHindi: 'गेहूं',
        action: () => showCropDetails('wheat')
      },
      {
        id: 'maize',
        label: 'Maize',
        labelHindi: 'मक्का',
        action: () => showCropDetails('maize')
      },
      {
        id: 'sugarcane',
        label: 'Sugarcane',
        labelHindi: 'गन्ना',
        action: () => showCropDetails('sugarcane')
      }
    ];

    addMessage(message, 'bot', actions);
  };

  const promptForName = () => {
    const message = language === 'hi'
      ? 'कृपया अपना नाम लिखें:'
      : 'Please enter your name:';
    addMessage(message, 'bot');
  };

  const promptForVillage = () => {
    const message = language === 'hi'
      ? 'कृपया अपने गांव का नाम लिखें:'
      : 'Please enter your village name:';
    addMessage(message, 'bot');
  };

  const promptForMobile = () => {
    const message = language === 'hi'
      ? 'कृपया अपना मोबाइल नंबर लिखें:'
      : 'Please enter your mobile number:';
    addMessage(message, 'bot');
  };

  const promptForFarmSize = () => {
    const message = language === 'hi'
      ? 'कृपया अपने खेत का आकार लिखें (एकड़ में):'
      : 'Please enter your farm size (in acres):';
    addMessage(message, 'bot');
  };

  const showCropDetails = (cropType: string) => {
    const cropInfo: { [key: string]: { hindi: string; english: string } } = {
      paddy: {
        hindi: 'धान (चावल)\n\n🌾 बुवाई का समय: जून-जुलाई\n🌾 कटाई: नवंबर-दिसंबर\n🌾 अवधि: 120-150 दिन\n🌾 सिंचाई: नियमित पानी की आवश्यकता\n🌾 उत्पादन: 40-60 क्विंटल/एकड़\n\n💡 सुझाव: अच्छी गुणवत्ता के बीज का उपयोग करें और समय पर खाद डालें।',
        english: 'Paddy (Rice)\n\n🌾 Sowing time: June-July\n🌾 Harvesting: November-December\n🌾 Duration: 120-150 days\n🌾 Irrigation: Regular water needed\n🌾 Yield: 40-60 quintals/acre\n\n💡 Tip: Use quality seeds and apply fertilizers on time.'
      },
      wheat: {
        hindi: 'गेहूं\n\n🌾 बुवाई का समय: नवंबर-दिसंबर\n🌾 कटाई: अप्रैल-मई\n🌾 अवधि: 120-150 दिन\n🌾 सिंचाई: 4-5 बार\n🌾 उत्पादन: 25-35 क्विंटल/एकड़\n\n💡 सुझाव: उन्नत किस्म के बीज का उपयोग करें और उचित खाद प्रबंधन करें।',
        english: 'Wheat\n\n🌾 Sowing time: November-December\n🌾 Harvesting: April-May\n🌾 Duration: 120-150 days\n🌾 Irrigation: 4-5 times\n🌾 Yield: 25-35 quintals/acre\n\n💡 Tip: Use improved varieties and proper fertilizer management.'
      },
      maize: {
        hindi: 'मक्का\n\n🌾 बुवाई का समय: जून-जुलाई (खरीफ), फरवरी-मार्च (रबी)\n🌾 कटाई: अक्टूबर-नवंबर (खरीफ)\n🌾 अवधि: 90-120 दिन\n🌾 सिंचाई: 3-4 बार\n🌾 उत्पादन: 25-40 क्विंटल/एकड़\n\n💡 सुझाव: संकर किस्म के बीज का उपयोग करें।',
        english: 'Maize\n\n🌾 Sowing time: June-July (Kharif), February-March (Rabi)\n🌾 Harvesting: October-November (Kharif)\n🌾 Duration: 90-120 days\n🌾 Irrigation: 3-4 times\n🌾 Yield: 25-40 quintals/acre\n\n💡 Tip: Use hybrid varieties for better yield.'
      },
      sugarcane: {
        hindi: 'गन्ना\n\n🌾 बुवाई का समय: फरवरी-मार्च\n🌾 कटाई: दिसंबर-मार्च (अगले साल)\n🌾 अवधि: 12-18 महीने\n🌾 सिंचाई: नियमित\n🌾 उत्पादन: 500-800 क्विंटल/एकड़\n\n💡 सुझाव: स्वस्थ बीज गन्ने का उपयोग करें और उचित दूरी रखें।',
        english: 'Sugarcane\n\n🌾 Sowing time: February-March\n🌾 Harvesting: December-March (next year)\n🌾 Duration: 12-18 months\n🌾 Irrigation: Regular\n🌾 Yield: 500-800 quintals/acre\n\n💡 Tip: Use healthy seed cane and maintain proper spacing.'
      }
    };

    const info = cropInfo[cropType];
    const message = language === 'hi' ? info.hindi : info.english;
    addMessage(message, 'bot');
  };

  return (
    <ChatbotContext.Provider value={{
      messages,
      isOpen,
      userProfile,
      addMessage,
      openChatbot,
      closeChatbot,
      updateProfile,
      clearChat,
      detectLanguageAndIntent
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};
