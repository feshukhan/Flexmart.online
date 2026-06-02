/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  Percent, 
  CreditCard, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  User, 
  ArrowRight,
  Gift,
  AlertCircle
} from 'lucide-react';
import { Product, CartItem, Address, Order } from '../types';
import { promoCoupons } from '../data/products';

interface CheckoutProps {
  cartItems: CartItem[];
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveCartItem: (id: string) => void;
  currentUser: { name: string; email: string; phone?: string; street?: string; city?: string; country?: string } | null;
  onPlaceOrder: (order: Order) => void;
  setScreen: (screen: string) => void;
  activeCouponCode: string;
  setActiveCouponCode: (code: string) => void;
}

export default function Checkout({
  cartItems,
  onUpdateCartQty,
  onRemoveCartItem,
  currentUser,
  onPlaceOrder,
  setScreen,
  activeCouponCode,
  setActiveCouponCode
}: CheckoutProps) {
  
  // Checkout Stage Screen Switch
  const [completeOrder, setCompleteOrder] = useState<Order | null>(null);

  // Address Inputs
  const [address, setAddress] = useState<Address>({
    name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    phone: currentUser ? (currentUser.phone || '') : '',
    street: currentUser ? (currentUser.street || '') : '',
    city: currentUser ? (currentUser.city || 'Dubai') : 'Dubai',
    country: currentUser ? (currentUser.country || 'United Arab Emirates') : 'United Arab Emirates'
  });

  // Coupon apply systems
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountFixed, setDiscountFixed] = useState(0);

  // Payment Options State
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'jazzcash' | 'easypaisa' | 'bank'>('cod');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [walletNumber, setWalletNumber] = useState('');

  // Math Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const discountAmount = Math.round((subtotal * discountPercent) / 100) + discountFixed;
  const grandTotal = Math.max(0, subtotal + shipping - discountAmount);

  // Handling coupon applications
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const foundCoupon = promoCoupons.find((c) => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    
    if (!foundCoupon) {
      setCouponError('Invalid coupon code. Try FLEX2026!');
      return;
    }

    if (foundCoupon.minSpend && subtotal < foundCoupon.minSpend) {
      setCouponError(`This coupon requires a minimum spend of $${foundCoupon.minSpend}.`);
      return;
    }

    if (foundCoupon.type === 'percentage') {
      setDiscountPercent(foundCoupon.value);
      setDiscountFixed(0);
      setActiveCouponCode(foundCoupon.code);
      setCouponSuccess(`Coupon applied! ${foundCoupon.value === 0 ? 'Free Shipping' : `${foundCoupon.value}% Discount`}`);
    } else {
      setDiscountFixed(foundCoupon.value);
      setDiscountPercent(0);
      setActiveCouponCode(foundCoupon.code);
      setCouponSuccess(`Coupon applied! Flat $${foundCoupon.value} discount subtracted.`);
    }
  };

  // Compile final checkout order
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) return;

    if (!address.name || !address.email || !address.phone || !address.street || !address.city) {
      alert('Please fill in all mandatory billing address parameters before checking out.');
      return;
    }

    // Generate random Order
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `FLX-2026-${randomNum}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal,
      shipping,
      discount: discountAmount,
      total: grandTotal,
      address: { ...address },
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'Pending'
    };

    onPlaceOrder(newOrder);
    setCompleteOrder(newOrder);
  };

  // Cart item increase/decrease
  const handleQtyAdjust = (id: string, currentQty: number, action: 'inc' | 'dec') => {
    if (action === 'inc') {
      onUpdateCartQty(id, currentQty + 1);
    } else {
      if (currentQty > 1) {
        onUpdateCartQty(id, currentQty - 1);
      } else {
        onRemoveCartItem(id);
      }
    }
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10 px-4 font-sans" id="checkout-main-interface">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= ORDER SUCCESS COMPLETED STAGE ================= */}
        {completeOrder ? (
          <div className="max-w-xl mx-auto bg-white border border-gray-150 rounded-2xl p-8 text-center space-y-6 shadow-sm animate-fade-in my-8">
            <div className="w-20 h-20 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check size={40} className="stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider inline-block border border-emerald-200">
                Purchase Successful
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-snug">
                Thank you for your order, {completeOrder.address.name}!
              </h2>
              <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                Your order is being processed by our Dubai centralized fulfillment center. Expected delivery is <b>2 to 3 business days</b>.
              </p>
            </div>

            {/* Receipt Summary block */}
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-5 space-y-3.5 text-xs text-left text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-extrabold font-mono text-gray-900">{completeOrder.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-400">Recipient Contact:</span>
                <span className="font-bold text-gray-900">{completeOrder.address.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-400">Destination:</span>
                <span className="font-bold text-gray-900 truncate max-w-[200px]" title={`${completeOrder.address.street}, ${completeOrder.address.city}`}>
                  {completeOrder.address.street}, {completeOrder.address.city}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-400">Payment Gateway:</span>
                <span className="font-extrabold text-[#0B1E40]">{completeOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1.5 font-bold text-sm text-gray-950">
                <span className="text-gray-900">Paid Grand Total:</span>
                <span className="text-[#FF7A00] font-black">${completeOrder.total}.00</span>
              </div>
            </div>

            <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/25 p-4 rounded-xl text-xs text-[#E06B00] flex items-center gap-2 text-left">
              <Truck size={20} className="shrink-0" />
              <p className="font-medium">
                You can copy your Order Code <b>{completeOrder.id}</b> and track dispatch updates at any time inside our <b>Track Order</b> tab!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setScreen('shop')}
                className="flex-1 bg-[#0B1E40] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg text-xs uppercase"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setScreen('track')}
                className="flex-1 bg-white hover:bg-gray-100 text-[#0B1E40] border border-gray-200 font-bold py-3 px-4 rounded-lg text-xs uppercase"
              >
                Track delivery
              </button>
            </div>
          </div>
        ) : (
          // ================= SECURE CHECKOUT PAGE =================
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Billing Form & Payments */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Billing Credentials Card */}
              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-[#0B1E40] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <User size={16} className="text-[#FF7A00]" />
                  <span>1. Secure Billing Details</span>
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-sans">
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Recipient Full Name *</label>
                      <input
                        type="text"
                        required
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-sans">
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Mobile Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 or +92 mobile format"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Deliver City *</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold font-sans">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-gray-400 block">Detailed Delivery Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Room, apartment, building block or street name"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-[10px] text-gray-500 font-sans leading-relaxed">
                    ℹ️ Pre-fill information with single-click auto login available in the <b>Customer Portal</b> dashboard button.
                  </div>
                </div>
              </div>

              {/* Payment Gateways Selections */}
              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-[#0B1E40] uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <CreditCard size={16} className="text-[#FF7A00]" />
                  <span>2. Payment Option Gateways</span>
                </h3>

                {/* Gateways vertical block selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#FF7A00] bg-orange-50/10' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-extrabold text-gray-900 leading-none">💵 Cash On Delivery</p>
                    <p className="text-[10px] text-gray-400 mt-1">Zero upfront fees</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-[#FF7A00] bg-orange-50/10' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-extrabold text-gray-900 leading-none">💳 Cards Gateway</p>
                    <p className="text-[10px] text-gray-400 mt-1">Visa/Mastercard 3D Secure</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3.5 rounded-xl border-2 text-[#E10600] text-left cursor-pointer transition-all ${
                      paymentMethod === 'jazzcash' ? 'border-[#FF7A00] bg-orange-50/10' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-extrabold text-gray-900 leading-none">JazzCash Wallet</p>
                    <p className="text-[10px] text-[#E10600]/80 font-bold mt-1">Pakistan Mobile Wallet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3.5 rounded-xl border-2 text-teal-600 text-left cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa' ? 'border-[#FF7A00] bg-orange-50/10' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-extrabold text-gray-900 leading-none">EasyPaisa Wallet</p>
                    <p className="text-[10px] text-teal-600/80 font-bold mt-1">Pakistan Mobile Wallet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3.5 rounded-xl border-2 text-blue-600 text-left cursor-pointer transition-all ${
                      paymentMethod === 'bank' ? 'border-[#FF7A00] bg-orange-50/10' : 'border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-extrabold text-gray-900 leading-none">🏦 Bank Transfer</p>
                    <p className="text-[10px] text-gray-450 mt-1">Local UAE IBAN / PK Account</p>
                  </button>
                </div>

                {/* Sub-inputs dependent on gateway selection */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 text-xs">
                  
                  {paymentMethod === 'cod' && (
                    <p className="text-gray-500 font-medium">
                      ✓ No advance payment needed! You will pay the courier in cash once they hand over the package at your address. Ready for checkout.
                    </p>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 font-bold max-w-sm">
                      <div className="space-y-1">
                        <label className="text-gray-400 block text-[10px] uppercase">Credit Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="4242 1211 9882 1104"
                          className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-gray-400 block text-[10px] uppercase">Expiration Date *</label>
                          <input
                            type="text"
                            required
                            placeholder="MM / YY"
                            className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-400 block text-[10px] uppercase">CVC Check *</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            placeholder="***"
                            className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-200 outline-none rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                    <div className="space-y-1.5 font-bold max-w-sm">
                      <label className="text-gray-450 block text-[10px] uppercase">Register Mobile Account Wallet Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +92 300 1234567"
                        className="w-full bg-white text-gray-950 font-normal py-2 px-3 border border-gray-205 outline-none rounded-lg text-xs"
                      />
                      <p className="text-[10px] text-gray-400 font-medium leading-normal pt-1">
                        We will dispatch an immediate simulated push prompt request message to your mobile cellular network to authorize the transaction.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="space-y-2 text-gray-650 leading-relaxed font-semibold">
                      <p className="text-gray-950 font-extrabold uppercase text-[10px]">Bank Transfer Details:</p>
                      <p>UAE IBAN: <b>AE88 0300 1234 5678 9112 04</b> (Emirates NBD)</p>
                      <p>Pakistan PKR Account: <b>0123-4567-8910-1200</b> (Habib Bank Limited)</p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        * Please complete the transfer of your order's grand total, then upload or WhatsApp your invoice proof to allow fast shipping.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Right 5 Columns: Cart list & Summary calculations */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Cart checklist items review */}
              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-[#0B1E40] uppercase tracking-wider flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag size={16} className="text-[#FF7A00]" />
                    <span>My Cart Review ({cartItems.length})</span>
                  </span>
                  <button 
                    onClick={() => setScreen('shop')} 
                    className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit Cart
                  </button>
                </h3>

                {/* Items loop */}
                {cartItems.length > 0 ? (
                  <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0 font-medium text-xs">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-gray-900 truncate leading-tight">{item.product.name}</h4>
                          <p className="text-[10px] text-gray-400 font-normal leading-none mt-1">Qt: {item.quantity} x ${item.product.price}</p>
                        </div>
                        
                        {/* Adjust qty bar */}
                        <div className="flex flex-col gap-1.5 items-end leading-none shrink-0 text-right">
                          <p className="font-black text-gray-950">${item.product.price * item.quantity}</p>
                          <div className="flex gap-1">
                            <button onClick={() => handleQtyAdjust(item.product.id, item.quantity, 'dec')} className="text-gray-410 hover:text-rose-500 font-bold p-0.5 pointer font-sans">
                              -
                            </button>
                            <span className="text-[10px] text-gray-500">{item.quantity}</span>
                            <button onClick={() => handleQtyAdjust(item.product.id, item.quantity, 'inc')} className="text-gray-410 hover:text-emerald-500 font-bold p-0.5 pointer font-sans">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400 space-y-1.5 font-sans">
                    <p className="font-bold">Your shopping cart is currently empty.</p>
                    <p className="text-[10px] leading-relaxed">Add premium electronics, watches, and smart gadgets to complete order.</p>
                  </div>
                )}
              </div>

              {/* Coupon input form */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center justify-between">
                    <span>Discount Code Coupon</span>
                    <span className="text-[10px] text-emerald-600 tracking-normal capitalize font-semibold bg-emerald-50 py-0.5 px-1.5 rounded">Active code: FLEX2026</span>
                  </h4>

                  {couponError && (
                    <div className="bg-rose-50 text-rose-700 text-[10px] font-bold p-2.5 rounded-lg border border-rose-200 flex items-center gap-1.5 animate-fade-in">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}

                  {couponSuccess && (
                    <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-fade-in">
                      <Check size={12} className="shrink-0" />
                      <span>{couponSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FLASH30 or FLEX2026"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-gray-250 py-2.5 px-3 rounded-lg text-xs outline-none text-gray-900"
                    />
                    <button
                      type="submit"
                      disabled={!couponInput.trim()}
                      className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              )}

              {/* Summary checkout calculation block details */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-3.5">
                  <h3 className="text-sm font-extrabold text-[#0B1E40] uppercase tracking-wider">Purchase Totals</h3>
                  
                  <div className="space-y-2.5 text-xs font-medium text-gray-700">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Items Subtotal:</span>
                      <span className="font-extrabold text-gray-950">${subtotal}.00</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Express Shipping fee:</span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">FREE SHIPPING</span>
                      ) : (
                        <span className="font-extrabold text-gray-950">${shipping}.00</span>
                      )}
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between py-1 border-b border-gray-50 text-emerald-700">
                        <span className="font-semibold flex items-center gap-1">
                          <Percent size={11} /> Coupon Discount Applied:
                        </span>
                        <span className="font-extrabold">-${discountAmount}.00</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2.5 text-sm font-black border-t border-gray-100">
                      <span className="text-gray-900 uppercase tracking-wide">Grand Total:</span>
                      <span className="text-[#FF7A00] text-lg">${grandTotal}.00</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#FF7A00] hover:bg-[#E06B00] text-white font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <ShieldCheck size={16} />
                      <span>Place Secure Order</span>
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2.5 leading-normal">
                      By placing order, you agree to the 2026 FlexMart terms & conditions and processing cycles.
                    </p>
                  </form>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
