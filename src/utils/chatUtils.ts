
import { generateResponse } from './medicalData';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function processUserInput(input: string): ChatMessage {
  // Generate a response based on the user's input
  const response = generateResponse(input);
  
  return {
    id: generateId(),
    content: response,
    sender: 'bot',
    timestamp: new Date()
  };
}

// Helper function to generate unique IDs for messages
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Helper function to check if the input is a valid question
export function isValidInput(input: string): boolean {
  return input.trim().length > 0;
}
