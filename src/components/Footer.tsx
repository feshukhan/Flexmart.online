/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Facebook, 
  Instagram, 
  Twitter, 
  Send, 
  Mail, 
  MapPin, 
  Check, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import { categories } from '../data/products';

interface FooterProps {
  setScreen: (screen: string) => void;
  onSelectCategory: (category: string) => void;
}

export default function Footer({ setScreen, onSelectCategory }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNav = (screen: string) => {
    setScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatSelect = (slug: string) => {
    onSelectCategory(slug);
    setScreen('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#08152c] text-gray-300 font-sans border-t border-blue-950" id="main-footer">
      
      {/* Upper Newsletter Subscription Grid Bar */}
      <div className="w-full bg-[#0B1E40] py-10 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="text-[#FF7A00]" size={20} />
              <span>Subscribe to our Newsletter</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              Get 20% off your first checkout! Stay updated with high-end drops, flash deals, and exclusive coupons directly inside your inbox.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex-1 max-w-lg">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full bg-[#0E2651] text-white text-xs pl-4 pr-32 py-3 rounded-lg border border-blue-900/60 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-5 bg-[#FF7A00] hover:bg-[#E06B00] text-white text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send size={12} />
                  <span>Join Club</span>
                </button>
              </form>
            ) : (
              <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-semibold px-4 py-3.5 rounded-lg flex items-center gap-2 animate-fade-in">
                <Check size={16} />
                <span>Subscribed successfully! Welcome to the FlexMart Club. Coupon code: <b>FLEXCLUB</b> sent to your email.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Section */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Brand details */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="bg-[#FF7A00] p-1.5 rounded-lg flex items-center justify-center text-white">
              <ShoppingBag size={18} className="stroke-[2.5]" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Flex<span className="text-[#FF7A00]">Mart</span>
            </span>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            FlexMart is the region’s premier multi-category digital catalog. Providing lightning-fast global shipping with local customer support agents based directly within the UAE & Pakistan.
          </p>
          
          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin size={16} className="text-[#FF7A00] shrink-0 mt-0.5" />
              <span className="text-gray-400">Downtown Boulevard, Level 15, Dubai, United Arab Emirates</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <PhoneCall size={16} className="text-[#FF7A00] shrink-0" />
              <span className="text-gray-400">+972 4 123 4567 / +92 21 876 5432</span>
            </div>
          </div>
          
          {/* Social icons */}
          <div className="flex items-center gap-3 pt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#112344] hover:bg-[#FF7A00] hover:text-white text-gray-300 flex items-center justify-center transition-all">
              <Facebook size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#112344] hover:bg-[#FF7A00] hover:text-white text-gray-300 flex items-center justify-center transition-all">
              <Instagram size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#112344] hover:bg-[#FF7A00] hover:text-white text-gray-300 flex items-center justify-center transition-all">
              <Twitter size={14} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div>
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF7A00] pl-2.5">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Home Interface
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('shop')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-[#FF7A00] font-semibold text-left">
                ⚡ Premium Shop Store
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('categories')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Browse Categories
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                About Our Company
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('contact')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Contact Customer Care
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('faq')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Frequently Asked FAQs
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('zambeel')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left font-bold text-orange-400">
                📦 Zambeel Dropship Hub
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Custom Top Categories */}
        <div>
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF7A00] pl-2.5">
            Top Categories
          </h4>
          <ul className="space-y-2.5 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <button 
                  onClick={() => handleCatSelect(cat.slug)} 
                  className="hover:text-[#FF7A00] transition-colors capitalize text-left cursor-pointer"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Customer Policies / Security credentials */}
        <div>
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF7A00] pl-2.5">
            Store Policies
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button onClick={() => handleNav('privacy')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Privacy Policy Statement
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('terms')} className="hover:text-[#FF7A00] transition-colors cursor-pointer text-left">
                Terms of Use & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('track')} className="hover:text-[#FF7A00] text-orange-400 font-bold tracking-wide transition-colors cursor-pointer text-left flex items-center gap-1">
                <span>🚚 Track Order Online</span>
              </button>
            </li>
          </ul>

          <div className="bg-[#0e2246] p-3 rounded-lg border border-blue-900/60 mt-5">
            <h5 className="text-[11px] font-bold text-gray-200 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#FF7A00]" />
              <span>Secure Checkout SSL</span>
            </h5>
            <p className="text-[10px] text-gray-400 mt-1">
              Your details are safe. FlexMart utilizes industry-leading encryption parameters.
            </p>
          </div>
        </div>

      </div>

      {/* Powered and localization footer info with beautiful Payment icons representation */}
      <div className="w-full bg-[#050E1E] text-xs py-7 px-4 border-t border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
          <div>
            <p className="text-xs">
              © 2026 <span className="text-white font-extrabold">FlexMart Inc</span>. Designed like a premier WooCommerce-Powered Shopify Elite Hub.
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              All simulated rights reserved. Product information and reviews are simulated for demonstration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mr-1 font-bold">Payments:</span>
            <span className="bg-[#112344] text-[10px] text-gray-300 font-mono font-bold px-2 py-1 rounded border border-blue-900/30 shadow-sm">
              💵 COD
            </span>
            <span className="bg-[#112344] text-[10px] text-gray-300 font-mono font-bold px-2 py-1 rounded border border-blue-900/30 shadow-sm">
              💳 Credit/Debit Card
            </span>
            <span className="bg-[#112344] text-[10px] text-orange-400 font-mono font-black px-2 py-1 rounded border border-blue-900/50 shadow-sm">
              JazzCash
            </span>
            <span className="bg-[#112344] text-[10px] text-green-400 font-mono font-black px-2 py-1 rounded border border-blue-900/50 shadow-sm">
              EasyPaisa
            </span>
            <span className="bg-[#112344] text-[10px] text-blue-400 font-mono font-bold px-2 py-1 rounded border border-blue-900/30 shadow-sm">
              🏦 Bank Transfer
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
