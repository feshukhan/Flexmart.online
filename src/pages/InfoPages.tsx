/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  PhoneCall, 
  Mail, 
  HelpCircle, 
  ChevronDown, 
  Truck, 
  Compass, 
  Send, 
  FileText, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Order } from '../types';

interface InfoPagesProps {
  subPage: 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'track';
  orders: Order[];
}

export default function InfoPages({ subPage, orders }: InfoPagesProps) {
  
  // FAQs Toggles Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const faqs = [
    {
      q: "Does FlexMart support Cash On Delivery (COD) in Pakistan or UAE?",
      a: "Yes! Absolutely. We are proud to support 100% stress-free Cash on Delivery across Dubai, Abu Dhabi, Sharjah, Karachi, Lahore, Islamabad, and all major metropolitan centers. You only pay when you touch the parcel."
    },
    {
      q: "How can I apply coupons like FLEX2026 or FLASH30?",
      a: "Applying discount codes is simple! In the Checkout screen, locate the 'Discount Code Coupon' section, input your specific promo code in uppercase, and click 'Apply'. The flat 20% discount or shipping deduction will calculate immediately."
    },
    {
      q: "What is your refund guarantee and return logistics?",
      a: "We offer a flexible 14-days return policy. If you receive merchandise, smart ring, or earbud that is not working as expected or fabric mismatch, simply ping our WhatsApp Live Support team and our logistics partner will execute next-day pickup."
    },
    {
      q: "Can I pay using mobile wallets like JazzCash or Easypaisa?",
      a: "Yes! For Pakistani shoppers, under the checkout payment gate select 'JazzCash' or 'Easypaisa'. Enter your wallet’s cell number, and you will receive an automated cellular notification prompt to type your mobile PIN to complete the transaction safely."
    }
  ];

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', msg: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.msg) {
      setContactSuccess(true);
      setContactForm({ name: '', email: '', subject: '', msg: '' });
      setTimeout(() => setContactSuccess(false), 5000);
    }
  };

  // Order Search Tracker state
  const [trackQuery, setTrackQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Locate order in state
    const matched = orders.find((o) => o.id.toUpperCase() === trackQuery.trim().toUpperCase());
    
    if (matched) {
      setSearchedOrder(matched);
    } else {
      // Mock tracking if they enter a random test target text
      if (trackQuery.trim().toUpperCase().startsWith('FLX-')) {
        const mockOrder: Order = {
          id: trackQuery.trim().toUpperCase(),
          date: 'May 30, 2026',
          items: [],
          subtotal: 129,
          shipping: 0,
          discount: 0,
          total: 129,
          paymentMethod: 'COD',
          address: { name: 'Demo Customer', email: '', phone: '', street: '', city: 'Dubai', country: 'UAE' },
          status: 'Shipped' // Set fake progress for realistic simulation!
        };
        setSearchedOrder(mockOrder);
      } else {
        setSearchedOrder(null);
      }
    }
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen py-10 px-4 font-sans" id="info-layout-wrapper">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
        
        {/* ================= ABOUT US PAGE ================= */}
        {subPage === 'about' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium text-gray-700">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Establishing digital standards in 2026</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none">About Company: FlexMart</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3.5 leading-relaxed">
                <h3 className="text-sm font-extrabold text-gray-900 tracking-wide">Everything You Need, All in One Place!</h3>
                <p>
                  FlexMart began with a single-minded devotion: clearing the fragmented clutter in the regional eCommerce space in Pakistan & UAE. By creating an automated, certified direct-to-warehouse pipeline, we completely eliminate the middle-merchant risk.
                </p>
                <p>
                  Whether you are looking for military-grade liquid silicone cases, handcrafted mahogany organic organizers, automated vacuum sweepers or classic mechanical speed watches, we ensure verified quality checks with real-time customer care feedback.
                </p>
              </div>
              <div className="aspect-video w-full rounded-xl bg-gray-100 overflow-hidden border border-gray-100 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop" 
                  alt="FlexMart Headquarters Office" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Counters corporate section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-center select-none pt-6">
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-black text-[#FF7A00]">98,000+</p>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Shipped Orders</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-black text-[#FF7A00]">4.8 ⭐</p>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Client Ratings</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-black text-[#FF7A00]">2 Hours</p>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Average support resolution</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl md:text-2xl font-black text-[#FF7A00]">100%</p>
                <p className="text-[10px] uppercase text-gray-400 font-bold">Authorized inventory</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTACT US PAGE ================= */}
        {subPage === 'contact' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium text-gray-700">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Reach our support desks directly</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none animate-scale">Contact Customer Care</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Contact Information panel */}
              <div className="md:col-span-4 p-5 bg-[#0B1E40] text-gray-300 rounded-xl border border-blue-900/40 space-y-5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider pb-2 border-b border-blue-900/60">
                  Fulfillment Desks
                </h4>

                <div className="space-y-3.5 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#FF7A00] shrink-0 mt-0.5" />
                    <span>Level 15, Marina Heights Tower, Dubai Marina, United Arab Emirates</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <PhoneCall size={16} className="text-[#FF7A00] shrink-0 mt-0.5" />
                    <span>+971 4 123 4567<br />+92 21 876 5432</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail size={16} className="text-[#FF7A00] shrink-0" />
                    <span>support@flexmart.ae</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[10px] leading-relaxed text-gray-400">
                  💬 Simulating responsive customer queues. Ping us via the <b>WhatsApp Live Support Button</b> bottom-right!
                </div>
              </div>

              {/* Contact Message form */}
              <div className="md:col-span-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Send an online inquiry
                </h4>

                {contactSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-semibold p-4 rounded-lg flex items-center gap-2 animate-fade-in text-center flex-col">
                    <Check size={24} className="text-emerald-500 bg-white rounded-full p-1 shadow-sm" />
                    <span>Message received successfully! We have cached your query and will reply inside 1-2 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-bold font-sans">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-gray-400 block">Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Salim Baloch"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="salim@example.ae"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="Inquire about bulk shipping, Smart watch spec, etc."
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Message Coordinates *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Provide details about your query..."
                        value={contactForm.msg}
                        onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                        className="w-full bg-white text-gray-950 font-normal py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Send size={13} />
                      <span>Send inquiry</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= FAQs ACCORDION PAGE ================= */}
        {subPage === 'faq' && (
          <div className="space-y-6 animate-fade-in text-xs font-semibold text-gray-700">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Clear doubt elements in 2026</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none">Frequently Asked FAQs</h1>
            </div>

            <div className="space-y-3.5 select-none" id="faqs-accordion">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border border-gray-150 rounded-xl overflow-hidden transition-all bg-[#0B1E40]/5"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between font-extrabold text-gray-900 border-b border-transparent hover:border-orange-100 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={15} className="text-[#FF7A00]" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown size={16} className={`transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>

                  {openFaq === idx && (
                    <div className="p-4 bg-white text-gray-650 leading-relaxed border-t border-gray-150 animate-fade-in text-xs font-medium font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TRACK ORDER PAGE ================= */}
        {subPage === 'track' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium text-gray-700">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-[#FF7A00] uppercase font-black tracking-widest block">Check dynamic fulfillment logs</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none">🚚 Courier Dispatch Tracker</h1>
            </div>

            {/* Input target query */}
            <div className="max-w-md mx-auto p-5 bg-gray-50 border border-gray-150 rounded-xl space-y-4">
              <form onSubmit={handleTrackSearch} className="space-y-3 text-xs font-bold">
                <div className="space-y-1">
                  <label className="text-gray-400 block font-bold text-center">Input Order ID Tracking Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FLX-2026-4912"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    className="w-full bg-white text-gray-950 text-center font-bold font-mono text-center py-2.5 px-4 border border-gray-250 rounded-lg outline-none focus:border-[#FF7A00] uppercase block"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B1E40] hover:bg-[#FF7A00] text-white py-2.5 font-extrabold uppercase rounded-lg cursor-pointer tracking-wider block"
                >
                  Locate Shipment Status
                </button>
              </form>

              <p className="text-[10px] text-gray-420 leading-normal text-center font-semibold">
                * Note: To test, check your active order history inside Customer Portal or check using demo prefix format like <b>FLX-2026-1234</b>.
              </p>
            </div>

            {/* Tracking Result display */}
            {hasSearched && (
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
                {searchedOrder ? (
                  <div className="space-y-6 animate-fade-in">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-150 pb-4 text-xs font-bold">
                      <div>
                        <span className="text-gray-400">Order ID:</span>
                        <p className="font-extrabold font-mono text-[#0B1E40] text-sm mt-0.5">{searchedOrder.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Fulfillment Hub:</span>
                        <p className="text-gray-900 font-bold mt-0.5">Central Dubai Marina Warehouse</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Current status code:</span>
                        <span className="bg-blue-50 text-blue-600 font-black px-3 py-1 rounded border border-blue-200 uppercase tracking-widest inline-block text-[10px] mt-0.5">
                          {searchedOrder.status}
                        </span>
                      </div>
                    </div>

                    {/* Step Visual Track circles */}
                    <div className="py-6 select-none max-w-lg mx-auto">
                      <div className="relative flex items-center justify-between text-center">
                        {/* Line connector background */}
                        <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 z-0" />
                        
                        {/* Active line filler */}
                        <div 
                          className="absolute top-4 left-4 h-1 bg-[#FF7A00] z-0 transition-all duration-1000" 
                          style={{
                            width: 
                              searchedOrder.status === 'Pending' ? '0%' :
                              searchedOrder.status === 'Processing' ? '33%' :
                              searchedOrder.status === 'Shipped' ? '66%' : '100%'
                          }}
                        />

                        {/* Step circles */}
                        {[
                          { label: 'Order Registered', status: 'Pending' },
                          { label: 'Central Sorting', status: 'Processing' },
                          { label: 'Dispatched Out', status: 'Shipped' },
                          { label: 'Delivered Safe', status: 'Delivered' }
                        ].map((step, idx) => {
                          const statusIndex = ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(searchedOrder.status);
                          const isActive = idx <= statusIndex;

                          return (
                            <div key={idx} className="relative z-10 flex flex-col items-center">
                              <div 
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                                  isActive 
                                    ? 'bg-[#FF7A00] text-white border-[#FF7A00] ring-4 ring-[#FF7A00]/10' 
                                    : 'bg-white text-gray-300 border-gray-200'
                                }`}
                              >
                                {isActive ? '✓' : idx + 1}
                              </div>
                              <span className="text-[10px] font-extrabold text-gray-900 mt-2 block tracking-tight leading-none leading-tight max-w-[80px]">
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed courier notes */}
                    <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-2 max-w-md mx-auto text-center font-medium font-sans">
                      <p className="text-gray-900 font-extrabold uppercase text-[10px] tracking-wide flex items-center justify-center gap-1 text-[#FF7A00]">
                        <Compass size={14} className="animate-spin" />
                        <span>Fulfillment dispatch notes:</span>
                      </p>
                      
                      {searchedOrder.status === 'Pending' && (
                        <p className="text-[11px] leading-relaxed">
                          Your order request has been received safely. It is queued for authorized QA testing and packaging at our central facility.
                        </p>
                      )}
                      {searchedOrder.status === 'Processing' && (
                        <p className="text-[11px] leading-relaxed">
                          Your cargo is in our sorting yard. We are applying 3D shock wrapping and printing airway transport invoices.
                        </p>
                      )}
                      {searchedOrder.status === 'Shipped' && (
                        <p className="text-[11px] leading-relaxed">
                          Package is loaded into Leopard Express transit courier. Outbound airway bill is active. Expected door arrival inside 24 hours.
                        </p>
                      )}
                      {searchedOrder.status === 'Delivered' && (
                        <p className="text-[11px] leading-relaxed">
                          Parcel was delivered successfully at the checkout street location. Thank you for shopping with FlexMart!
                        </p>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-250 text-rose-800 rounded-xl p-6 text-center space-y-2.5 max-w-md mx-auto">
                    <ShieldAlert size={28} className="text-rose-500 mx-auto" />
                    <h4 className="text-xs font-extrabold uppercase">Fulfillment Tracking Failed</h4>
                    <p className="text-[11px] max-w-xs mx-auto leading-relaxed">
                      We couldn't confirm that tracking code inside our database registry. Check spelling coefficients or auto login with demo credentials to check historical files.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ================= PRIVACY STATEMENT PAGE ================= */}
        {subPage === 'privacy' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium text-gray-700 leading-relaxed">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Operational parameters 2026</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none">Privacy Policy Statement</h1>
            </div>

            <div className="space-y-4">
              <p className="font-semibold text-gray-950 flex items-center gap-1">
                <FileText size={14} className="text-[#FF7A00]" />
                <span>1. Customer Personal Information Coordinates</span>
              </p>
              <p>
                At FlexMart, accessible from our live sandboxed frame environments, one of our main priorities is the absolute privacy of our virtual visitors. This Privacy Policy document contains types of information that is collected and recorded by FlexMart and how we utilize it.
              </p>
              <p>
                We do not sell, rent, or lease any of your private billing parameters, mobile cellular numbers, card data or email identifiers. All database caching is recorded securely in Sandbox localStorage profiles or Firestore.
              </p>
              
              <p className="font-semibold text-gray-950 flex items-center gap-1 pt-2">
                <Check size={14} className="text-emerald-500" />
                <span>2. Cookie Metrics and Web Analysis</span>
              </p>
              <p>
                Like any other website, FlexMart uses 'cookies' to store preferences, such as active shopping carts, wishlist HEART counts, and coupon spend states. The information is solely used to optimize the user experience by customizing our web page content.
              </p>
            </div>
          </div>
        )}

        {/* ================= TERMS & CONDITIONS PAGE ================= */}
        {subPage === 'terms' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium text-gray-700 leading-relaxed">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Regulatory benchmarks 2026</span>
              <h1 className="text-2xl font-black text-gray-950 tracking-tight leading-none animate-scale">Terms of Use & Conditions</h1>
            </div>

            <div className="space-y-4">
              <p className="font-semibold text-gray-950 flex items-center gap-1">
                <FileText size={14} className="text-[#FF7A00]" />
                <span>1. General eCommerce Guidelines</span>
              </p>
              <p>
                Welcome to FlexMart! These terms and conditions outline the regulatory rules for the use of the FlexMart simulated WooCommerce platform of Dubai & Karachi.
              </p>
              <p>
                By accessing this application, we assume you accept these terms and conditions. Do not continue to use FlexMart if you do not agree to take all of the terms and conditions stated on this layout.
              </p>

              <p className="font-semibold text-gray-950 flex items-center gap-1 pt-2">
                <Check size={14} className="text-emerald-500" />
                <span>2. Delivery Expectation and Cash Inspections</span>
              </p>
              <p>
                Customers are legally authorized to inspect their parcels to guarantee no micro-wear or cosmetic mismatch exists during Cash on Delivery couriers before completing the physical transaction. All smart electronics carry 1 year brand replacement warranties.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
