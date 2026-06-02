/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (id: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  key?: string | number;
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group font-sans h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
    >
      
      {/* Visual Header / Badges */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden group">
        
        {/* Dynamic Badge Ribbons */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 select-none pointer-events-none">
          {!product.inStock && (
            <span className="bg-gray-800 text-white text-[10px] uppercase font-bold px-2 px-2.5 py-1 rounded shadow-sm">
              Sold out
            </span>
          )}
          {product.inStock && product.isFlashSale && (
            <span className="bg-[#FF7A00] text-white text-[10px] uppercase font-extrabold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
              <span>Sale</span>
              {discountPercent > 0 && <span>-{discountPercent}%</span>}
            </span>
          )}
          {product.inStock && product.isNewArrival && (
            <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded shadow-sm">
              New
            </span>
          )}
          {product.inStock && product.isTrending && (
            <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
              <Sparkles size={10} className="fill-white" />
              <span>Trending</span>
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 z-20 w-8.5 h-8.5 rounded-full bg-white/90 border border-gray-100 hover:scale-110 flex items-center justify-center transition-all shadow-md cursor-pointer ${
            isWishlisted ? 'text-[#FF7A00] hover:text-[#E06B00]' : 'text-gray-400 hover:text-[#FF7A00]'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Product Images (Shopify-like Secondary Image hovering effect!) */}
        <div 
          onClick={() => onSelectProduct(product.id)}
          className="w-full h-full cursor-pointer relative"
        >
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          
          {/* Quick Hover Overlay Trigger */}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="bg-white/95 text-gray-900 border border-gray-100 font-bold px-4 py-2 rounded-lg text-xs shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
              <Eye size={13} />
              Quick View
            </span>
          </div>
        </div>

      </div>

      {/* Visual Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-1.5" id="card-content">
        
        <div className="space-y-1">
          {/* Category Tag info */}
          <p className="text-[10px] uppercase text-gray-400 font-extrabold tracking-widest leading-none">
            {product.category.replace('-', ' ')}
          </p>

          {/* Product Name Title Link */}
          <h4
            onClick={() => onSelectProduct(product.id)}
            className="text-sm font-bold text-gray-950 font-sans tracking-tight hover:text-[#FF7A00] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h4>
        </div>

        {/* Brand Rating Star system */}
        <div className="flex items-center gap-1 pt-0.5 select-none text-xs">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-gray-950 font-bold ml-1">{product.rating}</span>
          <span className="text-gray-400 text-[10px] font-medium font-sans">({product.reviewsCount})</span>
        </div>

        {/* Bottom Price and Addition Grid row */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-50 mt-1">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 font-medium line-through decoration-[1.5px] leading-tight">
                ${product.originalPrice}.00
              </span>
            )}
            <span className="text-base font-black text-[#FF7A00] leading-none">
              ${product.price}.00
            </span>
          </div>

          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white hover:text-white p-2.5 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer group"
              title="Add to Shopping Cart"
            >
              <ShoppingCart size={15} />
            </button>
          ) : (
            <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-1.5 rounded cursor-not-allowed select-none border border-gray-200">
              No Stock
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
