
import React from 'react';
import { ChatMessage as MessageType } from '../utils/chatUtils';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={cn(
        "max-w-3xl animate-fade-in mb-4",
        isBot ? "self-start" : "self-end ml-auto"
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "medibot-gradient text-white" : "bg-medical-light-blue"
        )}>
          {isBot ? 
            <span className="text-sm font-semibold">MB</span> :
            <span className="text-sm font-semibold">You</span>
          }
        </div>
        <div className={isBot ? "chat-message-bot" : "chat-message-user"}>
          <div className="whitespace-pre-line text-sm md:text-base"
            dangerouslySetInnerHTML={{ 
              __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }}
          />
          <div className="mt-1 text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
