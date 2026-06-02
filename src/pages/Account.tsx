/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Lock, 
  Unlock, 
  LogOut, 
  Check, 
  Truck, 
  Compass, 
  Mail, 
  Phone, 
  Gift,
  ArrowRight
} from 'lucide-react';
import { Product, Order } from '../types';

interface AccountProps {
  currentUser: { name: string; email: string; phone?: string; street?: string; city?: string; country?: string } | null;
  setCurrentUser: (user: { name: string; email: string; phone?: string; street?: string; city?: string; country?: string } | null) => void;
  orders: Order[];
  wishlist: Product[];
  onRemoveWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  setScreen: (screen: string) => void;
  onSelectProduct: (id: string) => void;
}

export default function Account({
  currentUser,
  setCurrentUser,
  orders,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  setScreen,
  onSelectProduct
}: AccountProps) {
  // Tabs layout inside dashboard
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'address' | 'wishlist'>('orders');

  // Form states
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: 'john@example.com', password: 'password123' });
  const [regForm, setRegForm] = useState({
    name: '', email: '', phone: '', street: '', city: 'Dubai', country: 'United Arab Emirates', password: ''
  });
  const [actionSuccess, setActionSuccess] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email.trim()) {
      setCurrentUser({
        name: 'John Doe',
        email: loginForm.email,
        phone: '+971 50 123 4567',
        street: 'DIFC Gate Avenue, Block B',
        city: 'Dubai',
        country: 'United Arab Emirates'
      });
      setActionSuccess('✓ Welcome back, John Doe!');
      setTimeout(() => setActionSuccess(''), 4000);
    }
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regForm.name && regForm.email) {
      setCurrentUser({
        name: regForm.name,
        email: regForm.email,
        phone: regForm.phone,
        street: regForm.street,
        city: regForm.city,
        country: regForm.country
      });
      setActionSuccess('✓ Account registered successfully!');
      setTimeout(() => setActionSuccess(''), 4000);
    }
  };

  const handleQuickDemoLogin = () => {
    setCurrentUser({
      name: 'Salim Baloch',
      email: 'salim.baloch@flexmart.ae',
      phone: '+92 300 1234567',
      street: ' DHA Phase 6, Main Boulevard',
      city: 'Karachi',
      country: 'Pakistan'
    });
    setActionSuccess('✓ Logged in via Fast Demo!');
    setTimeout(() => setActionSuccess(''), 4500);
  };

  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      setActionSuccess('✓ Saved billing elements safely.');
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setActionSuccess('Logged out safely.');
    setScreen('home');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10 px-4 font-sans" id="account-wrapper">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper title */}
        <div className="border-b border-gray-150 pb-5 mb-8">
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            <User className="text-[#FF7A00]" />
            <span>Customer Portal</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Manage registration parameters, coupon spend logs, and active order dispatches.</p>
        </div>

        {actionSuccess && (
          <div className="max-w-xl mx-auto mb-6 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-bold p-3.5 rounded-lg flex items-center gap-2 animate-fade-in shadow-xs justify-center">
            <Check size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* ================= GUEST ACCESS (Login / signup splits) ================= */}
        {!currentUser ? (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
            
            {/* Split 1: Left Login Panel */}
            <div className="p-8 space-y-6">
              <div>
                <span className="text-[10px] uppercase text-[#FF7A00] font-black tracking-wider block">Registered shoppers</span>
                <h3 className="text-lg font-black text-gray-900 leading-snug">Sign in to FlexMart</h3>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-gray-400 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full bg-white text-gray-950 font-normal py-2.5 px-3.5 border border-gray-250 rounded-lg outline-none focus:border-[#FF7A00] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-gray-400">
                    <label>Password *</label>
                    <span className="text-[10px] hover:text-[#FF7A00] cursor-pointer">Forget?</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-white text-gray-950 font-normal py-2.5 px-3.5 border border-gray-250 rounded-lg outline-none focus:border-[#FF7A00] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B1E40] text-white hover:bg-[#FF7A00] py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Verify credentials
                </button>
              </form>

              {/* Fast Bypass Demo trigger */}
              <div className="border-t border-gray-150 pt-4 text-center">
                <p className="text-[10px] text-gray-400 font-medium mb-2">Want to save time filling addresses?</p>
                <button
                  onClick={handleQuickDemoLogin}
                  className="bg-orange-50 hover:bg-[#FF7A00]/10 text-[#FF7A00] font-extrabold text-[10px] uppercase tracking-wider py-2 px-4 rounded-lg transition-all border border-orange-200/50 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Unlock size={12} />
                  <span>Execute demo auto-login</span>
                </button>
              </div>
            </div>

            {/* Split 2: Right registration Panel */}
            <div className="p-8 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-150 space-y-6">
              <div>
                <span className="text-[10px] uppercase text-[#FF7A00] font-black tracking-wider block">Joining is FREE</span>
                <h3 className="text-lg font-black text-gray-900 leading-snug">Create A Buyer Profile</h3>
              </div>

              <form onSubmit={handleRegSubmit} className="space-y-3.5 text-xs font-bold">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Baloch"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">Email ID *</label>
                    <input
                      type="email"
                      required
                      placeholder="salim@example.ae"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 1234567"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">Secure Password *</label>
                    <input
                      type="password"
                      required
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 text-[10px] block">Street Address Details *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apartment, building or block"
                    value={regForm.street}
                    onChange={(e) => setRegForm({ ...regForm, street: e.target.value })}
                    className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dubai or Karachi"
                      value={regForm.city}
                      onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 text-[10px] block">Country *</label>
                    <input
                      type="text"
                      required
                      value={regForm.country}
                      onChange={(e) => setRegForm({ ...regForm, country: e.target.value })}
                      className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-250 rounded-lg outline-none text-xs animate-pulse text-gray-500 bg-gray-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF7A00] hover:bg-[#E06B00] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md mt-2"
                >
                  Register Account
                </button>
              </form>
            </div>

          </div>
        ) : (
          // ================= AUTHENTICATED ACCESS (Dashboard) =================
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Dashboard Navigation Controls */}
            <aside className="bg-white rounded-xl border border-gray-150 p-5 space-y-4 shadow-sm h-max">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-11 h-11 bg-[#FF7A00]/10 rounded-full flex items-center justify-center font-black text-[#FF7A00] border border-orange-200">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-gray-900 truncate leading-tight">{currentUser.name}</h4>
                  <p className="text-[10px] text-gray-400 truncate leading-none mt-1">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 select-none text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('orders')}
                  className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeSubTab === 'orders' ? 'bg-[#0B1E40] text-white' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>My Orders ({orders.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('address')}
                  className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeSubTab === 'address' ? 'bg-[#0B1E40] text-white' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <MapPin size={14} />
                  <span>Shipping Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('wishlist')}
                  className={`w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeSubTab === 'wishlist' ? 'bg-[#0B1E40] text-white' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Heart size={14} />
                  <span>My Wishlist ({wishlist.length})</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="w-full text-left py-2.5 px-3 rounded-lg flex items-center gap-2.5 text-red-500 hover:bg-rose-50 cursor-pointer border-t border-gray-100 mt-2"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Dashboard Content Display window */}
            <div className="lg:col-span-3 bg-white border border-gray-150 rounded-xl p-6 shadow-sm min-h-[400px]">
              
              {/* Box 1: Orders ledger list */}
              {activeSubTab === 'orders' && (
                <div className="space-y-6 animate-fade-in text-xs font-medium">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">My Purchases History</h3>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div key={ord.id} className="border border-gray-150 rounded-xl overflow-hidden shadow-xs">
                          {/* Top order summary header */}
                          <div className="bg-gray-50 p-4 border-b border-gray-150 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                            <div className="flex flex-wrap gap-x-5 gap-y-1">
                              <div>
                                <span className="text-gray-400 font-medium font-sans">ORDER ID</span>
                                <p className="font-extrabold text-[#0B1E40] font-mono mt-0.5">{ord.id}</p>
                              </div>
                              <div>
                                <span className="text-gray-400 font-medium font-sans">PLACED ON</span>
                                <p className="font-bold text-gray-900 mt-0.5">{ord.date}</p>
                              </div>
                              <div>
                                <span className="text-gray-400 font-medium font-sans">TOTAL VALUE</span>
                                <p className="font-extrabold text-[#FF7A00] mt-0.5">${ord.total}.00</p>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider inline-block text-white" 
                                style={{
                                  backgroundColor: 
                                    ord.status === 'Delivered' ? '#16a34a' : 
                                    ord.status === 'Cancelled' ? '#ef4444' : 
                                    ord.status === 'Shipped' ? '#2563eb' : '#f97316'
                                }}
                              >
                                {ord.status}
                              </span>
                            </div>
                          </div>

                          {/* Order item details */}
                          <div className="p-4 bg-white space-y-3.5">
                            {ord.items.map((item) => (
                              <div key={item.product.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                                  <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-bold text-gray-900 truncate">{item.product.name}</h5>
                                  <p className="text-[10px] text-gray-450 font-normal leading-none mt-1">Qt: {item.quantity} x Price: ${item.product.price}</p>
                                </div>
                                <button
                                  onClick={() => { onSelectProduct(item.product.id); setScreen('product-details'); }}
                                  className="text-[10px] font-bold text-blue-600 hover:underline shrink-0"
                                >
                                  View Item
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400 space-y-3.5 max-w-sm mx-auto">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-500">
                        <ShoppingBag size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-gray-800">You have no orders yet.</p>
                        <p className="text-[11px] leading-relaxed">Once you buy from our rich catalogs, you can inspect your live delivery schedules and statuses here.</p>
                      </div>
                      <button
                        onClick={() => setScreen('shop')}
                        className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white text-[11px] font-bold px-4 py-2.5 rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer uppercase"
                      >
                        <span>Start Shopping</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* Box 2: Address Profile manager */}
              {activeSubTab === 'address' && (
                <div className="space-y-6 animate-fade-in text-xs font-bold">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Billing Address</h3>
                  
                  <form onSubmit={handleUpdateAddress} className="space-y-4 max-w-xl text-xs font-bold">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-gray-400 block">Deliver Name *</label>
                        <input
                          type="text"
                          required
                          value={currentUser.name}
                          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                          className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 block">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          value={currentUser.phone || ''}
                          onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                          className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Street/Villa / apartment *</label>
                      <input
                        type="text"
                        required
                        value={currentUser.street || ''}
                        onChange={(e) => setCurrentUser({ ...currentUser, street: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-gray-400 block">City *</label>
                        <input
                          type="text"
                          required
                          value={currentUser.city || ''}
                          onChange={(e) => setCurrentUser({ ...currentUser, city: e.target.value })}
                          className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 block">Country *</label>
                        <input
                          type="text"
                          required
                          readOnly
                          value={currentUser.country || ''}
                          className="w-full bg-gray-100 text-gray-500 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg transition-all cursor-pointer text-[10px]"
                    >
                      Update address
                    </button>
                  </form>
                </div>
              )}

              {/* Box 3: Wishlist details */}
              {activeSubTab === 'wishlist' && (
                <div className="space-y-6 animate-fade-in text-xs font-medium">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">My Wishlist Saved Elements</h3>

                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((prod) => (
                        <div key={prod.id} className="p-4 border border-gray-150 rounded-xl flex items-center justify-between gap-3 bg-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                              <img src={prod.image} alt={prod.name} referrerPolicy="no-referrer" className="w-full h-full object-cover animate-fade-in" />
                            </div>
                            <div>
                              <h5 
                                onClick={() => { onSelectProduct(prod.id); setScreen('product-details'); }}
                                className="font-bold text-gray-950 truncate max-w-[150px] cursor-pointer hover:text-[#FF7A00]"
                              >
                                {prod.name}
                              </h5>
                              <p className="text-[10px] text-[#FF7A00] font-black mt-0.5">${prod.price}.00</p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 items-end">
                            <button
                              onClick={() => onAddToCart(prod)}
                              className="bg-[#FF7A00] text-white hover:bg-[#E06B00] text-[9px] uppercase font-bold px-3 py-1.5 rounded transition-all cursor-pointer"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => onRemoveWishlist(prod)}
                              className="text-rose-500 hover:text-rose-700 text-[10px] font-bold cursor-pointer"
                            >
                              Purge X
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400 space-y-3 max-w-sm mx-auto">
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-[#FF7A00]">
                        <Heart className="fill-current" size={24} />
                      </div>
                      <p className="font-bold text-gray-800">Your wishlist is currently bare.</p>
                      <p className="text-[11px]">Save products with heart icons while browsing our premium catalogs to buy them later.</p>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
