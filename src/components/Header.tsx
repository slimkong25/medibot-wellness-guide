
import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 md:py-6 sticky top-0 z-10 backdrop-blur-lg bg-white/80 border-b">
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full medibot-gradient flex items-center justify-center">
            <Stethoscope className="text-white h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold flex items-center gap-1">
              MediBot
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </h1>
            <p className="text-xs text-muted-foreground">Your Wellness Guide</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
