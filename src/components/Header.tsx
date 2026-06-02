/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  Truck, 
  Phone, 
  ChevronDown, 
  Sparkles,
  SearchIcon
} from 'lucide-react';
import { categories } from '../data/products';

interface HeaderProps {
  currentScreen: string;
  setScreen: (screen: string) => void;
  cartItemsCount: number;
  wishlistItemsCount: number;
  currentUser: { name: string; email: string } | null;
  setSearchQuery: (val: string) => void;
  searchQuery: string;
  onSearchSubmit: () => void;
  onSelectCategory: (category: string) => void;
}

export default function Header({
  currentScreen,
  setScreen,
  cartItemsCount,
  wishlistItemsCount,
  currentUser,
  setSearchQuery,
  searchQuery,
  onSearchSubmit,
  onSelectCategory
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    setScreen('shop');
  };

  const handleNavClick = (screen: string) => {
    setScreen(screen);
    setIsMobileMenuOpen(false);
  };

  const handleCatClick = (slug: string) => {
    onSelectCategory(slug);
    setScreen('shop');
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full relative z-50 font-sans" id="main-header">
      {/* Top Banner Bar */}
      <div className="w-full bg-[#07132c] text-white text-xs py-2 px-4 shadow-sm border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-0">
          <div className="flex items-center gap-2 text-gray-300 font-medium tracking-wide">
            <span className="bg-[#FF7A00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
              Deal of Day
            </span>
            <span>Everything You Need, All in One Place</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <button 
              onClick={() => handleNavClick('track')} 
              className="hover:text-[#FF7A00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck size={13} />
              <span>Track Order</span>
            </button>
            <span className="text-blue-900">|</span>
            <div className="flex items-center gap-1 hover:text-[#FF7A00] transition-colors cursor-pointer">
              <Phone size={13} />
              <span>+971 4 123 4567</span>
            </div>
            <span className="text-blue-900 sm:inline hidden">|</span>
            <span className="text-gray-400 text-[11px] sm:inline hidden">UAE & Pakistan Express Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="w-full bg-[#0B1E40] text-white px-4 py-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile hamburger icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-1 text-white hover:text-[#FF7A00] focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Branding */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex flex-col items-start cursor-pointer select-none"
            id="logo-brand"
          >
            <div className="flex items-center gap-1.5">
              <div className="bg-[#FF7A00] p-1.5 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
                <ShoppingBag size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-100 to-[#FF7A00] bg-clip-text text-transparent">
                Flex<span className="text-[#FF7A00]">Mart</span>
              </span>
            </div>
          </div>

          {/* Expanded Desktop Search Bar */}
          <form 
            onSubmit={handleSubmitSearch} 
            className="hidden md:flex flex-1 max-w-xl relative"
            id="desktop-search-form"
          >
            <input
              type="text"
              placeholder="Search premium electronics, smart gadgets, beauty, fashion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 pl-4 pr-12 py-2.5 rounded-lg text-sm font-normal focus:ring-2 focus:ring-[#FF7A00] focus:outline-none shadow-inner border border-gray-200"
            />
            <button 
              type="submit" 
              className="absolute right-1 top-1 bottom-1 px-4 bg-[#FF7A00] text-white hover:bg-[#E06B00] rounded-md transition-all flex items-center justify-center cursor-pointer"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Interactive Badges & Account */}
          <div className="flex items-center gap-3 sm:gap-5" id="nav-actions">
            
            {/* Account Dashboard Button */}
            <button
              onClick={() => handleNavClick('account')}
              className="flex items-center gap-1.5 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-full bg-blue-950 border border-blue-900 flex items-center justify-center group-hover:border-[#FF7A00] group-hover:bg-[#112d5d] transition-all">
                <User size={16} className="text-gray-300 group-hover:text-[#FF7A00] transition-colors" />
              </div>
              <div className="hidden lg:block text-xs">
                <p className="text-gray-400 font-normal leading-3">Hello, sign in</p>
                <p className="text-white font-semibold group-hover:text-[#FF7A00] transition-colors leading-4 truncate max-w-[100px]">
                  {currentUser ? currentUser.name : 'My Account'}
                </p>
              </div>
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => handleNavClick('shop')}
              className="relative p-2 text-white hover:text-[#FF7A00] transition-colors cursor-pointer"
              title="My Wishlist"
            >
              <Heart size={21} className="stroke-[2.2]" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF7A00] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#0B1E40] shadow-sm animate-scale">
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => handleNavClick('cart')}
              className="flex items-center gap-2 p-2 bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/20 rounded-lg transition-all cursor-pointer"
              title="My Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag size={21} className="stroke-[2.2]" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-2 bg-[#FF7A00] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Cart</span>
            </button>

          </div>
        </div>
      </div>

      {/* Desktop Sub-Nav Header Category System */}
      <nav className="w-full bg-white text-gray-900 border-b border-gray-100 shadow-sm hidden lg:block" id="desktop-menubar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            
            {/* All Categories Trigger Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="bg-[#FF7A00] text-white font-semibold text-sm px-5 py-3.5 flex items-center gap-2 hover:bg-[#E06B00] transition-all cursor-pointer shadow-sm select-none"
              >
                <Menu size={16} />
                <span>All Categories</span>
                <ChevronDown size={14} className={`transform transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown Cards */}
              {isCategoriesDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsCategoriesDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-full w-64 bg-white shadow-2xl border border-gray-100 rounded-b-lg py-2 z-50 animate-fade-in text-gray-800">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCatClick(cat.slug)}
                        className="w-full text-left px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-[#FF7A00] flex items-center justify-between font-medium transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        <span>{cat.name}</span>
                        <span className="text-gray-400 text-xs font-normal">Explore</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Standard Pages Router links */}
            <div className="flex items-center gap-1.5 ml-4">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'home' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'shop' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                Shop Store
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'categories' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                Browse Categories
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'about' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                About US
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'contact' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`px-4 py-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] ${
                  currentScreen === 'faq' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-gray-700'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavClick('zambeel')}
                className={`px-4 py-3.5 text-sm font-bold tracking-wide transition-colors cursor-pointer hover:text-[#FF7A00] flex items-center gap-1.5 ${
                  currentScreen === 'zambeel' ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' : 'text-orange-600'
                }`}
              >
                <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full animate-pulse" />
                <span>Zambeel Dropship</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#FF7A00] font-bold">
            <Sparkles size={14} className="animate-spin" />
            <span className="uppercase tracking-wider">Free Delivery on Orders Over $75!</span>
          </div>
        </div>
      </nav>

      {/* Mobile Live Search Bar (Visible under Logo on smaller widths) */}
      <div className="w-full bg-[#0B1E40] pb-3 px-4 block md:hidden">
        <form onSubmit={handleSubmitSearch} className="relative w-full">
          <input
            type="text"
            placeholder="Search all 2026 products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 pl-4 pr-10 py-2.5 rounded-lg text-xs"
          />
          <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 text-[#FF7A00]">
            <Search size={14} />
          </button>
        </form>
      </div>

      {/* Mobile Nav Sidebar Slide-out Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop screen */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          <div className="relative w-80 max-w-full bg-white h-full flex flex-col justify-between shadow-2xl animate-slide-right z-50 text-gray-800">
            <div>
              <div className="bg-[#0B1E40] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FF7A00] p-1 rounded">
                    <ShoppingBag size={16} />
                  </div>
                  <span className="font-extrabold text-lg select-none">FlexMart Menu</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1 text-gray-300 hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Route List */}
              <div className="p-4 flex flex-col gap-1">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2 px-2">Store Routes</p>
                <button 
                  onClick={() => handleNavClick('home')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavClick('shop')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  Store Shop
                </button>
                <button 
                  onClick={() => handleNavClick('categories')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  Categories
                </button>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  Contact
                </button>
                <button 
                  onClick={() => handleNavClick('faq')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm cursor-pointer"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => handleNavClick('track')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-gray-100 rounded-lg font-bold text-orange-600 text-sm cursor-pointer"
                >
                  🚚 Track your Order
                </button>
                <button 
                  onClick={() => handleNavClick('zambeel')} 
                  className="w-full text-left py-2.5 px-3 hover:bg-orange-50 rounded-lg font-bold text-orange-600 text-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full animate-ping" />
                  <span>📦 Zambeel Dropship Hub</span>
                </button>
              </div>

              {/* Mobile Quick categories */}
              <div className="px-4 border-t border-gray-100 pt-3">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2 px-2">Shop Categories</p>
                <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => handleCatClick(c.slug)}
                      className="text-left text-xs bg-gray-50 hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] py-2 px-2.5 rounded font-medium transition-all text-gray-600 truncate cursor-pointer"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <Phone size={12} />
                <span>Customer Care: +971 4 123 4567</span>
              </div>
              <p className="text-[10px] text-gray-400">FlexMart UAE & Pakistan Commerce © 2026</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
