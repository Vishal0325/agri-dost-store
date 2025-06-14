
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Chatbot = () => {
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  return (
    <Button
      onClick={handleChatbotClick}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 text-white shadow-lg z-50"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default Chatbot;
