
import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HomeVoiceSearchProps {
  setSearchQuery: (q: string) => void;
  onVoiceSearchResult: (q: string) => void;
  disabled?: boolean;
}

const HomeVoiceSearch: React.FC<HomeVoiceSearchProps> = ({ setSearchQuery, onVoiceSearchResult, disabled }) => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.lang = 'hi-IN'; // Covers Hinglish (Hindi+English)
    recognition.interimResults = false;

    recognition.onstart = () => {
      toast({
        title: "Listening...",
        description: "Speak your search (Hinglish ok!)",
      });
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Search Error",
        description: "Could not recognize your voice. Try again.",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setSearchQuery(transcript);
      onVoiceSearchResult(transcript);
      toast({
        title: "Voice Search",
        description: `You said: "${transcript}"`,
      });
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={`p-2 rounded-full transition-all duration-200 bg-red-500 text-white border-2 border-red-500 shadow-lg ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      onClick={isListening ? stopListening : startListening}
      title={isListening ? "Stop voice search" : "Start voice search"}
      disabled={disabled}
      style={{ minWidth: '40px', minHeight: '40px' }}
      aria-label="Voice input (Hinglish supported)"
    >
      {isListening ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
    </Button>
  );
};

export default HomeVoiceSearch;
