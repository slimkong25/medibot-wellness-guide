
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";
import ChatMessage from './ChatMessage';
import { ChatMessage as MessageType, processUserInput, generateId, isValidInput } from '../utils/chatUtils';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: generateId(),
      content: "Hello! I'm MediBot, your wellness guide. Please describe your symptoms, and I'll provide information about possible conditions, recommended medicines, dietary suggestions, and rest periods. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidInput(input)) {
      toast.error("Please enter a valid message");
      return;
    }
    
    // Add user message
    const userMessage: MessageType = {
      id: generateId(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Clear input
    setInput('');
    
    // Process response after a short delay to simulate thinking
    setTimeout(() => {
      const botResponse = processUserInput(userMessage.content);
      setMessages(prev => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-128px)] max-w-4xl mx-auto">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="self-start animate-pulse flex items-center gap-1 text-sm text-gray-500 ml-10 mb-4">
              <div className="w-2 h-2 bg-medical-purple rounded-full"></div>
              <div className="w-2 h-2 bg-medical-purple rounded-full"></div>
              <div className="w-2 h-2 bg-medical-purple rounded-full"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t bg-white/80 backdrop-blur-sm p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms here..."
            disabled={isProcessing}
            className="border-medical-purple/30 focus-visible:ring-medical-purple"
          />
          <Button 
            type="submit" 
            disabled={isProcessing}
            className="medibot-gradient hover:opacity-90 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-center mt-2 text-gray-500">
          MediBot provides information only. Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
