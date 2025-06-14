import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User, Bot, Plus, MapPin, Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ApiConfiguration from '@/components/ApiConfiguration';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface ProductSuggestion {
  id: number;
  name: string;
  price: number;
  image: string;
  company: string;
  description: string;
}

const ChatbotPage = () => {
  const { 
    messages, 
    userProfile, 
    addMessage, 
    updateProfile,
    clearChat,
    detectLanguageAndIntent
  } = useChatbot();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState('');
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('geminiApiKey', key);
    setApiKey(key);
  };

  const createHinglishAwarePrompt = (userMessage: string, detectedInfo: any) => {
    const { language: detectedLang, intent, isHinglish } = detectedInfo;
    
    let systemPrompt = `You are an expert farming assistant for Indian farmers. You understand Hinglish (Hindi-English mix) very well. 

Key Hinglish patterns to understand:
- "mero/mera/tera" = my/your
- "dekho" = see/look
- "batao" = tell me
- "karo" = do
- "chahiye" = need/want
- "lagta hai" = seems like
- "according" = के अनुसार
- "session/season" = मौसम/time
- Rural farming terms in Roman Hindi

User's farming context:
- Village: ${userProfile.village || 'Bihar'}
- Farm size: ${userProfile.farmSize || '2 acres'}
- Crops: ${userProfile.primaryCrops.join(', ') || 'Mixed farming'}

User input language detected: ${detectedLang}
Intent detected: ${intent}

If user writes in Hinglish, respond in a natural mix of Hindi and English that farmers commonly use.
Be practical, concise, and helpful. Focus on actionable farming advice.`;

    if (intent === 'weather') {
      systemPrompt += `\n\nThis is a weather query. Provide current weather and farming-specific forecasts for ${userProfile.village || 'Bihar'}.`;
    } else if (intent === 'crop') {
      systemPrompt += `\n\nThis is about crops/farming. Give specific advice for their farming context.`;
    } else if (intent === 'product') {
      systemPrompt += `\n\nThis is about seeds/fertilizers/products. Suggest specific products if needed.`;
    }

    return systemPrompt + `\n\nUser message: "${userMessage}"`;
  };

  const getAIResponse = async (prompt: string, userMessage?: string) => {
    if (!apiKey) {
      addMessage("I can't answer right now. Please configure the AI API key.", 'bot');
      return;
    }
    
    setIsBotTyping(true);

    try {
      // Detect language and intent for better responses
      const detectedInfo = userMessage ? detectLanguageAndIntent(userMessage) : { language: 'english', intent: 'general', isHinglish: false };
      const enhancedPrompt = userMessage ? createHinglishAwarePrompt(userMessage, detectedInfo) : prompt;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            "role": "user",
            "parts": [{ "text": enhancedPrompt }]
          }],
          systemInstruction: {
            parts: [{
              text: "You are an expert farming assistant for Indian farmers. You understand Hinglish (mix of Hindi and English) very well. Respond naturally in the same style as the user's input. Be practical and helpful."
            }]
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botMessage) {
        addMessage(botMessage, 'bot');
      } else {
        console.error("No content in Gemini response:", data);
        const errorMessage = language === 'hi' 
          ? 'माफ़ कीजिए, मुझे आपकी बात समझ नहीं आई। क्या आप फिर से पूछ सकते हैं?'
          : "Sorry, I couldn't understand that. Could you please rephrase?";
        addMessage(errorMessage, 'bot');
      }

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = language === 'hi' 
        ? 'माफ़ कीजिए, मैं अभी अपने ज्ञान कोष से जुड़ नहीं पा रहा हूँ। कृपया बाद में दोबारा प्रयास करें।'
        : "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
      addMessage(errorMessage, 'bot');
      toast({
        title: "AI Error",
        description: "Could not fetch response from Gemini AI. Check your API key and network connection.",
        variant: "destructive"
      });
    } finally {
      setIsBotTyping(false);
    }
  }

  const handleBotResponse = (userMessage: string) => {
    const detectedInfo = detectLanguageAndIntent(userMessage);
    const lowerMessage = userMessage.toLowerCase();
    
    // Handle specific intents with product suggestions
    if (detectedInfo.intent === 'product' || 
        lowerMessage.includes('seed') || lowerMessage.includes('बीज') || 
        lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद') ||
        lowerMessage.includes('beej') || lowerMessage.includes('khad')) {
      
      const suggestions: ProductSuggestion[] = [
        {
          id: 1,
          name: language === 'hi' ? 'धान के बीज (हाइब्रिड)' : 'Paddy Seeds (Hybrid)',
          price: 450,
          image: '/placeholder.svg',
          company: 'Bayer',
          description: language === 'hi' ? 'उच्च उत्पादन वाले धान के बीज' : 'High yield paddy seeds'
        },
        {
          id: 2,
          name: language === 'hi' ? 'NPK उर्वरक' : 'NPK Fertilizer',
          price: 650,
          image: '/placeholder.svg',
          company: 'IFFCO',
          description: language === 'hi' ? 'संतुलित पोषक तत्व' : 'Balanced nutrients'
        },
        {
          id: 3,
          name: language === 'hi' ? 'कीटनाशक स्प्रे' : 'Pesticide Spray',
          price: 320,
          image: '/placeholder.svg',
          company: 'Syngenta',
          description: language === 'hi' ? 'फसल सुरक्षा के लिए' : 'For crop protection'
        }
      ];
      
      setProductSuggestions(suggestions);
      
      const message = detectedInfo.isHinglish 
        ? 'Aapke liye kuch product suggestions hain:\n\n👇 Neeche diye gaye products dekho aur pasand aane par cart mein add karo.'
        : (language === 'hi'
          ? 'आपके लिए कुछ उत्पाद सुझाव:\n\n👇 नीचे दिए गए उत्पादों को देखें और पसंद आने पर कार्ट में जोड़ें।'
          : 'Here are some product suggestions for you:\n\n👇 Check the products below and add to cart if you like them.');
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    else {
      // Use enhanced AI response with Hinglish support
      getAIResponse(userMessage, userMessage);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isBotTyping) return;

    addMessage(inputMessage, 'user');
    handleBotResponse(inputMessage);
    setInputMessage('');
  };

  const handleAddToCart = (product: ProductSuggestion) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      company: product.company
    });

    const confirmMessage = language === 'hi'
      ? `${product.name} कार्ट में जोड़ दिया गया! 🛒`
      : `${product.name} added to cart! 🛒`;
    
    addMessage(confirmMessage, 'bot');
    setProductSuggestions([]);
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!apiKey) {
    return <ApiConfiguration onApiKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h1 className="text-xl font-bold">
                {language === 'hi' ? 'कृषि सहायक' : 'Farm Assistant'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[75vh] flex flex-col">
              <CardHeader className="bg-gray-100">
                <CardTitle className="flex items-center justify-between">
                  <span>{language === 'hi' ? 'चैट करें' : 'Chat'}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearChat();
                      setProductSuggestions([]);
                    }}
                    className="text-xs"
                  >
                    {language === 'hi' ? 'साफ़ करें' : 'Clear'}
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.type === 'bot' && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-green-600 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`rounded-lg p-3 max-w-[80%] ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 text-right ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                        {message.type === 'user' && (
                           <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-600 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isBotTyping && (
                      <div className="flex items-end gap-2 justify-start">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-green-600 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-gray-200 text-gray-800 rounded-bl-none">
                          <p className="text-sm animate-pulse">
                            {language === 'hi' ? 'सोच रहा हूँ...' : 'Thinking...'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                <div className="p-4 border-t flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={language === 'hi' ? 'खेती के बारे में पूछें... या Hinglish mein baat kariye' : 'Ask about farming... ya Hinglish mein bhi puch sakte hain'}
                    className="flex-1"
                    disabled={isBotTyping}
                  />
                  <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700" disabled={isBotTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'hi' ? 'प्रोफाइल जानकारी' : 'Profile Info'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>{language === 'hi' ? 'नाम:' : 'Name:'}</strong> {userProfile.name || 'N/A'}</p>
                <p><strong>{language === 'hi' ? 'गांव:' : 'Village:'}</strong> {userProfile.village || 'N/A'}</p>
                <p><strong>{language === 'hi' ? 'खेत का आकार:' : 'Farm Size:'}</strong> {userProfile.farmSize || 'N/A'}</p>
                {userProfile.primaryCrops.length > 0 && (
                  <div>
                    <strong>{language === 'hi' ? 'मुख्य फसलें:' : 'Main Crops:'}</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userProfile.primaryCrops.map((crop, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Suggestions */}
            {productSuggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'hi' ? 'उत्पाद सुझाव' : 'Product Suggestions'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {productSuggestions.map((product) => (
                    <div key={product.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-600">{product.company}</p>
                          <p className="text-sm font-bold text-green-600">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
