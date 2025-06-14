
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
    <button
      type="button"
      aria-label="Voice input (Hinglish supported)"
      onClick={isListening ? stopListening : startListening}
      disabled={disabled}
      title={isListening ? "Stop voice search" : "Start voice search"}
      className="absolute right-12 top-1/2 -translate-y-1/2"
      style={{
        display: 'inline-block',
        minWidth: 36,
        minHeight: 36,
        padding: 0,
        background: 'none',
        border: '2px solid #ff0000',
        borderRadius: '50%',
        outline: 'none',
        color: '#ff0000',
        zIndex: 20,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
      tabIndex={0}
    >
      {isListening ? (
        <MicOff style={{ color: '#ff0000', width: 24, height: 24, display: 'inline-block' }} />
      ) : (
        <Mic style={{ color: '#ff0000', width: 24, height: 24, display: 'inline-block' }} />
      )}
    </button>
  );
};

export default HomeVoiceSearch;
