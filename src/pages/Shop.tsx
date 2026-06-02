/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  Search, 
  ChevronDown, 
  RotateCcw, 
  SlidersHorizontal, 
  Star, 
  CheckSquare, 
  Square,
  AlertCircle
} from 'lucide-react';
import { categories } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (id: string) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
  products: Product[];
}

export default function Shop({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
  wishlist,
  products
}: ShopProps) {
  // Filters State
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Clear all filters callback
  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(400);
    setSelectedRating(null);
    setOnlyInStock(false);
    onSelectCategory('');
    setSearchQuery('');
    setSortBy('default');
  };

  // Perform dynamic filtering using useMemo for performance
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query filter
        if (searchQuery.trim()) {
          const match = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
          if (!match) return false;
        }

        // Category filter
        if (selectedCategory && p.category !== selectedCategory) {
          return false;
        }

        // Price range filter
        if (p.price < minPrice || p.price > maxPrice) {
          return false;
        }

        // Ratings filter
        if (selectedRating && p.rating < selectedRating) {
          return false;
        }

        // In stock filter
        if (onlyInStock && !p.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        // Default
        return 0;
      });
  }, [searchQuery, selectedCategory, minPrice, maxPrice, selectedRating, onlyInStock, sortBy]);

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-8 px-4 font-sans" id="shop-container">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title section */}
        <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-990 tracking-tight flex items-center gap-2">
              <span>Catalog Shop</span>
              {selectedCategory && (
                <span className="text-xs bg-[#FF7A00]/10 text-[#FF7A00] font-black px-2.5 py-1 rounded-full uppercase">
                  {selectedCategory.replace('-', ' ')}
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Showing {filteredProducts.length} premium verified items ready for delivery
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Sorting trigger dropdown */}
            <div className="flex items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-xs font-bold rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#FF7A00] focus:outline-none cursor-pointer"
              >
                <option value="default">Features & Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highly Customer Rated</option>
              </select>
            </div>

            {/* Mobile filters toggler */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden bg-white hover:bg-gray-150 border border-gray-200 p-2 rounded-lg flex items-center justify-center text-gray-700 cursor-pointer"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Live Search bar feed indicator if search results match */}
        {searchQuery && (
          <div className="bg-white p-3 border border-gray-100 rounded-lg text-xs text-gray-600 mb-6 flex items-center justify-between shadow-sm">
            <span>
              Searching: <b className="text-gray-900">"{searchQuery}"</b>
            </span>
            <button 
              onClick={() => setSearchQuery('')} 
              className="hover:text-red-500 font-bold flex items-center gap-1 cursor-pointer text-[10px] uppercase.tracking-wider"
            >
              Clear Search <X size={12} />
            </button>
          </div>
        )}

        <div className="flex gap-8 items-start">
          
          {/* FILTER SIDEBAR (Desktop) */}
          <aside className="w-64 shrink-0 bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-6 hidden lg:block" id="desktop-filters-sidebar">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
              <span className="font-extrabold text-[#0B1E40] text-sm flex items-center gap-1.5 uppercase tracking-wide">
                <Filter size={14} className="text-[#FF7A00]" />
                Filter Products
              </span>
              {(selectedCategory || minPrice > 0 || maxPrice < 400 || selectedRating || onlyInStock || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5 cursor-pointer uppercase transition-colors"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              )}
            </div>

            {/* Category selection */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Categories</h4>
              <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => onSelectCategory('')}
                  className={`text-left text-xs py-1.5 px-2 rounded font-medium flex items-center justify-between transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-[#FF7A00]/10 text-[#FF7A00] font-bold' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] font-bold text-gray-400">Total</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`text-left text-xs py-1.5 px-2 rounded font-medium flex items-center justify-between transition-colors capitalize ${
                      selectedCategory === cat.slug 
                        ? 'bg-[#FF7A00]/10 text-[#FF7A00] font-bold' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Filter */}
            <div className="space-y-3 pt-3 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Price Range</h4>
                <span className="text-xs font-bold text-[#FF7A00]">${minPrice} - ${maxPrice}</span>
              </div>
              
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max="400"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>Min: $0</span>
                  <span>Max: $400</span>
                </div>
              </div>
            </div>

            {/* Star Ratings Filter */}
            <div className="space-y-2 pt-3 border-t border-gray-50">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Customer Ratings</h4>
              <div className="flex flex-col gap-1.5">
                {[4.5, 4.0, 3.5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(selectedRating === star ? null : star)}
                    className={`flex items-center gap-1.5 text-xs text-left py-1 px-1.5 rounded transition-all cursor-pointer ${
                      selectedRating === star ? 'bg-[#FF7A00]/10 font-bold text-[#FF7A00]' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center text-amber-500">
                      <Star size={11} className="fill-current" />
                    </div>
                    <span>{star}+ Stars</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Switcher */}
            <div className="pt-3 border-t border-gray-50 space-y-2">
              <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Availability</h4>
              <button
                type="button"
                onClick={() => setOnlyInStock(!onlyInStock)}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 cursor-pointer py-1 block w-full text-left"
              >
                {onlyInStock ? (
                  <CheckSquare size={16} className="text-[#FF7A00] fill-[#FF7A00]/10" />
                ) : (
                  <Square size={16} className="text-gray-300" />
                )}
                <span>In Stock Only</span>
              </button>
            </div>

          </aside>

          {/* MAIN PRODUCT GRID */}
          <div className="flex-1">
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={onAddToCart}
                    onSelectProduct={onSelectProduct}
                    isWishlisted={wishlist.some((w) => w.id === p.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100 max-w-xl mx-auto space-y-4 shadow-sm animate-fade-in mt-10">
                <div className="w-16 h-16 bg-orange-100 text-[#FF7A00] rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Products Match Your Filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  We couldn't locate any items matching your exact specifications. Try relaxing your category searches, adjusting the pricing boundary, or resetting your choices.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md inline-block cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE FILTER OVERLAY DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileFiltersOpen(false)} 
          />
          <div className="relative w-80 max-w-full bg-white h-full flex flex-col justify-between shadow-2xl animate-slide-right z-50 text-gray-800">
            
            <div className="overflow-y-auto flex-1">
              <div className="bg-[#0B1E40] p-4 text-white flex items-center justify-between">
                <span className="font-extrabold text-sm flex items-center gap-1">
                  <Filter size={14} />
                  <span>Filters</span>
                </span>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)} 
                  className="text-gray-400 hover:text-white p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Category select block */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Categories</h4>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    <button
                      onClick={() => { onSelectCategory(''); setIsMobileFiltersOpen(false); }}
                      className={`text-left text-xs py-2 px-2.5 rounded font-medium truncate ${
                        selectedCategory === '' ? 'bg-[#FF7A00]/15 text-[#FF7A00] font-bold' : 'bg-gray-50 text-gray-650'
                      }`}
                    >
                      All Items
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => { onSelectCategory(cat.slug); setIsMobileFiltersOpen(false); }}
                        className={`text-left text-xs py-2 px-2.5 rounded font-medium truncate capitalize ${
                          selectedCategory === cat.slug ? 'bg-[#FF7A00]/15 text-[#FF7A00] font-bold' : 'bg-gray-50 text-gray-650'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price block */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Price Range</h4>
                    <span className="text-xs font-bold text-[#FF7A00]">${minPrice} - ${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 cursor-pointer accent-[#FF7A00]"
                  />
                </div>

                {/* Star rating selection */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Ratings</h4>
                  <div className="flex gap-2">
                    {[4.5, 4.0, 3.5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSelectedRating(selectedRating === star ? null : star)}
                        className={`text-xs py-1.5 px-3 rounded-lg border font-semibold flex items-center gap-1 cursor-pointer ${
                          selectedRating === star 
                            ? 'bg-[#FF7A00]/10 border-[#FF7A00] text-[#FF7A00]' 
                            : 'bg-white border-gray-200 text-gray-650'
                        }`}
                      >
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span>{star}+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock switcher */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase text-gray-900 tracking-wider">Availability</h4>
                  <button
                    onClick={() => setOnlyInStock(!onlyInStock)}
                    className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-100 p-2.5 rounded-lg max-w-max cursor-pointer"
                  >
                    {onlyInStock ? (
                      <CheckSquare size={16} className="text-[#FF7A00]" />
                    ) : (
                      <Square size={16} className="text-gray-300" />
                    )}
                    <span>Show In Stock Items Only</span>
                  </button>
                </div>
              </div>

            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold py-3 rounded-lg text-center cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 bg-[#0B1E40] hover:bg-[#FF7A00] text-white text-xs font-bold py-3 rounded-lg text-center cursor-pointer"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
