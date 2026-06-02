/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Check, 
  AlertCircle, 
  Search, 
  Compass, 
  Settings, 
  Truck, 
  HelpCircle, 
  ArrowRight, 
  BadgePercent, 
  DollarSign, 
  Layers, 
  RefreshCw, 
  Database, 
  CheckCircle,
  Clock,
  ShieldCheck,
  Send,
  Boxes
} from 'lucide-react';
import { Product, Order } from '../types';

interface ZambeelProduct {
  id: string;
  name: string;
  wholesalePrice: number;
  srp: number; // Suggested Retail Price
  stock: number;
  category: string;
  image: string;
  secondaryImage?: string;
  images?: string[];
  features: string[];
  description: string;
}

interface ZambeelProps {
  orders: Order[];
  onUpdateOrder: (order: Order) => void;
  onImportProduct: (newProduct: Product) => void;
  importedProductIds: string[];
  allProducts: Product[];
  triggerToast: (msg: string) => void;
}

const ZAMBEEL_CATALOG: ZambeelProduct[] = [
  {
    id: 'zb1',
    name: 'Zambeel Pocket Portable Fruit Juicer USB-C',
    wholesalePrice: 8,
    srp: 25,
    stock: 420,
    category: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop',
    description: 'A portable, rechargeable citrus bullet blender with high-torque motor and double-helix stainless steel blades. Perfect for healthy fruit shakes on the go in Pakistan & UAE homes.',
    features: [
      'Built-in 2000mAh USB-C battery',
      'High-speed 18,000 RPM stainless motor',
      'Food-grade non-toxic BPA-free materials',
      'Leak-proof vacuum tight cap assembly'
    ]
  },
  {
    id: 'zb2',
    name: 'Pro Elite Barber Trimmer Dual-Suede',
    wholesalePrice: 12,
    srp: 35,
    stock: 180,
    category: 'beauty-personal-care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    description: 'A professional-grade personal grooming trimmer featuring self-sharpening titanium blades, rechargeable battery, and beautiful copper alloy body engraving.',
    features: [
      'Self-sharpening T-type titanium blades',
      'Fast charge 1200mAh lithium battery for 3hr use',
      'Extremely quiet high-frequency internal pivot',
      'Includes 4 attachable guard comb blocks'
    ]
  },
  {
    id: 'zb3',
    name: 'X9 Ultra Sports Watch with Dual Leather Strap',
    wholesalePrice: 15,
    srp: 49,
    stock: 310,
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop',
    description: 'Sleek sports watch featuring continuous biosensors, step logger, sleep coaches, push notifications, and luxury dual calf stitching strap layouts.',
    features: [
      '1.92-inch AMOLED dynamic touch module',
      'IP68 military structural water resistance',
      'Universal Bluetooth call speaker & mic',
      'Accurate heart speed and step metrics'
    ]
  },
  {
    id: 'zb4',
    name: 'FlexGlow Motion Sensor Cabinet Tape',
    wholesalePrice: 3,
    srp: 12,
    stock: 1250,
    category: 'smart-gadgets',
    image: 'https://images.unsplash.com/photo-1555538995-7bccf9345ebb?q=80&w=600&auto=format&fit=crop',
    description: 'Dual infrared motion detector lighting tape featuring adjustable warm brightness controls and magnetic easy clip back panels.',
    features: [
      'Automatic passive infrared motion detect',
      'Adjustable soft warm & cold brightness glow',
      'USB-A rechargeable magnetic attachment plates',
      'Ultra thin 0.4 inch premium alloy frames'
    ]
  },
  {
    id: 'zb5',
    name: 'Chic Handcrafted Suede Car Garbage Bin',
    wholesalePrice: 5,
    srp: 18,
    stock: 680,
    category: 'car-accessories',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
    description: 'Crafted from premium waterproof faux leather, this trash container clips onto car seat backs seamlessly to keep any VIP interior clean.',
    features: [
      '100% leakproof high density synthetic liner',
      'Magnetic pocket closer with premium stitching',
      'Integrated back hook loops and seat fasteners',
      'Compact geometry that adds zero bulk to cabins'
    ]
  },
  {
    id: 'zb6',
    name: 'Mini Ceramic Hot Pad Mug Warmer',
    wholesalePrice: 6,
    srp: 19,
    stock: 890,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    description: 'Thermostatic heating coaster featuring auto safety shuts and three adjustable heat scales to keep coffee or tea at perfect temperatures all day.',
    features: [
      'Constant 55°C smart temperature induction',
      'Automatic glass/ceramic cup weight triggers',
      'Waterproof tempered panel easy to wipe down',
      'Whisper-quiet 18W thermal heater module'
    ]
  },
  {
    id: 'zb7',
    name: 'Zambeel Portable Handheld Mini Fan USB-C',
    wholesalePrice: 5,
    srp: 15,
    stock: 650,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1618944847023-380d12e6b907?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1622141991834-311fe6fffc1f?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618944847023-380d12e6b907?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622141991834-311fe6fffc1f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624413601705-1845f7ccc11d?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'A powerful, compact, rechargeable mini cooling fan. Outfitted with three aerodynamic speed controls, an ultra-quiet brushless motor, and a detachable standing base block.',
    features: [
      'High-capacity 2000mAh USB-C battery',
      'Brushless quiet rotor with low mechanical friction',
      'Three wind modes (Light breeze, Mid airstream, High cooling power)',
      'Dual-purpose desktop docking stand accessory base'
    ]
  }
];

export default function Zambeel({
  orders,
  onUpdateOrder,
  onImportProduct,
  importedProductIds,
  allProducts,
  triggerToast
}: ZambeelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'orders' | 'credentials'>('overview');
  
  // API Credentials Local Storage Sync
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('zambeel_api_key') || '');
  const [storeId, setStoreId] = useState(() => localStorage.getItem('zambeel_store_id') || '');
  const [region, setRegion] = useState(() => localStorage.getItem('zambeel_region') || 'Pakistan National Post (COD)');
  const [isConnected, setIsConnected] = useState(() => !!localStorage.getItem('zambeel_api_key'));
  const [pricingMarkup, setPricingMarkup] = useState(() => Number(localStorage.getItem('zambeel_markup') || '40'));

  // Catalog search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [importPrices, setImportPrices] = useState<Record<string, number>>({});

  // Fulfill Modal State
  const [selectedFulfillOrder, setSelectedFulfillOrder] = useState<Order | null>(null);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const [fulfillSuccess, setFulfillSuccess] = useState(false);
  const [awbGenerated, setAwbGenerated] = useState('');

  // Initializing default retail prices on mount
  useEffect(() => {
    const initialPrices: Record<string, number> = {};
    ZAMBEEL_CATALOG.forEach(p => {
      // Calculate suggested price according to merchant markup rules
      const calculated = Math.round(p.wholesalePrice * (1 + pricingMarkup / 100));
      initialPrices[p.id] = Math.max(calculated, p.srp);
    });
    setImportPrices(initialPrices);
  }, [pricingMarkup]);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim() && storeId.trim()) {
      localStorage.setItem('zambeel_api_key', apiKey.trim());
      localStorage.setItem('zambeel_store_id', storeId.trim());
      localStorage.setItem('zambeel_region', region);
      localStorage.setItem('zambeel_markup', pricingMarkup.toString());
      setIsConnected(true);
      triggerToast('✓ Connected to Zambeel dropship node successfully!');
    } else {
      triggerToast('⚠️ Please enter a valid API Key and Merchant Store ID.');
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('zambeel_api_key');
    localStorage.removeItem('zambeel_store_id');
    localStorage.removeItem('zambeel_region');
    setApiKey('');
    setStoreId('');
    setIsConnected(false);
    triggerToast('✓ Disconnected Zambeel supplier account.');
  };

  const handleImport = (p: ZambeelProduct) => {
    if (!isConnected) {
      triggerToast('🛑 Connect account with Zambeel credentials before importing products!');
      setActiveTab('credentials');
      return;
    }

    const priceToSet = importPrices[p.id] || p.srp;

    const importedProduct: Product = {
      id: `zambeel-${p.id}`,
      name: p.name,
      price: priceToSet,
      originalPrice: Math.round(priceToSet * 1.5),
      rating: 4.7,
      reviewsCount: 14 + Math.round(Math.random() * 20),
      category: p.category,
      image: p.image,
      secondaryImage: p.secondaryImage,
      images: p.images,
      description: p.description,
      features: p.features,
      inStock: true,
      reviews: [
        {
          id: `r-zb-${p.id}-1`,
          username: 'Bilal Khan',
          rating: 5,
          text: 'Superb quality product delivered extremely fast via PakPost COD tracking! Recommending.',
          date: 'May 28, 2026'
        }
      ]
    };

    onImportProduct(importedProduct);
    triggerToast(`✓ Imported ${p.name} directly to your FlexMart store!`);
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    setImportPrices(prev => ({
      ...prev,
      [id]: Math.max(1, newPrice)
    }));
  };

  const handleSubmitFulfillment = (order: Order) => {
    setSelectedFulfillOrder(order);
    setFulfillSuccess(false);
    setAwbGenerated('');
  };

  const executeFulfillmentDispatch = () => {
    if (!selectedFulfillOrder) return;
    setIsFulfilling(true);

    setTimeout(() => {
      setIsFulfilling(false);
      setFulfillSuccess(true);
      
      // Random airway bill format (PakPost or TCS)
      const awb = `ZB-PK-COD-${100000 + Math.floor(Math.random() * 900000)}-TCS`;
      setAwbGenerated(awb);

      // Create updated copy order
      const updatedOrder: Order = {
        ...selectedFulfillOrder,
        status: 'Processing', // Progresses the status automatically
        // Store metadata inside simulated order details properties we append
        paymentMethod: `${selectedFulfillOrder.paymentMethod} (Dispatched to Zambeel COD Pipeline)`,
      };

      // Add special custom tracking parameters directly so they are visible
      (updatedOrder as any).dropshipStatus = 'Dispatched';
      (updatedOrder as any).trackingNumber = awb;
      (updatedOrder as any).dropshipCost = selectedFulfillOrder.items.reduce((sum, item) => {
        // Find matching zambeel product, or default to some fraction of price
        const catalogProd = ZAMBEEL_CATALOG.find(zp => `zambeel-${zp.id}` === item.product.id);
        const unitCost = catalogProd ? catalogProd.wholesalePrice : Math.round(item.product.price * 0.4);
        return sum + (unitCost * item.quantity);
      }, 0);

      onUpdateOrder(updatedOrder);
      triggerToast(`✓ Submitted order ${selectedFulfillOrder.id} to Zambeel automated courier!`);
    }, 1800);
  };

  // Filter zambeel catalog products
  const filteredCatalog = ZAMBEEL_CATALOG.filter(p => {
    if (!searchQuery.trim()) return true;
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate statistics for dynamic dashboard blocks
  const importedCount = allProducts.filter(p => p.id.startsWith('zambeel-')).length;
  
  // Scans client orders that were dropshipped
  const dropshipOrders = orders.filter(o => o.items.some(item => item.product.id.startsWith('zambeel-')));
  const processedDropships = orders.filter(o => (o as any).dropshipStatus === 'Dispatched');
  
  // Calculate potential margin payout
  const totalRevenue = processedDropships.reduce((sum, o) => sum + o.total, 0);
  const totalWholesaleCosts = processedDropships.reduce((sum, o) => sum + (Number((o as any).dropshipCost) || 0), 0);
  const potentialProfit = Math.max(0, totalRevenue - totalWholesaleCosts);

  return (
    <div className="w-full bg-slate-50/40 min-h-screen py-10 px-4 font-sans" id="zambeel-dashboard-root">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner introduction with beautiful digital aesthetic */}
        <div className="bg-[#0B1E40] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-blue-900/40 shadow-md">
          {/* Subtle glow layers */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-400/10 to-transparent pointer-events-none" />
          
          <div className="max-w-3xl space-y-3 relative z-15">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-orange-500/40 text-[#FF7A00] rounded-full border border-orange-500/30 text-xs font-extrabold uppercase tracking-widest">
              <Cpu size={12} className="animate-pulse" />
              <span>Zambeel Automatic Dropship Pipeline</span>
            </div>
            
            <h1 className="text-2xl md:text-3.5xl font-black tracking-tight leading-none">
              Connect FlexMart Pakistan with <span className="text-[#FF7A00]">Zambeel</span> Catalog
            </h1>
            
            <p className="text-xs md:text-sm text-gray-300 font-normal leading-relaxed">
              Unlock synchronized dropshipping operations. Import high-conversion wholesale products instantly with localized Cash-on-Delivery (COD) logistics managed natively through Pakistan Post, TCS, and Leopards.
            </p>
          </div>
        </div>

        {/* Dynamic Sync Status & Quick metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="zambeel-metrics-row">
          
          {/* Card 1: Connection status */}
          <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} shrink-0`}>
              <RefreshCw size={24} className={isConnected ? '' : 'animate-spin'} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">Pipeline Connection</span>
              <p className="text-sm font-black text-gray-900 mt-0.5 truncate">
                {isConnected ? '✓ Connected Live' : 'Not Connected'}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                {isConnected ? `Store: ${storeId}` : 'Credentials needed'}
              </p>
            </div>
          </div>

          {/* Card 2: Imported catalogs count */}
          <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Boxes size={24} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">Imported Catalog</span>
              <p className="text-sm font-black text-gray-900 mt-0.5">
                {importedCount} Active Products
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                Live in FlexMart catalogs
              </p>
            </div>
          </div>

          {/* Card 3: Tracked fulfillments dispatches */}
          <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-[#FF7A00] rounded-lg flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">Synced Shipments</span>
              <p className="text-sm font-black text-gray-900 mt-0.5">
                {processedDropships.length} Orders Submitted
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                Dispensing via courier nodes
              </p>
            </div>
          </div>

          {/* Card 4: Estimated Net Revenue block */}
          <div className="bg-white rounded-xl p-5 border border-gray-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <DollarSign size={24} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">Net Payout Profit</span>
              <p className="text-sm font-black text-emerald-600 mt-0.5">
                ${potentialProfit}.00 USD
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                Paid: ${totalWholesaleCosts} wholesale sum
              </p>
            </div>
          </div>

        </div>

        {/* Tab Selection Row menu */}
        <div className="flex border-b border-gray-250 select-none" id="zambeel-tabs-nav">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview' ? 'border-[#FF7A00] text-[#FF7A00] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'catalog' ? 'border-[#FF7A00] text-[#FF7A00] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Browse Zambeel Wholesales ({filteredCatalog.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'orders' ? 'border-[#FF7A00] text-[#FF7A00] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Fulfill Orders
            {orders.filter(o => o.items.some(i => i.product.id.startsWith('zambeel-')) && (o as any).dropshipStatus !== 'Dispatched').length > 0 && (
              <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'credentials' ? 'border-[#FF7A00] text-[#FF7A00] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Account Credentials
          </button>
        </div>

        {/* Tab 1: Operational overview and guide list */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-xs font-medium">
            
            {/* Column 1 & 2: Steps flow explanations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">How to Dropship in Pakistan using Zambeel</h3>
                
                <div className="space-y-4 pt-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF7A00] font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">Configure Courier Integrations</h4>
                      <p className="text-gray-500 leading-relaxed font-normal">
                        Input your Zambeel API key. This connects FlexMart's shopping backend directly to Pakistan's biggest wholesale drop supplier.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF7A00] font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">Select & Set Profit Pricing</h4>
                      <p className="text-gray-500 leading-relaxed font-normal">
                        Browse the Zambeel wholesale catalogs, modify your desired retail markup settings (e.g., 40%) or manually lock pricing per unit, then click the Import button.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF7A00] font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">1-Click COD Order Fulfillments</h4>
                      <p className="text-gray-500 leading-relaxed font-normal">
                        When customer orders are created on your storefront, load the Fulfill panel with 1-click. Delivery coordinates are sent to Zambia nodes automatically. Couriers ship items and collect cash on your behalf, paying out your net profit differences weekly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected details if any */}
              {isConnected ? (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-5 rounded-xl space-y-3 shadow-xs">
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    <ShieldCheck size={16} />
                    <span>Active Storage Connection Detected</span>
                  </h4>
                  <p className="leading-relaxed font-normal">
                    FlexMart is successfully synced with Merchant Store ID: <b>{storeId}</b>. Global imports to the digital product ledger are online and fully authorized.
                  </p>
                </div>
              ) : (
                <div className="bg-[#FF7A00]/5 text-gray-900 border border-[#FF7A00]/20 p-5 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-[#FF7A00] flex items-center gap-1.5">
                    <AlertCircle size={16} />
                    <span>Zambeel Integration Pending Activation</span>
                  </h4>
                  <p className="leading-relaxed font-normal text-xs text-gray-600">
                    To import test dropship units and process simulated checkout items, navigate to the <b>Account Credentials</b> sub-tab and set up a simulated integration node key with 1-click.
                  </p>
                  <button
                    onClick={() => setActiveTab('credentials')}
                    className="bg-[#0B1E40] text-white hover:bg-[#FF7A00] font-bold py-2 px-4 rounded-lg transition-all text-[11px] inline-flex items-center gap-1"
                  >
                    <span>Go to Credentials Panel</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Column 3: Stats block */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                <h4 className="text-[11px] font-black uppercase text-gray-900 tracking-wider">Store Sync Ledger</h4>
                
                <div className="space-y-3 font-semibold text-gray-700">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-400 font-normal">Integration Host</span>
                    <span className="text-gray-900">api.zambeel.pk</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-400 font-normal">Webhook Port</span>
                    <span className="text-gray-950 font-mono">3000 (HTTPS TLS)</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-400 font-normal">Courier Handlers</span>
                    <span className="text-gray-900">PakPost, TCS, Leopards</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-normal">Default markup</span>
                    <span className="text-[#FF7A00]">{pricingMarkup}% retail boost</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1E40] text-gray-300 p-5 rounded-xl space-y-2 border border-blue-950">
                <h5 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                  <HelpCircle size={14} className="text-[#FF7A00]" />
                  <span>Pakistani COD Deliveries</span>
                </h5>
                <p className="text-[11px] leading-relaxed font-normal text-gray-400">
                  Zambeel streamlines local Cash-on-Delivery fulfillment. Once verified, order logistics dispatch warnings update customer tracking pages instantly.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Products Catalog Browser and profit margin pricing manager */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Filter Zambeel products catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 text-gray-950 pl-10 pr-4 py-2 rounded-lg text-xs"
                />
                <Search size={14} className="text-gray-450 absolute left-3.5 top-2.5" />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-450 text-[11px] font-normal">Pricing Multiplier markup:</span>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={pricingMarkup}
                  onChange={(e) => setPricingMarkup(Number(e.target.value))}
                  className="w-16 bg-gray-50 border border-gray-200 p-1.5 text-center text-xs text-gray-950 rounded font-bold"
                />
                <span className="text-gray-500">%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="zambeel-wholesale-grid">
              {filteredCatalog.map(item => {
                const isImported = importedProductIds.includes(`zambeel-${item.id}`) || 
                                   importedProductIds.includes(item.id) || 
                                   allProducts.some(ap => ap.id === `zambeel-${item.id}`);
                const price = importPrices[item.id] || item.srp;
                const margin = price - item.wholesalePrice;
                const marginPercentage = Math.round((margin / item.wholesalePrice) * 100);

                return (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs relative flex flex-col justify-between">
                    
                    {/* Visual picture badge */}
                    <div className="h-44 bg-slate-50 border-b border-gray-100 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover animate-fade-in"
                        referrerPolicy="no-referrer" 
                      />
                      <span className="absolute top-2.5 right-2 bg-[#0B1E40] text-white text-[9px] font-extrabold px-2 py-1 rounded">
                        Ref Stock: {item.stock}
                      </span>
                      <span className="absolute bottom-2.5 left-2 bg-[#FF7A00] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-sm text-gray-900 leading-tight tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-gray-500 font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Math markup metrics box */}
                      <div className="bg-slate-50 border border-gray-150 p-3 rounded-lg space-y-2">
                        <div className="flex justify-between text-[11px] text-gray-600 font-semibold">
                          <span>Wholesale Price</span>
                          <span className="text-gray-900 font-bold">${item.wholesalePrice}.00</span>
                        </div>
                        
                        <div className="flex justify-between items-center whitespace-nowrap">
                          <span className="text-[11px] text-gray-600 font-semibold">Set Store Retail</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 font-mono font-bold">$</span>
                            <input
                              type="number"
                              min={Math.ceil(item.wholesalePrice)}
                              value={price}
                              onChange={(e) => handlePriceChange(item.id, Number(e.target.value))}
                              disabled={isImported}
                              className="w-16 bg-white border border-gray-200 text-xs font-bold text-right text-gray-950 p-1 rounded focus:ring-1 focus:ring-orange-500"
                            />
                            <span className="text-[10px] text-gray-400 font-medium font-sans">USD</span>
                          </div>
                        </div>

                        <div className="flex justify-between border-t border-gray-200/60 pt-2 text-[11px]">
                          <span className="text-gray-500 font-normal">Est Profit Payout:</span>
                          <span className="text-emerald-600 font-black">
                            +${margin}.00 ({marginPercentage}%)
                          </span>
                        </div>
                      </div>

                      {isImported ? (
                        <div className="bg-emerald-50 text-emerald-800 text-center font-bold py-2.5 px-4 rounded-xl border border-emerald-250 flex items-center justify-center gap-1.5">
                          <CheckCircle size={14} className="text-emerald-600" />
                          <span>Imported to Store Catalog</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleImport(item)}
                          className="w-full bg-[#0B1E40] hover:bg-[#FF7A00] text-white font-extrabold py-2.5 px-4 rounded-xl transition-all cursor-pointer uppercase tracking-wider text-[11px]"
                        >
                          Import to FlexMart Shop
                        </button>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 3: Order Sync & Fulfill pipeline */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in text-xs font-medium">
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-2">
              <h3 className="text-sm font-extrabold text-[#0B1E40] uppercase tracking-wider">Synchronize Dropship Fulfillments</h3>
              <p className="text-xs text-gray-500 leading-normal font-normal">
                Any orders placed on FlexMart Pakistan containing products imported from the Zambeel catalog will show up below. Fulfill them with 1-click to push them onto couriers' cash collection delivery services.
              </p>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-5">
                {orders.map(order => {
                  // Count how many pieces are zambeel dropships
                  const zambeelItems = order.items.filter(item => item.product.id.startsWith('zambeel-'));
                  const hasZambeelItems = zambeelItems.length > 0;
                  
                  // Track state
                  const isDispatched = (order as any).dropshipStatus === 'Dispatched';
                  const trackingNo = (order as any).trackingNumber;
                  const estimatedCost = (order as any).dropshipCost;

                  return (
                    <div key={order.id} className={`border rounded-xl overflow-hidden bg-white shadow-xs ${hasZambeelItems ? 'border-orange-200' : 'border-gray-200'}`}>
                      
                      {/* Section header band */}
                      <div className={`p-4 border-b flex flex-wrap justify-between items-center gap-4 ${hasZambeelItems ? 'bg-orange-50/40 border-orange-100' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                          <div>
                            <span className="text-gray-400 font-bold block">ORDER NO</span>
                            <span className="font-extrabold text-[#0B1E40] font-mono">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-bold block">CUSTOMER</span>
                            <span className="font-bold text-gray-900 truncate max-w-[150px] inline-block">{order.address.name}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-bold block">DESTINATION</span>
                            <span className="font-semibold text-gray-800">{order.address.city}, {order.address.country}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 font-bold block">TOTAL VALUE</span>
                            <span className="font-extrabold text-[#FF7A00]">${order.total}.00</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 font-black">
                          {hasZambeelItems && (
                            <span className="bg-[#FF7A00]/10 text-[#FF7A00] text-[9px] uppercase tracking-wider px-2 py-1 rounded border border-orange-200 font-bold">
                              📦 Zambeel Item Detected
                            </span>
                          )}

                          <span className="bg-gray-900 text-white text-[10px] px-3 py-1 rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Display items contained */}
                      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        <div className="lg:col-span-8 space-y-3">
                          <p className="text-gray-400 font-extrabold text-[10px] uppercase tracking-widest block">Ordered units details</p>
                          {order.items.map(item => (
                            <div key={item.product.id} className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-50 border border-gray-150 rounded overflow-hidden shrink-0">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-gray-900 text-[11px] truncate">{item.product.name}</h5>
                                <p className="text-[10px] text-gray-500 font-normal">
                                  Quantity: {item.quantity} x Price: ${item.product.price} ({item.product.id.startsWith('zambeel-') ? 'Zambeel Drop' : 'Local Stock'})
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Fulfill action panel */}
                        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-150 pt-4 lg:pt-0 lg:pl-5 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <p className="text-gray-400 font-extrabold text-[10px] uppercase tracking-widest block mb-2">Automated Dropship Status</p>
                            
                            {isDispatched ? (
                              <div className="space-y-1">
                                <div className="text-emerald-600 font-black flex items-center gap-1 text-[11px]">
                                  <Check size={14} className="stroke-[2.5]" />
                                  <span>Airway Bill Submitted</span>
                                </div>
                                <p className="text-gray-550 font-mono text-[10px] bg-slate-50 p-2 rounded border border-gray-150">
                                  Track ID AWB:<br />
                                  <span className="font-bold text-gray-900">{trackingNo}</span>
                                </p>
                              </div>
                            ) : hasZambeelItems ? (
                              <div className="space-y-1">
                                <div className="text-amber-600 font-semibold flex items-center gap-1.5">
                                  <Clock size={12} />
                                  <span>Awaiting Dispatch Sync</span>
                                </div>
                                <p className="text-gray-400 font-normal leading-normal text-[10px]">
                                  Submit now to automatically generate COD invoices & PakPost labels.
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-400 font-normal leading-relaxed text-[10px]">
                                This order contains only regular products from FlexMart’s core catalog, no dropship action is required.
                              </p>
                            )}
                          </div>

                          {hasZambeelItems && !isDispatched && (
                            <button
                              onClick={() => handleSubmitFulfillment(order)}
                              className="mt-3 w-full bg-[#FF7A00] hover:bg-[#E06B00] text-white font-extrabold py-2 px-3 rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer text-center"
                            >
                              🚀 Dispatch on Zambeel
                            </button>
                          )}
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-xl space-y-4 max-w-sm mx-auto p-6 shadow-sm">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#FF7A00]">
                  <Truck size={26} />
                </div>
                <h4 className="text-base font-bold text-gray-950">No store orders created yet</h4>
                <p className="text-xs text-gray-500 leading-normal max-w-xs font-normal">
                  To test order fulfillment dispatch, choose one of the wholesale items, import it, go to the Shop catalog, add it to your cart, and complete a Checkout order.
                </p>
              </div>
            )}

          </div>
        )}

        {/* Tab 4: API credentials input block */}
        {activeTab === 'credentials' && (
          <div className="max-w-2xl bg-white rounded-xl p-6 border border-gray-200 shadow-sm animate-fade-in text-xs font-medium space-y-6">
            
            <div className="border-b border-gray-150 pb-4">
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Zambeel API Key Sync Settings</h3>
              <p className="text-[11px] text-gray-400 mt-1 font-normal">Configure dropshippable credentials securely. These parameters authorize automatic courier schedules and pricing transfers.</p>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-4 font-bold text-xs">
              <div className="space-y-1">
                <label className="text-gray-400 block">Zambeel Merchant API Key *</label>
                <input
                  type="password"
                  required
                  placeholder="e.g. zm_live_7a3d9284cfef909284b..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-50 text-gray-950 font-normal py-2.5 px-3.5 border border-gray-200 outline-none rounded-lg text-xs tracking-widest focus:bg-white focus:border-[#FF7A00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400 block">Supplier Store Account ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. STORE_FLEX_PK"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    className="w-full bg-slate-50 text-gray-900 font-semibold py-2.5 px-3.5 border border-gray-200 outline-none rounded-lg text-xs uppercase focus:bg-white focus:border-[#FF7A00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 block">Courier Logistic Pipeline *</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-50 text-gray-800 font-semibold py-2.5 px-3 border border-gray-200 outline-none rounded-lg text-xs cursor-pointer focus:bg-white"
                  >
                    <option>Pakistan National Post (COD)</option>
                    <option>TCS Courier Cash Distribution Express</option>
                    <option>Leopards Delivery Logistics</option>
                    <option>United Arab Emirates Domestic Courier (GCC)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white font-extrabold py-3 px-6 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Save & Connect Store Pipeline
                </button>

                {isConnected && (
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="bg-red-50 hover:bg-rose-100 text-rose-600 font-bold py-3 px-5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Disconnect Integration
                  </button>
                )}

                {!isConnected && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey('zm_live_demo_98240fbcdaef906');
                      setStoreId('FLEX_PK_DEMO');
                      setPricingMarkup(40);
                      setIsConnected(true);
                      localStorage.setItem('zambeel_api_key', 'zm_live_demo_98240fbcdaef906');
                      localStorage.setItem('zambeel_store_id', 'FLEX_PK_DEMO');
                      localStorage.setItem('zambeel_region', 'Pakistan National Post (COD)');
                      localStorage.setItem('zambeel_markup', '40');
                      triggerToast('✓ Autoregistered Demo API parameters with Zambeel network!');
                    }}
                    className="bg-orange-50 hover:bg-orange-100/60 text-[#FF7A00] border border-orange-200/50 font-bold py-3 px-5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    ⚡ Fast Demo Auto-credentials
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      {/* MODAL WINDOW FOR AUTOMATED ORDER Sync Fulfillments to courier pipeline */}
      {selectedFulfillOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-55 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden font-sans animate-scale text-xs font-semibold">
            
            <div className="bg-[#0B1E40] text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-[#FF7A00] p-1 rounded-md text-white">
                  <Database size={16} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider">Submit to Zambeel Dropship</h4>
              </div>
              <button 
                onClick={() => setSelectedFulfillOrder(null)} 
                disabled={isFulfilling}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-gray-700">
              {fulfillSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  
                  <div className="space-y-1">
                    <h5 className="text-base font-extrabold text-gray-900">COD Dispatch Initiated!</h5>
                    <p className="text-xs text-gray-500 font-normal">
                      The order was successfully accepted by Zambeel Pakistan logistics node.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-gray-150 p-4 rounded-xl text-left space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-normal">Assigned Carrier:</span>
                      <span className="font-bold text-gray-900">{region}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-normal">Courier Airway Bill:</span>
                      <span className="font-mono font-bold text-gray-950 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-2xs select-all text-[11px]">{awbGenerated}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-normal">Delivery target:</span>
                      <span className="font-semibold text-gray-900">{selectedFulfillOrder.address.street}, {selectedFulfillOrder.address.city} (Pakistan)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedFulfillOrder(null)}
                    className="bg-[#0B1E40] hover:bg-[#FF7A00] text-white font-extrabold py-2.5 px-6 rounded-lg uppercase tracking-wider text-[10px] transition-all cursor-pointer"
                  >
                    Return to pipeline
                  </button>
                </div>
              ) : (
                <div className="space-y-4 leading-relaxed font-normal">
                  <p className="text-gray-500 text-xs">
                    You are about to instruct <b>Zambeel pk</b> to automatically package, address, and dispatch the following items to the customer and collect cash on delivery.
                  </p>

                  <div className="border border-gray-150 rounded-xl p-4 bg-slate-50/50 space-y-3 font-semibold text-xs text-gray-800">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black leading-none">Recipient parameters</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                      <div>
                        <span className="text-gray-405 font-normal block">Customer Name</span>
                        <span className="text-gray-900 font-bold">{selectedFulfillOrder.address.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-405 font-normal block">Mobile Number</span>
                        <span className="font-semibold text-gray-900">{selectedFulfillOrder.address.phone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-405 font-normal block">Shipping Destination</span>
                        <span className="text-gray-805 leading-snug">{selectedFulfillOrder.address.street}, {selectedFulfillOrder.address.city}, {selectedFulfillOrder.address.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profit breakdown layout analysis */}
                  <div className="border border-orange-200/60 rounded-xl p-4 bg-orange-50/20 space-y-3 font-semibold text-xs text-gray-800">
                    <p className="text-[10px] text-orange-500 uppercase tracking-widest font-black leading-none">Wholesale Arbitrage ledger</p>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-normal">Paid by Customer:</span>
                        <span className="text-gray-900 font-extrabold">${selectedFulfillOrder.total}.00</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span className="text-gray-500 font-normal">Zambeel Wholesale base:</span>
                        <span className="text-rose-600 font-bold">
                          -${selectedFulfillOrder.items.reduce((sum, item) => {
                            const catalogProd = ZAMBEEL_CATALOG.find(zp => `zambeel-${zp.id}` === item.product.id);
                            const unitCost = catalogProd ? catalogProd.wholesalePrice : Math.round(item.product.price * 0.4);
                            return sum + (unitCost * item.quantity);
                          }, 0)}.00
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-orange-200/50 pt-2 text-xs font-black">
                        <span className="text-[#FF7A00]">Your Net profit Margin weekly payout:</span>
                        <span className="text-emerald-600">
                          +${selectedFulfillOrder.total - selectedFulfillOrder.items.reduce((sum, item) => {
                            const catalogProd = ZAMBEEL_CATALOG.find(zp => `zambeel-${zp.id}` === item.product.id);
                            const unitCost = catalogProd ? catalogProd.wholesalePrice : Math.round(item.product.price * 0.4);
                            return sum + (unitCost * item.quantity);
                          }, 0)}.00 CAD
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={executeFulfillmentDispatch}
                      disabled={isFulfilling}
                      className="flex-1 bg-[#FF7A00] hover:bg-[#E06B00] text-white font-extrabold py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 "
                    >
                      {isFulfilling ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Dispatching node...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Submit Dispatch order</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedFulfillOrder(null)}
                      disabled={isFulfilling}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
