/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MessageCircle, 
  ThumbsUp, 
  Star,
  ChevronRight,
  Gift
} from 'lucide-react';
import { categories, blogPosts } from '../data/products';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  setScreen: (screen: string) => void;
  onSelectProduct: (id: string) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
  onSelectCategory: (category: string) => void;
  products: Product[];
}

export default function Home({
  setScreen,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onSelectCategory,
  products
}: HomeProps) {
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Elevate Your 2026 Tech Suite",
      tagline: "SMART GADGETS & SOUND DROPS",
      description: "Experience the next evolution of acoustic power and wear metrics. Grab up to 40% flat discounts on headphones, smartwatches, and rings with next-day express delivery.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Flash Deals",
      category: "electronics"
    },
    {
      title: "Timeless Premium Heritage Craft",
      tagline: "VINTAGE LUXURY APPAREL & WATCHES",
      description: "Step into certified calf jackets and mechanical sapphire chronographs. Handcrafted detailing designed to outlast fast-fashion trends.",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1600&auto=format&fit=crop",
      cta: "Shop Watches",
      category: "watches"
    },
    {
      title: "Organic Nurture & Active Care",
      tagline: "BABY & BEAUTY REVOLUTION",
      description: "Nourish your skin with Vitamin C serums and keep babies safe with secure 2K crying-detection monitors. 100% organic, 100% safe materials.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Baby Care",
      category: "baby-products"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Flash Sale Countdown State
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart to simulate ticking
          return { hours: 16, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tabs layout filter
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'featured'>('trending');

  const filteredTabProducts = products.filter((p) => {
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'new') return p.isNewArrival;
    return p.isFeatured;
  });

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  const handleCatClick = (slug: string) => {
    onSelectCategory(slug);
    setScreen('shop');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCtaClick = (categorySlug: string) => {
    onSelectCategory(categorySlug);
    setScreen('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen pb-12 font-sans overflow-hidden" id="homepage-container">
      
      {/* 1. Hero Banner Slider Section */}
      <section className="relative w-full h-[360px] md:h-[550px] bg-[#0E2651] overflow-hidden" id="hero-slider">
        {/* Slides list */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Visual background image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030918]/90 via-[#0B1E40]/75 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transform scale-102 transition-transform duration-10000"
            />

            {/* Slider Text */}
            <div className="absolute inset-0 z-25 max-w-7xl mx-auto px-4 flex flex-col justify-center text-white h-full">
              <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in px-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FF7A00] text-white text-[10px] md:text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest leading-none shadow-md">
                  <Sparkles size={11} className="fill-white" />
                  {slide.tagline}
                </span>
                
                <h1 className="text-3xl md:text-5xl font-black font-sans leading-tight tracking-tight text-white drop-shadow-sm">
                  {slide.title}
                </h1>
                
                <p className="text-xs md:text-base text-gray-300 font-medium font-sans leading-relaxed line-clamp-3">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleCtaClick(slide.category)}
                    className="bg-[#FF7A00] hover:bg-[#E06B00] text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>{slide.cta}</span>
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => { setScreen('shop'); }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm px-5 py-3.5 rounded-lg border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    Browse Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Manual Slides Navigation indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-35 flex items-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3.5 h-3.5 rounded-full border-2 border-white/50 transition-all cursor-pointer ${
                currentSlide === i ? 'bg-[#FF7A00] border-[#FF7A00] w-7' : 'bg-transparent'
              }`}
              title={`Go to slide ${i+1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation (hidden on small responsive layout) */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-[#FF7A00] text-white hover:border-[#FF7A00] border border-white/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-[#FF7A00] text-white hover:border-[#FF7A00] border border-white/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex"
        >
          <ArrowRight size={16} />
        </button>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="home-categories">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-950 font-sans tracking-tight">
              Explore Featured Categories
            </h2>
            <p className="text-xs text-gray-400 mt-1">Browse through our 12 premium segments curated for you</p>
          </div>
          <button 
            onClick={() => setScreen('categories')} 
            className="text-xs font-bold text-[#FF7A00] hover:text-[#E06B00] flex items-center gap-1 cursor-pointer select-none"
          >
            <span>View All Categories</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={cat.slug}
              onClick={() => handleCatClick(cat.slug)}
              className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group relative overflow-hidden"
              id={`home-cat-card-${cat.slug}`}
            >
              <div className="absolute inset-0 bg-[#FF7A00]/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
              
              <div className="w-14 h-14 rounded-full bg-[#0B1E40]/5 group-hover:bg-[#FF7A00]/10 flex items-center justify-center text-[#0B1E40] group-hover:text-[#FF7A00] transition-colors mb-3">
                <span className="text-sm font-bold truncate p-1">
                  {idx + 1}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-[#FF7A00] transition-colors line-clamp-1 leading-snug">
                {cat.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium font-sans mt-0.5 group-hover:text-gray-500 transition-colors">
                Explore Items
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flash Sale Section with timer */}
      <section className="bg-gradient-to-r from-[#0C1E40] via-[#08152c] to-[#122b56] text-white py-14 px-4 overflow-hidden mb-12 shadow-sm" id="flash-deals-banner">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Sale details / timer */}
          <div className="max-w-lg space-y-5 flex-shrink-0 text-center lg:text-left">
            <span className="bg-[#FF7A00] text-white text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-widest shadow-md">
              ⚡ Flash Deals Sale Limited Time
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Hurry Up! Save flat <span className="text-[#FF7A00]">30% to 45%</span> on premium Smart Devices
            </h2>
            <p className="text-xs text-gray-300 font-medium leading-relaxed">
              These verified luxury items are in extremely short supply. Buy before the clock reaches zero.
            </p>

            {/* Countdown timer blocks */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 select-none">
              <div className="flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-sm text-white font-black text-lg md:text-2xl w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center shadow-lg">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] uppercase text-gray-400 font-bold mt-1 tracking-wider">Hours</span>
              </div>
              <span className="text-lg md:text-2xl font-black text-[#FF7A00] animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-sm text-white font-black text-lg md:text-2xl w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center shadow-lg">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] uppercase text-gray-400 font-bold mt-1 tracking-wider">Mins</span>
              </div>
              <span className="text-lg md:text-2xl font-black text-[#FF7A00] animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-sm text-white font-black text-lg md:text-2xl w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center shadow-lg text-[#FF7A00]">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] uppercase text-gray-400 font-bold mt-1 tracking-wider">Secs</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-xs bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-left flex items-center justify-center lg:justify-start gap-1.5 w-max mx-auto lg:mx-0">
                <Gift size={13} className="text-[#FF7A00]" />
                <span>Coupon code: <b>FLASH30</b> ready for additional checks!</span>
              </span>
            </div>
          </div>

          {/* Carousel items list */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {flashSaleProducts.slice(0, 3).map((prod) => (
              <div key={prod.id} className="relative bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl p-0 h-full">
                <ProductCard
                  product={prod}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                  isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Tabbed Selection: Trending, Best Sellers, New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="tabbed-showcase">
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <h2 className="text-2xl font-extrabold text-gray-950 font-sans tracking-tight">
            Curated For High Conversion
          </h2>
          <p className="text-xs text-gray-400 max-w-md leading-normal">
            Toggle our specialized categories of items designed for maximum aesthetic value and high ratings.
          </p>

          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg mt-3 select-none">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trending' ? 'bg-[#0B1E40] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Trending Products
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'new' ? 'bg-[#0B1E40] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'featured' ? 'bg-[#0B1E40] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Dynamic products list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTabProducts.slice(0, 8).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
              isWishlisted={wishlist.some((w) => w.id === prod.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 5. Special Marketing Banner Callouts */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6" id="promo-banners">
        {/* Banner 1: Fashion Card */}
        <div className="bg-[#1E1106] rounded-2xl relative overflow-hidden h-52 md:h-64 flex items-center px-8 text-white group shadow-sm border border-neutral-800">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop"
            alt="Fashion clothing"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-7000"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-20 space-y-2 max-w-xs">
            <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Classic Capsule Edition</span>
            <h3 className="text-xl md:text-2xl font-black">Vintage Distressed Calf Jackets</h3>
            <p className="text-[11px] text-gray-300">100% certified goat suede with classic zippers.</p>
            <button 
              onClick={() => handleCtaClick('fashion-clothing')}
              className="bg-[#FF7A00] text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded shadow-md mt-2 cursor-pointer hover:bg-[#E06B00] transition-colors"
            >
              Shop Collection
            </button>
          </div>
        </div>

        {/* Banner 2: Office and gadgets Card */}
        <div className="bg-[#05111B] rounded-2xl relative overflow-hidden h-52 md:h-64 flex items-center px-8 text-white group shadow-sm border border-neutral-900">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1555538995-7bccf9345ebb?q=80&w=600&auto=format&fit=crop"
            alt="Smart Ring"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-all duration-7000"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-20 space-y-2 max-w-xs">
            <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Futuristic Wearables</span>
            <h3 className="text-xl md:text-2xl font-black">Titanium Smart Active Rings</h3>
            <p className="text-[11px] text-gray-300">Discreet calorie tracking and HRV monitoring.</p>
            <button 
              onClick={() => handleCtaClick('smart-gadgets')}
              className="bg-[#FF7A00] text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded shadow-md mt-2 cursor-pointer hover:bg-[#E06B00] transition-colors"
            >
              Browse Smart Ring
            </button>
          </div>
        </div>
      </section>

      {/* 6. Why Choose FlexMart Usability Pitch */}
      <section className="bg-white py-14 px-4 border-t border-b border-gray-100" id="why-choose-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-1 mb-12">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-950 tracking-tight">
              Why Customers Love Shopping at FlexMart
            </h2>
            <p className="text-xs text-gray-400">Ensuring zero-risk, high-satisfaction eCommerce systems since 2026</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2.5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-100 text-[#FF7A00] flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Cash On Delivery Available</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium">
                No advanced transactions needed. Inspect your electronics or fashion parcel before handing cash.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2.5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide font-sans">100% Genuine Inventory</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium">
                We work directly with authorized brands. Every smart monitor, quartz chronograph and ring fits absolute specifications.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2.5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide font-sans">14-Days Return Policy</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-medium">
                Wrong fitting jacket size? Suede steering cover color mismatch? Return easily within 14 calendar days.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2.5 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide font-sans">24/7 WhatsApp Assistance</h4>
              <p className="text-xs text-gray-550 leading-relaxed font-bold font-sans">
                Our support bot and junior managers are available online. Talk, check active, or update address details on-demand!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Beautiful Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-14" id="testimonials">
        <div className="text-center space-y-1 mb-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-950 font-sans tracking-tight">
            Verified Customer Testimonials
          </h2>
          <p className="text-xs text-gray-400">See real-world success reviews from UAE, Dubai, Lahore, and Karachi shoppers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all space-y-4">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
            </div>
            <p className="text-xs text-gray-650 leading-relaxed italic font-medium">
              "FlexMart is exceptionally reliable! I ordered the FlexBuds Pro and they arrived in Karachi within 48 hours. The noise canceling is premium and pure. Cash on Delivery made the buy feel safe."
            </p>
            <div className="flex items-center gap-3 border-t border-gray-50 pt-3.5">
              <div className="w-9 h-9 rounded-full bg-orange-100 font-black text-[#FF7A00] flex items-center justify-center text-xs">
                AN
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  <span>Asif Najeeb</span>
                  <span className="text-emerald-600 text-[9px] font-extrabold tracking-wider bg-emerald-50 px-1 py-0.5 rounded uppercase">Verified</span>
                </h5>
                <p className="text-[10px] text-gray-450 uppercase tracking-wider">Purchased Earbuds</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all space-y-4">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
            </div>
            <p className="text-xs text-gray-650 leading-relaxed italic font-medium">
              "The automatic mechanical watch looks absolutely luxurious. The genuine calf leather strap has a rich smell and looks stunning. Exceptional pricing; customer service Zain resolved my query within 2 minutes."
            </p>
            <div className="flex items-center gap-3 border-t border-gray-50 pt-3.5">
              <div className="w-9 h-9 rounded-full bg-[#0B1E40]/10 font-black text-[#0B1E40] flex items-center justify-center text-xs">
                HL
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  <span>Halima L.</span>
                  <span className="text-emerald-600 text-[9px] font-extrabold tracking-wider bg-emerald-50 px-1 py-0.5 rounded uppercase">Verified</span>
                </h5>
                <p className="text-[10px] text-gray-450 uppercase tracking-wider">Purchased Chrono Watch</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all space-y-4">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
            </div>
            <p className="text-xs text-gray-650 leading-relaxed italic font-medium">
              "Skeptical about buying organic serums online but glow facial works amazingly on my skin. Highly lightweight blemish reduction. Will return to buy the Smart Gym dumbbells."
            </p>
            <div className="flex items-center gap-3 border-t border-gray-50 pt-3.5">
              <div className="w-9 h-9 rounded-full bg-purple-150 font-black text-purple-650 flex items-center justify-center text-xs">
                KM
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  <span>Khadija M.</span>
                  <span className="text-emerald-600 text-[9px] font-extrabold tracking-wider bg-emerald-50 px-1 py-0.5 rounded uppercase">Verified</span>
                </h5>
                <p className="text-[10px] text-gray-450 uppercase tracking-wider">Purchased Facial Serum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Creative Blog section */}
      <section className="max-w-7xl mx-auto px-4 py-8" id="blog-snippets">
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-950 font-sans tracking-tight">
              FlexMart Blog Chronicles
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Stay updated with 2026 fitness, smart tech, and lifestyle codes</p>
          </div>
          <button 
            onClick={() => setScreen('about')} 
            className="text-xs font-bold text-[#FF7A00] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Read Chronicles</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-gray-50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-103 duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3.5 left-3.5 bg-[#0B1E40] text-white text-[9px] uppercase font-bold px-2 py-1 rounded">
                  {post.date}
                </span>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase text-[#FF7A00] font-black tracking-widest">{post.author}</p>
                  <h4 className="text-xs font-bold text-gray-950 line-clamp-2 leading-snug group-hover:text-[#FF7A00] transition-colors cursor-pointer">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-3 leading-normal font-medium">
                    {post.excerpt}
                  </p>
                </div>
                
                <button
                  onClick={() => setScreen('about')}
                  className="text-[10px] font-extrabold text-gray-900 group-hover:text-[#FF7A00] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Entry</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
