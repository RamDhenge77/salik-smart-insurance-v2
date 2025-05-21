
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface OpenAIKeyInputProps {
  onKeySubmit: (key: string) => void;
}

const OpenAIKeyInput: React.FC<OpenAIKeyInputProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('openai_key', apiKey);
    onKeySubmit(apiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved temporarily",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>OpenAI Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Your API key will be stored temporarily in your browser.
            </p>
          </div>
          <Button variant='primary' type="submit" className="w-full">
            Save API Key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OpenAIKeyInput;
