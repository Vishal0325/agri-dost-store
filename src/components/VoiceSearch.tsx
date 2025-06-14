
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VoiceSearchProps {
  onSearchResults: (query: string) => void;
}

const VoiceSearch = ({ onSearchResults }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN'; // Hindi and English

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Voice Search Active",
        description: "Speak now... (minimum 4 words)",
      });
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        const wordCount = finalTranscript.trim().split(/\s+/).length;
        
        if (wordCount >= 4) {
          onSearchResults(finalTranscript.trim());
          toast({
            title: "Voice Search Complete",
            description: `Searching for: "${finalTranscript.trim()}"`,
          });
          recognition.stop();
        }
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast({
        title: "Voice Search Error",
        description: "Failed to recognize speech. Please try again.",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    const startListening = () => {
      if (!isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    };

    // Store recognition instance for cleanup
    (recognition as any)._startListening = startListening;
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, onSearchResults, toast]);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Search Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`p-2 rounded-full transition-all duration-200 ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'bg-white hover:bg-gray-100 text-gray-600'
      }`}
      onClick={handleVoiceSearch}
      title={isListening ? "Stop voice search" : "Start voice search"}
    >
      {isListening ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
};

export default VoiceSearch;
