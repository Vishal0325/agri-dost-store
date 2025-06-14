
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
  const [inputMessage, setInputMessage] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock weather data - in real app, this would fetch from weather API
  useEffect(() => {
    const fetchWeather = () => {
      const mockWeather: WeatherData = {
        location: userProfile.village || 'Bihar',
        temperature: 28,
        condition: 'sunny',
        humidity: 65,
        windSpeed: 12
      };
      setWeather(mockWeather);
    };

    fetchWeather();
  }, [userProfile.village]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-4 w-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-4 w-4 text-blue-500" />;
      case 'snowy': return <Snowflake className="h-4 w-4 text-blue-200" />;
      default: return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    handleBotResponse(inputMessage);
    setInputMessage('');
  };

  const handleBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Weather queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
      const message = language === 'hi'
        ? `${weather?.location || 'आपके क्षेत्र'} में मौसम:\n🌡️ तापमान: ${weather?.temperature}°C\n💧 नमी: ${weather?.humidity}%\n💨 हवा: ${weather?.windSpeed} km/h\n\nआज ${weather?.condition === 'sunny' ? 'धूप' : 'बादल'} है। खेती के लिए अच्छा मौसम है।`
        : `Weather in ${weather?.location || 'your area'}:\n🌡️ Temperature: ${weather?.temperature}°C\n💧 Humidity: ${weather?.humidity}%\n💨 Wind: ${weather?.windSpeed} km/h\n\nToday is ${weather?.condition}. Good weather for farming.`;
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    // Crop-specific product recommendations
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
    // Profile-based recommendations
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('सुझाव')) {
      const crops = userProfile.primaryCrops.length > 0 
        ? userProfile.primaryCrops.join(', ')
        : (language === 'hi' ? 'धान, गेहूं' : 'Paddy, Wheat');
      
      const message = language === 'hi'
        ? `${userProfile.name || 'किसान भाई'} जी, आपकी ${userProfile.farmSize || '2'} एकड़ जमीन के लिए सुझाव:\n\n🌾 मुख्य फसलें: ${crops}\n🌡️ मौसम के अनुसार: आज का तापमान ${weather?.temperature}°C है\n💧 सिंचाई: नमी ${weather?.humidity}% है\n\n${weather?.condition === 'sunny' ? 'धूप होने से आज खाद डालने का अच्छा समय है।' : 'बादल होने से पानी की जरूरत कम है।'}`
        : `${userProfile.name || 'Dear Farmer'}, suggestions for your ${userProfile.farmSize || '2'} acre land:\n\n🌾 Main crops: ${crops}\n🌡️ Weather-based: Today's temperature is ${weather?.temperature}°C\n💧 Irrigation: Humidity is ${weather?.humidity}%\n\n${weather?.condition === 'sunny' ? 'Sunny weather is good for fertilizer application.' : 'Cloudy weather means less water requirement.'}`;
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    // General farming queries
    else {
      const message = language === 'hi'
        ? 'मैं आपकी खेती में मदद करने के लिए यहाँ हूँ। आप मुझसे पूछ सकते हैं:\n\n🌾 फसल की जानकारी\n🌡️ मौसम की स्थिति\n🛒 बीज और खाद के सुझाव\n📊 आपकी प्रोफाइल के अनुसार सलाह\n\nक्या आप कोई खास चीज़ जानना चाहते हैं?'
        : 'I am here to help you with farming. You can ask me about:\n\n🌾 Crop information\n🌡️ Weather conditions\n🛒 Seeds and fertilizer suggestions\n📊 Advice based on your profile\n\nWhat specific information would you like?';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
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
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          
          {/* Weather Widget */}
          {weather && (
            <div className="flex items-center gap-2 bg-green-700 px-3 py-1 rounded-lg">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{weather.location}</span>
              {getWeatherIcon(weather.condition)}
              <span className="text-sm">{weather.temperature}°C</span>
            </div>
          )}
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
                    onClick={clearChat}
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
                  />
                  <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
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

            {/* Weather Details */}
            {weather && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getWeatherIcon(weather.condition)}
                    {language === 'hi' ? 'मौसम की जानकारी' : 'Weather Info'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex justify-between">
                    <span>{language === 'hi' ? 'तापमान:' : 'Temperature:'}</span>
                    <span>{weather.temperature}°C</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{language === 'hi' ? 'नमी:' : 'Humidity:'}</span>
                    <span>{weather.humidity}%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{language === 'hi' ? 'हवा:' : 'Wind:'}</span>
                    <span>{weather.windSpeed} km/h</span>
                  </p>
                </CardContent>
              </Card>
            )}

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
