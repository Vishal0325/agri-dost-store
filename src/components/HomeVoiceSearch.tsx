
import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HomeVoiceSearchProps {
  setSearchQuery: (q: string) => void;
  onVoiceSearchResult: (q: string) => void;
  disabled?: boolean;
}

const HomeVoiceSearch: React.FC<HomeVoiceSearchProps> = ({
  setSearchQuery,
  onVoiceSearchResult,
  disabled,
}) => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [retryToastId, setRetryToastId] = useState<string | null>(null);
  const { toast, dismiss } = useToast();

  const handleRecognitionError = (message = "Mic not detected or unclear audio, please speak again.") => {
    setIsListening(false);
    // Offer retry toast with a retry button action
    const result = toast({
      title: "Voice Search Error",
      description: message,
      variant: "destructive",
      action: (
        <Button
          size="sm"
          className="ml-2 bg-red-500 text-white"
          onClick={() => {
            dismiss(result.id);
            startListening();
          }}
        >
          Retry
        </Button>
      ),
    });
    setRetryToastId(result.id);
  };

  const startListening = () => {
    // Dismiss previous error toast
    if (retryToastId) {
      dismiss(retryToastId);
      setRetryToastId(null);
    }

    // Feature detection
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      handleRecognitionError("Your browser doesn't support voice recognition.");
      return;
    }

    // Attempt to start mic (browser will prompt if not already granted)
    let SpeechRecognition;
    try {
      // @ts-ignore
      SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    } catch (err) {
      handleRecognitionError();
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.lang = 'hi-IN'; // Use Hinglish (will recognize en-IN and hi-IN)
      recognition.interimResults = false;

      setIsListening(true);

      recognition.onstart = () => {
        toast({
          title: "Listening...",
          description: "Speak your search (Hinglish supported)",
        });
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        // Check for permissions / no mic
        if (event.error === 'not-allowed' || event.error === 'denied') {
          handleRecognitionError("Microphone access was denied. Please allow mic access and try again.");
        } else if (event.error === 'no-speech' || event.error === 'audio-capture') {
          handleRecognitionError("Mic not detected or unclear audio, please speak again.");
        } else {
          handleRecognitionError("Voice recognition failed, please try again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        setIsListening(false);
        setSearchQuery(transcript);
        onVoiceSearchResult(transcript);
        toast({
          title: "Voice Search",
          description: `You said: "${transcript}"`,
        });
      };

      recognition.start();
    } catch (e) {
      handleRecognitionError();
    }
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
        <MicOff
          style={{
            color: '#ff0000',
            width: 24,
            height: 24,
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        />
      ) : (
        <Mic
          style={{
            color: '#ff0000',
            width: 24,
            height: 24,
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        />
      )}
    </button>
  );
};

export default HomeVoiceSearch;

