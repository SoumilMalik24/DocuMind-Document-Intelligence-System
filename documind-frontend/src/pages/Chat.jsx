import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { askQuestion } from '../services/api';
import MessageBubble from '../components/MessageBubble';
import Loader from '../components/Loader';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "I've analyzed your document. What would you like to know?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askQuestion(userMessage.text);
      const aiMessage = { 
        id: Date.now() + 1, 
        text: response.answer || "Sorry, I couldn't find an answer.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "Error connecting to the AI. Please try again.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pt-16 max-w-4xl mx-auto">
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {loading && (
           <div className="flex gap-4 animate-pulse">
             <div className="w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center">
               <Loader />
             </div>
             <div className="text-gray-400 text-sm flex items-center">
               Thinking...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-lg">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your document..."
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-all disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-neon rounded-full text-black hover:bg-neon/80 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default Chat;