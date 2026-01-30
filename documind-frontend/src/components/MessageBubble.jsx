import React from 'react';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
        ${isAi ? 'bg-neon/10 text-neon' : 'bg-gray-700 text-white'}`}>
        {isAi ? <Bot size={18} /> : <User size={18} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
        ${isAi 
          ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none' 
          : 'bg-neon text-black font-medium rounded-tr-none shadow-[0_0_15px_rgba(0,255,153,0.3)]'
        }`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;