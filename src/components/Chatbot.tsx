
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Chatbot = () => {
  const { 
    messages, 
    isOpen, 
    userProfile, 
    addMessage, 
    openChatbot, 
    closeChatbot, 
    updateProfile,
    clearChat 
  } = useChatbot();
  const { language } = useLanguage();
  const [inputMessage, setInputMessage] = useState('');
  const [waitingForInput, setWaitingForInput] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');

    // Handle profile updates
    if (waitingForInput) {
      const updatedProfile = { ...userProfile };
      switch (waitingForInput) {
        case 'name':
          updatedProfile.name = inputMessage;
          break;
        case 'village':
          updatedProfile.village = inputMessage;
          break;
        case 'mobile':
          updatedProfile.mobile = inputMessage;
          break;
        case 'farmSize':
          updatedProfile.farmSize = inputMessage;
          break;
      }
      updateProfile(updatedProfile);
      
      const confirmMessage = language === 'hi'
        ? `आपकी जानकारी अपडेट हो गई है। धन्यवाद!`
        : `Your information has been updated. Thank you!`;
      
      setTimeout(() => {
        addMessage(confirmMessage, 'bot');
        setWaitingForInput(null);
      }, 500);
    } else {
      // Handle general queries
      handleGeneralQuery(inputMessage);
    }

    setInputMessage('');
  };

  const handleGeneralQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Crop-related queries
    if (lowerQuery.includes('crop') || lowerQuery.includes('फसल') || 
        lowerQuery.includes('farming') || lowerQuery.includes('खेती')) {
      const message = language === 'hi'
        ? 'आप किस फसल के बारे में जानना चाहते हैं? मैं धान, गेहूं, मक्का, गन्ना और अन्य फसलों की जानकारी दे सकता हूं।'
        : 'Which crop would you like to know about? I can provide information about paddy, wheat, maize, sugarcane and other crops.';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    // Weather queries
    else if (lowerQuery.includes('weather') || lowerQuery.includes('मौसम')) {
      const message = language === 'hi'
        ? 'मौसम की जानकारी के लिए स्थानीय मौसम विभाग से संपर्क करें। फसलों के लिए उपयुक्त मौसम की जानकारी मैं दे सकता हूं।'
        : 'For weather information, please contact local meteorological department. I can provide suitable weather information for crops.';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    // Fertilizer queries
    else if (lowerQuery.includes('fertilizer') || lowerQuery.includes('खाद') || 
             lowerQuery.includes('उर्वरक')) {
      const message = language === 'hi'
        ? 'खाद के लिए सुझाव:\n\n🌱 नाइट्रोजन: पत्तियों की वृद्धि के लिए\n🌱 फास्फोरस: जड़ों के विकास के लिए\n🌱 पोटाश: फल और बीज के लिए\n\nमिट्टी जांच कराकर उचित खाद का उपयोग करें।'
        : 'Fertilizer recommendations:\n\n🌱 Nitrogen: For leaf growth\n🌱 Phosphorus: For root development\n🌱 Potash: For fruit and seed development\n\nUse appropriate fertilizers based on soil testing.';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
    // Default response
    else {
      const message = language === 'hi'
        ? 'मैं आपकी मदद करना चाहता हूं। कृपया फसल, खाद, या खेती से संबंधित प्रश्न पूछें।'
        : 'I want to help you. Please ask questions related to crops, fertilizers, or farming.';
      
      setTimeout(() => addMessage(message, 'bot'), 500);
    }
  };

  const handleActionClick = (action: any) => {
    if (action.id === 'name' || action.id === 'village' || action.id === 'mobile' || action.id === 'farmSize') {
      setWaitingForInput(action.id);
    }
    action.action();
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={openChatbot}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 text-white shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-green-600 text-white rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {language === 'hi' ? 'कृषि सहायक' : 'Farm Assistant'}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-white hover:bg-green-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChatbot}
              className="text-white hover:bg-green-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action) => (
                          <Button
                            key={action.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleActionClick(action)}
                            className="text-xs bg-white hover:bg-gray-50"
                          >
                            {language === 'hi' ? action.labelHindi : action.label}
                          </Button>
                        ))}
                      </div>
                    )}
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
            placeholder={language === 'hi' ? 'अपना संदेश लिखें...' : 'Type your message...'}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm" className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
