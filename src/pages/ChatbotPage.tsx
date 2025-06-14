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
    clearChat 
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
    const savedApiKey = localStorage.getItem('perplexityApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('perplexityApiKey', key);
    setApiKey(key);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isBotTyping) return;

    addMessage(inputMessage, 'user');
    handleBotResponse(inputMessage);
    setInputMessage('');
  };

  const getAIResponse = async (prompt: string) => {
    if (!apiKey) {
      addMessage("I can't answer right now. Please configure the AI API key.", 'bot');
      return;
    }
    
    setIsBotTyping(true);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are an expert farming assistant for Indian farmers. Provide concise, accurate, and helpful information. If asked about weather, provide it for the specified location. Respond in the same language as the user query (e.g., Hindi or English).'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const botMessage = data.choices[0].message.content;
      addMessage(botMessage, 'bot');

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = language === 'hi' 
        ? 'माफ़ कीजिए, मैं अभी अपने ज्ञान कोष से जुड़ नहीं पा रहा हूँ। कृपया बाद में दोबारा प्रयास करें।'
        : "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
      addMessage(errorMessage, 'bot');
      toast({
        title: "AI Error",
        description: "Could not fetch response from Perplexity AI. Check your API key and network connection.",
        variant: "destructive"
      });
    } finally {
      setIsBotTyping(false);
    }
  }

  const handleBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
      const location = userProfile.village || 'Bihar, India';
      const prompt = language === 'hi'
        ? `${location} में खेती के लिए मौसम की जानकारी और पूर्वानुमान दें।`
        : `Provide the current weather and forecast for ${location} for farming purposes.`;
      getAIResponse(prompt);
    }
    else if (lowerMessage.includes('seed') || lowerMessage.includes('बीज') || 
             lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद')) {
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
      
      const message = language === 'hi'
        ? 'आपके लिए कुछ उत्पाद सुझाव:\n\n👇 नीचे दिए गए उत्पादों को देखें और पसंद आने पर कार्ट में जोड़ें।'
        : 'Here are some product suggestions for you:\n\n👇 Check the products below and add to cart if you like them.';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('सुझाव')) {
      const crops = userProfile.primaryCrops.length > 0 
        ? userProfile.primaryCrops.join(', ')
        : (language === 'hi' ? 'धान, गेहूं' : 'Paddy, Wheat');
      
      const message = language === 'hi'
        ? `${userProfile.name || 'किसान भाई'} जी, आपकी ${userProfile.farmSize || '2'} एकड़ जमीन और (${crops}) फसलों के लिए सुझाव यहाँ दिए गए हैं। आप बीज या खाद के बारे में पूछ सकते हैं।`
        : `${userProfile.name || 'Dear Farmer'}, here are suggestions for your ${userProfile.farmSize || '2'} acre land and (${crops}) crops. You can ask about seeds or fertilizers.`;
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    else {
      getAIResponse(userMessage);
    }
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
            <Card className="h-[600px] flex flex-col">
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
                      <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-lg p-3 ${
                            message.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isBotTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex gap-2 max-w-[80%] flex-row">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                            <p className="text-sm animate-pulse">
                              {language === 'hi' ? 'सोच रहा हूँ...' : 'Thinking...'}
                            </p>
                          </div>
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
                    placeholder={language === 'hi' ? 'खेती के बारे में पूछें...' : 'Ask about farming...'}
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
