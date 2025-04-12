
import React from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-purple/50 to-medical-light-blue/50">
      <Header />
      <main className="container mx-auto">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
