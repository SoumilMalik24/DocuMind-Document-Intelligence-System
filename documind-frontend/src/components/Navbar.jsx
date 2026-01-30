import React from 'react';
import { Bot } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-md fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <Bot className="text-neon w-8 h-8" />
        <h1 className="text-xl font-bold tracking-wider text-white">
          Docu<span className="text-neon">Mind</span>
        </h1>
      </div>
      <div className="text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full">
        v1.0 Beta
      </div>
    </nav>
  );
};

export default Navbar;