/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, Smile, Sparkles, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hi there! 👋 Welcome to FlexMart Customer Care! I am Zain. How can I help you complete your shopping today?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Apply 20% discount coupon please',
    'Do you support Cash on Delivery in UAE/PK?',
    'What is the refund policy?',
    'I want to track my order'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: textToSend, time: currentTime };
    setChatLog((prev) => [...prev, userMsg]);
    setMessage('');
    
    // Trigger typing effect
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "I would be glad to help with that! Let me consult our live inventory data system.";
      const textLower = textToSend.toLowerCase();

      if (textLower.includes('coupon') || textLower.includes('discount') || textLower.includes('code')) {
        replyText = "Awesome news! You can use coupon code **FLEX2026** at checkout for an instant 20% flat discount on order values above $50. Just select Credit Card or Cash on Delivery!";
      } else if (textLower.includes('delivery') || textLower.includes('cod') || textLower.includes('cash')) {
        replyText = "Absolutely! We support Cash On Delivery (COD) across all cities in the UAE and Pakistan. We also accept bank transfers, credit/debit cards, JazzCash, and Easypaisa.";
      } else if (textLower.includes('refund') || textLower.includes('return')) {
        replyText = "We offer a flexible **14-day hassle-free return policy**! If you are not satisfied with any gadget or clothing fabric/size, let us know and we will issue a direct replacement courier.";
      } else if (textLower.includes('track') || textLower.includes('shipping') || textLower.includes('order')) {
        replyText = "To track, simply type your Order ID in our 'Track Order' screen! Your shipments are handled using top-flight express carriers with next-day courier updates.";
      } else {
        replyText = "Greetings from FlexMart! That sounds great. Since you are shopping on our 2026 platform, we can assist you dynamically! Feel free to checkout securely or apply coupon **FLEX2026** for a special surprise.";
      }

      setChatLog((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="whatsapp-widget">
      {/* Mini floating button with active ping pulse */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer group transition-transform hover:scale-110 active:scale-95"
          id="whatsapp-trigger"
        >
          <span className="absolute -top-1 -right-1 block h-3.5 w-3.5 rounded-full bg-[#FF7A00] ring-2 ring-white animate-pulse" />
          <MessageSquare className="w-6 h-6 stroke-[2.3]" />
          
          <div className="absolute right-full mr-3 bg-[#0B1E40] text-white text-[11px] px-3 py-1.5 rounded-lg shadow-xl font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            💬 Need help? Live Chat
          </div>
        </button>
      )}

      {/* Expanded chat window popup */}
      {isOpen && (
        <div className="w-[340px] max-w-[calc(100vw-32px)] bg-gray-50 rounded-2xl shadow-3xl border border-gray-200 overflow-hidden flex flex-col justify-between animate-fade-in" id="whatsapp-panel">
          
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-teal-850 font-bold overflow-hidden text-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
                    alt="Agent Zain" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold leading-tight tracking-wide flex items-center gap-1">
                  <span>Zain (FlexMart Support)</span>
                  <Sparkles size={11} className="text-yellow-400 fill-yellow-400" />
                </h4>
                <p className="text-[10px] text-emerald-200">Online • Replies instantly</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 hover:bg-white/10 rounded cursor-pointer text-emerald-100 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Info Box */}
          <div className="bg-emerald-50/70 border-b border-emerald-100/50 px-4 py-2 text-[10px] text-emerald-850 flex items-center gap-1.5">
            <CheckCircle size={12} className="text-emerald-600 shrink-0" />
            <span>Simulating active live chat via WhatsApp protocol.</span>
          </div>

          {/* Chat log section */}
          <div className="p-4 flex-1 h-64 overflow-y-auto space-y-3.5 bg-[#e5ddd5]" id="chat-messages">
            {chatLog.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div 
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#dcf8c6] text-gray-800 rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-500 mt-1 uppercase tracking-wider">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start max-w-[80%] mr-auto">
                <div className="bg-white text-gray-400 py-2.5 px-4 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Prompt Pills list */}
          <div className="p-2 border-t border-gray-100 bg-white grid grid-cols-2 gap-1.5">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(qp)}
                className="text-left text-[10px] bg-gray-50 hover:bg-emerald-50 hover:text-[#075E54] hover:border-emerald-200 border border-gray-200 py-1.5 px-2 rounded-lg transition-all text-gray-650 font-medium truncate cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Form input bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(message);
            }}
            className="p-3 border-t border-gray-100 bg-white flex items-center gap-1.5"
          >
            <input
              type="text"
              placeholder="Ask us anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-900 border border-transparent focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-[#075E54] hover:bg-[#064e46] text-white p-2 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={12} className="relative left-0.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
