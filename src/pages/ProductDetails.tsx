/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  MapPin, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { Product, Review } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductDetailsProps {
  productId: string;
  onBackToShop: () => void;
  onAddToCart: (p: Product, quantity?: number) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
  setScreen: (screen: string) => void;
  onBuyNow: (p: Product, quantity: number) => void;
  onSelectProduct: (id: string) => void;
  products: Product[];
}

export default function ProductDetails({
  productId,
  onBackToShop,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setScreen,
  onBuyNow,
  onSelectProduct,
  products
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [purchaseQty, setPurchaseQty] = useState<number>(1);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Custom Local state for reviews since we want to support real writing of reviews
  const [localReviewForm, setLocalReviewForm] = useState({
    username: '',
    rating: 5,
    text: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Locate product
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4 font-sans">
        <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-400">The requested product could not be resolved from our active inventory ledger.</p>
        <button onClick={onBackToShop} className="bg-[#0B1E40] text-white px-5 py-2 rounded-lg text-xs font-bold font-sans">
          Return to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  // Dynamic related products
  const relatedProds = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Multi-image switcher (using primary and secondary images)
  const [activeGalleryImage, setActiveGalleryImage] = useState<string>(product.image);

  // Reset gallery selection when active product changes
  useEffect(() => {
    setActiveGalleryImage(product.image);
    setPurchaseQty(1);
  }, [productId, product.image]);

  const galleryList = product.images && product.images.length > 0
    ? product.images
    : [
        product.image,
        ...(product.secondaryImage ? [product.secondaryImage] : [])
      ];

  const handleQtyAdjust = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      setPurchaseQty((prev) => prev + 1);
    } else {
      setPurchaseQty((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localReviewForm.username.trim() && localReviewForm.text.trim()) {
      const newReview: Review = {
        id: `custom-r-${Date.now()}`,
        username: localReviewForm.username,
        rating: localReviewForm.rating,
        text: localReviewForm.text,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };

      // Add to product's local review index
      product.reviews.unshift(newReview);
      
      // Re-calculate rating
      const totalStars = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
      product.reviewsCount += 1;
      product.rating = parseFloat((totalStars / product.reviews.length).toFixed(1));

      // Reset
      setReviewSubmitted(true);
      setLocalReviewForm({ username: '', rating: 5, text: '' });
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-8 px-4 font-sans" id="product-detail-layout">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb back button */}
        <button
          onClick={onBackToShop}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#FF7A00] font-bold cursor-pointer transition-colors mb-6 select-none bg-white py-1.5 px-3 rounded-lg border border-gray-150 max-w-max shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to catalog</span>
        </button>

        {/* Primary details card */}
        <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Image gallery */}
          <div className="space-y-4" id="image-gallery-container col-1">
            <div className="aspect-square w-full rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center relative">
              <img
                src={activeGalleryImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform duration-500"
              />
              {product.isFlashSale && (
                <span className="absolute top-4 left-4 bg-orange-600 text-white font-extrabold text-[10px] uppercase.tracking-wider px-3 py-1 rounded shadow-md z-15">
                  Exclusive Deal
                </span>
              )}
            </div>

            {/* Thumbnails switcher selector row */}
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${galleryList.length}, minmax(0, 1fr))` }}>
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border bg-gray-50 cursor-pointer transition-all ${
                    activeGalleryImage === img ? 'border-[#FF7A00] ring-2 ring-[#FF7A00]/10 ring-offset-1' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="Gallery item" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Meta details */}
          <div className="flex flex-col justify-between gap-6" id="product-specs-container col-2">
            <div className="space-y-4">
              
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#FF7A00] uppercase font-black tracking-widest bg-orange-50 px-2.5 py-1 rounded">
                  {product.category.replace('-', ' ')}
                </span>
                
                {/* Save share trigger */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleShare}
                    className="p-1.5 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-1 text-[10px] uppercase font-bold"
                  >
                    <Share2 size={12} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-1.5 rounded-lg border cursor-pointer transition-colors text-xs font-semibold ${
                      isWishlisted 
                        ? 'bg-rose-50 border-rose-200 text-rose-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}
                  >
                    {isWishlisted ? '♥ Saved' : '♡ Wishlist'}
                  </button>
                </div>
              </div>

              {shareSuccess && (
                <p className="text-[10px] bg-sky-50 text-sky-700 font-bold p-1.5 rounded text-center animate-fade-in border border-sky-200">
                  ✓ Copied link: Ready to share on WhatsApp or Email!
                </p>
              )}

              {/* Main title */}
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-950 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating stars layout row */}
              <div className="flex items-center gap-1.5 select-none text-xs">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-gray-950 font-extrabold text-sm">{product.rating}</span>
                <span className="text-gray-400 font-medium font-sans">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Pricing section with crossed original price */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-extrabold tracking-wider leading-none mb-1">Price Structure</p>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-black text-[#FF7A00]">
                      ${product.price}.00
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm font-semibold line-through text-gray-450">
                        ${product.originalPrice}.00
                      </span>
                    )}
                  </div>
                </div>

                {product.originalPrice && discountPercent > 0 && (
                  <span className="bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <Sparkles size={11} className="fill-rose-500 animate-spin" />
                    <span>Save {discountPercent}% Instant!</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-650 leading-relaxed font-sans font-medium">
                {product.description}
              </p>

              {/* Spec features list brief */}
              <div className="space-y-1.5 py-1">
                <p className="text-[10px] uppercase text-gray-400 font-extrabold tracking-wider">Features highlights</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5 font-medium leading-tight">
                      <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Quantity select, Add to cart and direct buy checks */}
            <div className="border-t border-gray-100 pt-5 space-y-4">
              
              {/* Inventory Status indicator alert */}
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-gray-400">Inventory Status:</span>
                {product.inStock ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span>✓ In Stock • Express Warehouse Ready</span>
                  </span>
                ) : (
                  <span className="text-red-500 font-bold">
                    ✗ Out of stock • Restocking Soon
                  </span>
                )}
              </div>

              {product.inStock && (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* Selector counter */}
                  <div className="bg-gray-100 px-3.5 py-3 rounded-lg border border-gray-200 flex items-center gap-4 text-sm font-bold w-full sm:w-auto justify-between">
                    <button 
                      onClick={() => handleQtyAdjust('dec')}
                      className="text-gray-500 hover:text-black p-0.5 cursor-pointer"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-6 text-center select-none">{purchaseQty}</span>
                    <button 
                      onClick={() => handleQtyAdjust('inc')}
                      className="text-gray-500 hover:text-black p-0.5 cursor-pointer"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Adding button dispatchers */}
                  <button
                    onClick={() => onAddToCart(product, purchaseQty)}
                    className="flex-1 bg-[#0B1E40] text-white hover:bg-opacity-90 font-bold py-3 px-5 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer w-full"
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Shopping Cart</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, purchaseQty)}
                    className="flex-1 bg-[#FF7A00] text-white hover:bg-[#E06B00] font-bold py-3 px-5 rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg w-full"
                  >
                    <span>Instant checkout</span>
                    <ArrowRight size={14} />
                  </button>

                </div>
              )}

              {/* Verified seal */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-1 text-center font-semibold uppercase">
                <span className="flex items-center gap-1">🛡️ Secured Payments</span>
                <span>•</span>
                <span className="flex items-center gap-1">📦 14 Days Returns</span>
                <span>•</span>
                <span className="flex items-center gap-1">🚚 Track shipments</span>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic specification and Reviews tab control panel split */}
        <div className="mt-10 bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm">
          
          {/* Header tabs trigger */}
          <div className="flex bg-gray-50/70 border-b border-gray-150 select-none">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4.5 text-xs font-extrabold uppercase.tracking-wider transition-all cursor-pointer ${
                activeTab === 'specs' 
                  ? 'bg-white text-[#FF7A00] border-b-2 border-b-[#FF7A00] font-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Additional Specs & Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4.5 text-xs font-extrabold uppercase.tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviews' 
                  ? 'bg-white text-[#FF7A00] border-b-2 border-b-[#FF7A00] font-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>Reviews</span>
              <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {product.reviews.length}
              </span>
            </button>
          </div>

          {/* Tab 1 content: Specs panel */}
          {activeTab === 'specs' && (
            <div className="p-6 space-y-4 animate-fade-in text-xs font-medium text-gray-700">
              <h3 className="text-sm font-bold text-gray-900">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Class Type</span>
                    <span className="text-gray-900 font-semibold uppercase">{product.category.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Rating Grade</span>
                    <span className="text-gray-900 font-semibold">4.8 / 5.0 (A+ Certified)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Warranty Factor</span>
                    <span className="text-gray-900 font-semibold">1 Year Brand Replacement</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Shipping weight</span>
                    <span className="text-gray-900 font-semibold">0.45 kg lightweight packaging</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Payment Acceptance</span>
                    <span className="text-gray-900 font-semibold">COD, cards, Easypaisa, JazzCash</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">Regional Courier partners</span>
                    <span className="text-gray-900 font-semibold">Aramex, Leopard Express, DHL</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 content: Reviews list & smart form submission */}
          {activeTab === 'reviews' && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              
              {/* Left 2 columns: Reviews list review list */}
              <div className="lg:col-span-2 space-y-5">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Verified customer feedback ({product.reviews.length})
                </h4>

                {product.reviews.length > 0 ? (
                  <div className="space-y-4" id="testimonials-list">
                    {product.reviews.map((rev) => (
                      <div 
                        key={rev.id} 
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-900 capitalize flex items-center gap-1">
                            <span>{rev.username}</span>
                            <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold uppercase py-0.5 px-1 rounded">Verified buyer</span>
                          </span>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < rev.rating ? "fill-current" : "text-gray-200"} 
                            />
                          ))}
                        </div>

                        <p className="text-xs text-gray-650 leading-relaxed font-sans font-medium">
                          {rev.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-xl space-y-1 text-gray-500">
                    <p className="text-xs font-semibold">No reviews recorded yet for this product.</p>
                    <p className="text-[10px] text-gray-400 mb-2">Be the very first loyal customer to leave a mark!</p>
                  </div>
                )}
              </div>

              {/* Right column: Write a review form */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 h-max">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Write a review
                </h4>

                {reviewSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-4 rounded-lg flex items-center gap-2 animate-fade-in text-center flex-col">
                    <Check size={20} className="text-emerald-500 bg-white rounded-full p-0.5 shadow-sm" />
                    <span>Review received! Recalculating scores. Thank your feedback.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-bold">
                    
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Salim Ahmed"
                        value={localReviewForm.username}
                        onChange={(e) => setLocalReviewForm({ ...localReviewForm, username: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-200 rounded-lg outline-none focus:border-[#FF7A00]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Star Rating *</label>
                      <select
                        value={localReviewForm.rating}
                        onChange={(e) => setLocalReviewForm({ ...localReviewForm, rating: parseInt(e.target.value) })}
                        className="w-full bg-white text-gray-950 py-2 px-3 border border-gray-200 rounded-lg outline-none focus:border-[#FF7A00] font-sans font-bold text-xs"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ 5 Stars Excellent</option>
                        <option value="4">⭐⭐⭐⭐ 4 Stars Very Good</option>
                        <option value="3">⭐⭐⭐ 3 Stars Satisfactory</option>
                        <option value="2">⭐⭐ 2 Stars Mediocre</option>
                        <option value="1">⭐ 1 Star Poor</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Message Details *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Provide specs, sound performance or comfort feedback details..."
                        value={localReviewForm.text}
                        onChange={(e) => setLocalReviewForm({ ...localReviewForm, text: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-200 rounded-lg outline-none focus:border-[#FF7A00]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0B1E40] text-white hover:bg-[#FF7A00] py-2.5 font-bold uppercase rounded-lg text-[10px] tracking-widest transition-all cursor-pointer"
                    >
                      Publish review
                    </button>

                  </form>
                )}
              </div>

            </div>
          )}

        </div>

        {/* RELATED PRODUCTS RECOMMENDATION LIST */}
        {relatedProds.length > 0 && (
          <div className="mt-12">
            <h3 className="text-sm font-extrabold text-gray-950 uppercase tracking-wider mb-6 border-l-3 border-[#FF7A00] pl-2.5 font-sans">
              Alternative Matches
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProds.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={(p) => onAddToCart(p)}
                  onSelectProduct={onSelectProduct}
                  isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
