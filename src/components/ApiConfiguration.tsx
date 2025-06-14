
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ApiConfigurationProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiConfiguration: React.FC<ApiConfigurationProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
      toast({
        title: 'API Key Saved',
        description: 'Your Perplexity API key has been saved in your browser.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid API key.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Chatbot Configuration</CardTitle>
          <CardDescription>
            To enable AI-powered features, please provide your Perplexity AI API key. The key will be stored in your browser's local storage. You can get one from the{' '}
            <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Perplexity AI platform
            </a>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="password"
            placeholder="Enter your Perplexity API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Save API Key
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiConfiguration;
