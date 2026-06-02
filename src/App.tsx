/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Check, 
  Heart, 
  Percent, 
  Sparkles, 
  X, 
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';

import { Product, CartItem, Order, Category } from './types';
import { products, categories } from './data/products';

// Pages & Components imports
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import InfoPages from './pages/InfoPages';
import Zambeel from './pages/Zambeel';

export default function App() {
  // Navigation Router & Selection State
  const [currentScreen, setScreen] = useState<string>('home'); // home, shop, categories, product-details, account, cart, checkout, about, contact, faq, privacy, terms, track, zambeel
  const [selectedProductId, setSelectedProductId] = useState<string>('p1');

  // Dynamic products synced with local storage (inclusive of imported dropship items)
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('flexmart_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...products, ...parsed];
      } catch (e) {
        return products;
      }
    }
    return products;
  });

  const [importedProductIds, setImportedProductIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('flexmart_custom_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        return parsed.map(p => p.id.replace('zambeel-', ''));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const handleImportProduct = (newProduct: Product) => {
    setAllProducts((prev) => {
      if (prev.some((p) => p.id === newProduct.id)) return prev;
      const updated = [...prev, newProduct];
      const customOnes = updated.filter((p) => p.id.startsWith('zambeel-'));
      localStorage.setItem('flexmart_custom_products', JSON.stringify(customOnes));
      return updated;
    });
    setImportedProductIds((prev) => {
      const coreId = newProduct.id.replace('zambeel-', '');
      if (prev.includes(coreId)) return prev;
      return [...prev, coreId];
    });
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };
  
  // Search & Categories filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string; street?: string; city?: string; country?: string } | null>(null);

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Wishlist State (Hearted items)
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Generated Orders History Log
  const [orders, setOrders] = useState<Order[]>([]);

  // Coupons
  const [activeCouponCode, setActiveCouponCode] = useState<string>('');

  // General Notification Popups State
  const [toastMessage, setToastMessage] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // 1. Add item to Shopping Cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!product.inStock) {
      triggerToast('⚠️ Sorry, this item is currently sold out!');
      return;
    }

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        triggerToast(`✓ Increased quantity of ${product.name} in cart!`);
        return prevItems.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        triggerToast(`✓ Added ${product.name} to your Shopping Cart!`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // 2. Adjust Cart Quantities
  const handleUpdateCartQty = (productId: string, qty: number) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.product.id === productId 
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // 3. Remove Cart Item
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prevItems) => {
      const removedText = prevItems.find((p) => p.product.id === productId)?.product.name || 'Item';
      triggerToast(`Removed ${removedText} from cart.`);
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  // 4. Toggle Hearted Wishlist items
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWish) => {
      const matchExists = prevWish.some((w) => w.id === product.id);
      if (matchExists) {
        triggerToast(`Removed ${product.name} from Wishlist.`);
        return prevWish.filter((w) => w.id !== product.id);
      } else {
        triggerToast(`✓ Added ${product.name} to Wishlist!`);
        return [...prevWish, product];
      }
    });
  };

  const handleRemoveWishlist = (product: Product) => {
    setWishlist((prevWish) => prevWish.filter((w) => w.id !== product.id));
    triggerToast(`Removed ${product.name} from Wishlist.`);
  };

  // 5. Place order checkout logs
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCartItems([]); // Clear cart
    setActiveCouponCode('');
    triggerToast(`✓ Success! Order ${newOrder.id} placed.`);
  };

  // 6. Direct rapid checkout trigger
  const handleBuyNow = (product: Product, quantity: number) => {
    // Inject directly into cart
    setCartItems([{ product, quantity }]);
    setScreen('checkout');
    triggerToast(`✓ Loading Checkout for ${product.name}!`);
  };

  // 7. General search submit router
  const handleSearchSubmit = () => {
    // Navigate to shop with the query unmodified
    setScreen('shop');
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setScreen('shop');
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-screen bg-gray-50/20 text-gray-800 selection:bg-[#FF7A00] selection:text-white" id="flexmart-app-body">
      
      {/* Dynamic Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-[#0B1E40] text-white text-xs font-bold px-5 py-3.5 rounded-full shadow-2xl z-55 flex items-center gap-2 border border-blue-900 animate-slide-down">
          <span className="w-2 h-2 bg-[#FF7A00] rounded-full animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header element */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        cartItemsCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        wishlistItemsCount={wishlist.length}
        currentUser={currentUser}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onSearchSubmit={handleSearchSubmit}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 w-full relative z-10" id="main-content-flow">
        
        {/* Route: Home */}
        {currentScreen === 'home' && (
          <Home
            setScreen={setScreen}
            onSelectProduct={(id) => { setSelectedProductId(id); setScreen('product-details'); }}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onSelectCategory={handleSelectCategory}
            products={allProducts}
          />
        )}

        {/* Route: Shop Catalog */}
        {currentScreen === 'shop' && (
          <Shop
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onSelectProduct={(id) => { setSelectedProductId(id); setScreen('product-details'); }}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            products={allProducts}
          />
        )}

        {/* Route: Dedicated Categories Index page */}
        {currentScreen === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in font-sans">
            <div className="border-b border-gray-150 pb-5 mb-8">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Full Categories Ledger</h1>
              <p className="text-xs text-gray-400 mt-1">Explore all 12 professional WooCommerce segments available at FlexMart UAE & Pakistan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => {
                // Count items in category
                const amt = allProducts.filter((p) => p.category === cat.slug).length;

                return (
                  <div 
                    key={cat.slug}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="group bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden hover:border-orange-100 hover:shadow-xl transition-all cursor-pointer h-48 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/40 to-transparent z-10" />
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform duration-500 group-hover:scale-104"
                    />

                    <div className="absolute bottom-4 left-4 z-20 text-white space-y-1">
                      <h4 className="text-base font-black tracking-wide font-sans">{cat.name}</h4>
                      <p className="text-[10px] uppercase font-semibold text-[#FF7A00] tracking-widest">
                        Browse Collection • {amt > 0 ? `${amt} Items` : 'New Drops'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Route: Product specifications & details view */}
        {currentScreen === 'product-details' && (
          <ProductDetails
            productId={selectedProductId}
            onBackToShop={() => setScreen('shop')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setScreen={setScreen}
            onBuyNow={handleBuyNow}
            onSelectProduct={setSelectedProductId}
            products={allProducts}
          />
        )}

        {/* Route: Account Registration & Portal */}
        {currentScreen === 'account' && (
          <Account
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            orders={orders}
            wishlist={wishlist}
            onRemoveWishlist={handleRemoveWishlist}
            onAddToCart={handleAddToCart}
            setScreen={setScreen}
            onSelectProduct={setSelectedProductId}
          />
        )}

        {/* Route: Zambeel Dropship Management Portal */}
        {currentScreen === 'zambeel' && (
          <Zambeel
            orders={orders}
            onUpdateOrder={handleUpdateOrder}
            onImportProduct={handleImportProduct}
            importedProductIds={importedProductIds}
            allProducts={allProducts}
            triggerToast={triggerToast}
          />
        )}

        {/* Route: Shopping Basket Details screen */}
        {currentScreen === 'cart' && (
          <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in font-sans">
            <div className="border-b border-gray-150 pb-5 mb-8">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Shopping Bag Details</h1>
              <p className="text-xs text-gray-400 mt-1">Review item metrics, adjust coupon multipliers and checkout securely.</p>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* List of items */}
                <div className="lg:col-span-8 bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 font-medium text-xs justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 
                            onClick={() => { setSelectedProductId(item.product.id); setScreen('product-details'); }}
                            className="font-bold text-gray-950 hover:text-[#FF7A00] truncate max-w-[200px] cursor-pointer"
                          >
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{item.product.category.replace('-', ' ')}</p>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 bg-gray-100 py-1.5 px-3 rounded-lg border border-gray-200">
                        <button onClick={() => handleUpdateCartQty(item.product.id, Math.max(1, item.quantity - 1))} className="text-gray-500 hover:text-[#FF7A00] font-bold text-sm cursor-pointer p-0.5">-</button>
                        <span className="w-5 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => handleUpdateCartQty(item.product.id, item.quantity + 1)} className="text-gray-500 hover:text-[#FF7A00] font-bold text-sm cursor-pointer p-0.5">+</button>
                      </div>

                      {/* Calculations total */}
                      <div className="text-right">
                        <p className="font-extrabold text-[#FF7A00] text-sm">${item.product.price * item.quantity}.00</p>
                        <button 
                          onClick={() => handleRemoveCartItem(item.product.id)}
                          className="text-[10px] text-rose-500 hover:text-rose-700 font-bold flex items-center gap-0.5 mt-1 cursor-pointer"
                        >
                          <Trash2 size={11} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals sidebar summaries */}
                <div className="lg:col-span-4 bg-white border border-gray-150 rounded-xl p-5 shadow-sm space-y-4">
                  <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">Checkout Estimator</h4>
                  
                  <div className="space-y-2 pb-3 border-b border-gray-100 text-xs font-medium text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Items:</span>
                      <span className="text-gray-900 font-bold">{cartItems.reduce((sum, i) => sum + i.quantity, 0)} Units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Items value sum:</span>
                      <span className="text-gray-900 font-extrabold">${cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0)}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreen('checkout')}
                    className="w-full bg-[#FF7A00] hover:bg-[#E06B00] text-white font-extrabold py-3.5 px-4 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={14} />
                  </button>

                  <p className="text-[9px] text-gray-420 text-center leading-normal">
                    💡 Free delivery thresholds are automatically calculated for cart totals above $75!
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-gray-150 rounded-xl max-w-sm mx-auto space-y-4 px-6 shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#FF7A00]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Your Basket is Vacant</h3>
                <p className="text-xs text-gray-500 leading-normal max-w-xs mx-auto">
                  Take a stroll along our catalog or categories, select high-end earbuds, chronographs, and organic serums to fill the cart.
                </p>
                <button
                  onClick={() => setScreen('shop')}
                  className="bg-[#0B1E40] text-white hover:bg-[#FF7A00] font-bold text-xs px-5 py-3 rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-md inline-block"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* Route: Secure Checkout and Payments Gate */}
        {currentScreen === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveCartItem}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceOrder}
            setScreen={setScreen}
            activeCouponCode={activeCouponCode}
            setActiveCouponCode={setActiveCouponCode}
          />
        )}

        {/* Supplementary pages elements */}
        {['about', 'contact', 'faq', 'privacy', 'terms', 'track'].includes(currentScreen) && (
          <InfoPages
            subPage={currentScreen as 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'track'}
            orders={orders}
          />
        )}

      </main>

      {/* Floating live WhatsApp chat widgets */}
      <WhatsAppButton />

      {/* Footer section element */}
      <Footer
        setScreen={setScreen}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
