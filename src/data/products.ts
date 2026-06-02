/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, BlogPost } from '../types';

export const categories: Category[] = [
  {
    slug: 'electronics',
    name: 'Electronics',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'mobile-accessories',
    name: 'Mobile Accessories',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'fashion-clothing',
    name: 'Fashion & Clothing',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'watches',
    name: 'Watches',
    icon: 'Clock',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'health-fitness',
    name: 'Health & Fitness',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'baby-products',
    name: 'Baby Products',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eb6?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'toys-games',
    name: 'Toys & Games',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'office-supplies',
    name: 'Office Supplies',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'car-accessories',
    name: 'Car Accessories',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'smart-gadgets',
    name: 'Smart Gadgets',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1555538995-7bccf9345ebb?q=80&w=800&auto=format&fit=crop'
  }
];

export const products: Product[] = [
  // Categories mapping: electronics, mobile-accessories, fashion-clothing, beauty-personal-care, home-kitchen, watches, health-fitness, baby-products, toys-games, office-supplies, car-accessories, smart-gadgets
  {
    id: 'p1',
    name: 'FlexBuds Pro Wireless Earbuds',
    price: 129,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 142,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    description: 'Immerse yourself in pure studio quality with the FlexBuds Pro. Engineered with Hybrid Active Noise Cancelling (ANC), custom high-excursion driver, and up to 40 hours of battery life. Experience deep bass, warm mids, and crystal clear highs.',
    features: [
      'Active Noise Cancellation up to 45dB',
      'Transparency and Spatial Audio Mode',
      'Ultra-fast Bluetooth 5.3 connection',
      'IPX7 Sweat and Water Resistant',
      'Wireless charging compatible case'
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    isFlashSale: true,
    reviews: [
      { id: 'r1', username: 'Sarah Malik', rating: 5, text: 'Awesome noise cancelling! Best earbuds I have owned. Clear microphone for zoom calls too.', date: 'May 12, 2026' },
      { id: 'r2', username: 'Ahmed K.', rating: 4, text: 'Very comfortable in ears, bass is rich but not overwhelming. Battery life lasts all week.', date: 'May 20, 2026' }
    ]
  },
  {
    id: 'p2',
    name: 'Lux Chrono Classic Quartz Mechanical Watch',
    price: 249,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 88,
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop',
    description: 'An architectural masterpiece on your wrist. The Lux Chrono features a precision sapphire crystal face, genuine leather strap, automatic self-winding movement, and is water resistant up to 100 meters.',
    features: [
      'Scratch-resistant Sapphire Crystal',
      'Genuine Italian calfskin leather strap',
      'Chronograph and Date indicator',
      'Luminous hands and hour markers',
      'Water resistant to 100m (330ft)'
    ],
    inStock: true,
    isFeatured: true,
    isTrending: false,
    reviews: [
      { id: 'r3', username: 'Zayn Ali', rating: 5, text: 'The elegance of this watch is unmatched. Looks far more expensive than it is. Highly recommend.', date: 'April 02, 2026' },
      { id: 'r4', username: 'Dina S.', rating: 5, text: 'Purchased as a gift for my husband, and he has not stopped wearing it. Beautiful craftsman feel.', date: 'May 01, 2026' }
    ]
  },
  {
    id: 'p3',
    name: 'FlexCore smart Gadget Ring Fit',
    price: 89,
    originalPrice: 120,
    rating: 4.5,
    reviewsCount: 56,
    category: 'smart-gadgets',
    image: 'https://images.unsplash.com/photo-1555538995-7bccf9345ebb?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1510017808638-a59b72028880?q=80&w=600&auto=format&fit=crop',
    description: 'Track your health seamlessly without a bulky watch. The FlexCore Smart Ring measures heart rate, sleep quality, blood oxygen, and activity levels. Sleek waterproof titanium construction with 7-day battery.',
    features: [
      'Ultra-light Grade 5 titanium body',
      'Real-time heart rate and HRV monitoring',
      'Sleep stage tracker & recovery index',
      '50m (5 ATM) waterproof chassis',
      'Discreet notifications and tap controls'
    ],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    reviews: [
      { id: 'r5', username: 'Imran H.', rating: 5, text: 'Fits perfectly, and track sleep data much better than my bulky watch! App is sleek.', date: 'May 15, 2026' }
    ]
  },
  {
    id: 'p4',
    name: 'Vintage Distressed Leather Jacket',
    price: 189,
    originalPrice: 299,
    rating: 4.7,
    reviewsCount: 114,
    category: 'fashion-clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=600&auto=format&fit=crop',
    description: 'Crafted from premium full-grain goat leather, this distressed jacket offers a classic cafe racer look. Styled with high-grade metal zippers, comfortable quilted polyester lining, and heavy-duty seams.',
    features: [
      '100% genuine full-grain leather',
      'Hand-distressed vintage finish',
      'Premium metal hardware & zippers',
      'Two inner pockets, three outer zip pockets',
      'Comfort-fit ribbed shoulder details'
    ],
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    reviews: [
      { id: 'r6', username: 'Hamza N.', rating: 5, text: 'Smells like high-quality genuine leather. Fits perfectly. True back-to-classic look.', date: 'Feb 28, 2026' }
    ]
  },
  {
    id: 'p5',
    name: 'Smart RoboClean Pro Dynamic Vacuum',
    price: 349,
    originalPrice: 499,
    rating: 4.6,
    reviewsCount: 74,
    category: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop',
    description: 'Say goodbye to dust and manual sweeping. The RoboClean Pro mapping vacuum features advanced LiDAR navigation, heavy-duty suction, automatic water-tank mopping, and intelligent rug-height sensors.',
    features: [
      'Advanced 3D LiDAR space mapping',
      'Powerful 4000Pa structural suction',
      'Simultaneous dual sweep & micro-mop',
      'Automatic home base charging',
      'Siri/Google Assistant vocal triggers'
    ],
    inStock: true,
    isTrending: true,
    isFlashSale: true,
    reviews: [
      { id: 'r7', username: 'Amina B.', rating: 5, text: 'This changed my weekly cleaning routine. It maps rooms quickly and goes over thick rugs easily.', date: 'May 08, 2026' }
    ]
  },
  {
    id: 'p6',
    name: 'FlexFit Active Adjustable Dumbbells (Pair)',
    price: 199,
    originalPrice: 280,
    rating: 4.7,
    reviewsCount: 95,
    category: 'health-fitness',
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    description: 'Reclaim your home gym space. This pair of intelligent adjustable dumbbells replaces 15 individual weights, easily shifting from 5 lbs to 52.5 lbs with a simple turn of a mechanical dial.',
    features: [
      'Adjusts from 5 lbs to 52.5 lbs per hand',
      'Durable thermoplastic-coated steel core',
      'Ergonomic heavily textured metallic grip',
      'Includes safety-lock storage cradles',
      'Space-saving 15-in-1 layout design'
    ],
    inStock: true,
    isFeatured: true,
    reviews: [
      { id: 'r8', username: 'Bilal R.', rating: 4, text: 'Extremely easy adjustments. Dial mechanism feels super solid. Saves so much space!', date: 'March 19, 2026' }
    ]
  },
  {
    id: 'p7',
    name: 'GlowRevive Organic Facial Serum',
    price: 49,
    originalPrice: 75,
    rating: 4.8,
    reviewsCount: 204,
    category: 'beauty-personal-care',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
    description: 'Transform your skin tone with GlowRevive. Packaged with vitamin C, pure vegan hyaluronic acid, and tea tree extract, this lightweight nourishing serum tightens pores, matches blemishes, and hydrates intensely.',
    features: [
      '100% natural, vegan, cruelty-free formulas',
      'Packed with Vitamin C, E and Hyaluronic Acid',
      'Reduces dark spots & skin micro-wrinkles',
      'Suitable for acne-prone or dry skin types',
      'Eco-friendly dropper bottle'
    ],
    inStock: true,
    isTrending: true,
    isNewArrival: true,
    reviews: [
      { id: 'r9', username: 'Laila H.', rating: 5, text: 'This serum is magic! My skin literally glows in the morning. Buying my second bottle now.', date: 'May 10, 2026' }
    ]
  },
  {
    id: 'p8',
    name: 'FlexSafe Baby Dynamic Monitor Nano',
    price: 119,
    originalPrice: 159,
    rating: 4.6,
    reviewsCount: 42,
    category: 'baby-products',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eb6?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop',
    description: 'Enjoy absolute peace of mind. The FlexSafe Baby Monitor provides 2K ultra-clear night vision, intelligent crying alarms, breathing pattern tracking, and self-regulating room temperature sensors.',
    features: [
      '2K UHD live video stream & night vision',
      'AI Cry detection and push alerts',
      'Secure FHSS connection (no risk of internet hack)',
      'Two-way audio intercom and lullaby broadcast',
      'Accurate ambient climate temperature reading'
    ],
    inStock: true,
    isNewArrival: true,
    reviews: [
      { id: 'r10', username: 'Yasmine J.', rating: 5, text: 'Very clear night vision! The crying detection is fast and alerts my phone immediately.', date: 'April 14, 2026' }
    ]
  },
  {
    id: 'p9',
    name: 'HyperDrive magnetic Dashboard Mount 15W',
    price: 39,
    originalPrice: 59,
    rating: 4.4,
    reviewsCount: 167,
    category: 'car-accessories',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    description: 'The ultimate smart companion for your commute. HyperDrive clips securely into air vents or sticks to dashboard bases, utilizing heavy-duty N52 Neodymium magnets and 15W MagSafe wireless quick-charging.',
    features: [
      '15W fast intelligent wireless charging',
      'Strong MagSafe Neodymium magnet grip',
      '360-degree adjustable stainless steel ball joint',
      'Includes premium USB-C braided cord',
      'Dual attachment: Vent clip AND suction base'
    ],
    inStock: true,
    isFlashSale: true,
    reviews: [
      { id: 'r11', username: 'Omar F.', rating: 4, text: 'Holds my phone super tight even over speed bumps. Charges quickly too.', date: 'May 06, 2026' }
    ]
  },
  {
    id: 'p10',
    name: 'FlexGamer Retro Handheld Console HD',
    price: 79,
    originalPrice: 110,
    rating: 4.5,
    reviewsCount: 130,
    category: 'toys-games',
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?q=80&w=600&auto=format&fit=crop',
    description: 'Relive the golden era of pixel console gaming. The FlexGamer comes pre-loaded with over 5,000 nostalgic 8-bit, 16-bit, and 32-bit classics, displayed on a gorgeous 3.5-inch IPS display.',
    features: [
      'Pre-loaded with 5,000+ vintage games',
      '3.5 inch HD laminated IPS screen',
      'Dual analog Joysticks and responsive action buttons',
      '3000mAh rechargeable battery (7 hours play)',
      'HDMI port for large TV couch gaming'
    ],
    inStock: true,
    reviews: [
      { id: 'r12', username: 'Moeez A.', rating: 5, text: 'Brings back so many sweet memories of childhood. Build quality is surprisingly high!', date: 'April 28, 2026' }
    ]
  },
  {
    id: 'p11',
    name: 'FlexDesk Solid Mahogany Organizer Kit',
    price: 65,
    originalPrice: 95,
    rating: 4.7,
    reviewsCount: 39,
    category: 'office-supplies',
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop',
    description: 'Elevate your workspace aesthetic. Carved from eco-harvested premium Solid Mahogany, this 3-piece kit includes a phone cradle, pen well, mail slots, and magnetic paperclip trench.',
    features: [
      'Handcrafted from certified Solid Mahogany',
      'Smooth wax finish highlighting natural grains',
      'Anti-slip protective rubber baseline pads',
      'Built-in smart-phone cable organizer slit',
      'Includes gorgeous matte black desk tray'
    ],
    inStock: true,
    reviews: [
      { id: 'r13', username: 'Sidra M.', rating: 5, text: 'Looks exceptionally elegant on my white oak desk. Keeps my pens & cards sorted nicely.', date: 'May 04, 2026' }
    ]
  },
  {
    id: 'p12',
    name: 'FlexMag Liquid Silicone iPhone Case',
    price: 25,
    originalPrice: 35,
    rating: 4.6,
    reviewsCount: 310,
    category: 'mobile-accessories',
    image: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1541140134513-87a2e053dbec?q=80&w=600&auto=format&fit=crop',
    description: 'Soft to the touch, rugged in protection. Crafted from liquid silicone with a velvety microfiber lining, and a highly centered N52 MagSafe ring for fast wireless attachments.',
    features: [
      'Premium Liquid Silicone with anti-dust coating',
      '10ft military-grade drop shock absorbency',
      'Silky smooth micro-fiber internal protection',
      'Fully compatible with MagSafe chargers',
      'Precision tactile camera button cover'
    ],
    inStock: true,
    isTrending: true,
    reviews: []
  },
  // Additional products to round up and make categories rich
  {
    id: 'p13',
    name: 'Titan Smart Watch Active V2',
    price: 159,
    originalPrice: 229,
    rating: 4.7,
    reviewsCount: 198,
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop',
    description: 'Stay ahead of your metrics. Titan Smart Watch runs custom high-frequency biosensors, constant Blood-Oxygen alerts, sleep coaching, workout logging and direct phone messaging.',
    features: [
      '1.96-inch bezel-less OLED Touchscreen',
      'Custom GPS with automatic run mapping',
      '7 days battery in heavy tracking mode',
      'Stress tracking and deep breathing prompt',
      'Hundreds of custom widget faces'
    ],
    inStock: true,
    isFeatured: true,
    isFlashSale: true,
    reviews: [
      { id: 'r14', username: 'Kamil K.', rating: 5, text: 'Great AMOLED display. Extremely bright outside, tracker is perfectly calibrated.', date: 'May 04, 2026' }
    ]
  },
  {
    id: 'p14',
    name: 'Sleek AirFryer Pro Extreme 6L',
    price: 110,
    originalPrice: 170,
    rating: 4.8,
    reviewsCount: 152,
    category: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
    description: 'Crispy meals without the high-fat guilt of frying. 8 preset options, rapid 360 hot air convection design, non-stick wash basket, large digital control touch matrix.',
    features: [
      '6 Liter family-sized tray capacity',
      'Rapid hot air circulation up to 200C',
      '8 quick-select presets for meat & bakes',
      'Non-stick drawer dishwasher safe',
      'Automatic auto-off overheat sensor'
    ],
    inStock: true,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'p15',
    name: 'Urban Tech Water Resistant Backpack',
    price: 69,
    originalPrice: 99,
    rating: 4.5,
    reviewsCount: 81,
    category: 'fashion-clothing',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop',
    description: 'The commuter pack of the future. Waterproof ballistic nylon, independent padded laptop slot, hidden passport pockets, and integrated USB external charge port.',
    features: [
      'Waterproof 1200D Ballistic Nylon body',
      'Fits up to 16-inch laptops with ease',
      'Hidden back-zipped passport pocket',
      'Integrated external USB cable feed',
      'Comfort-breathable mesh lumbar panels'
    ],
    inStock: true,
    reviews: []
  },
  {
    id: 'p16',
    name: 'Organic Hemp Soft Baby Swaddle',
    price: 19,
    originalPrice: 29,
    rating: 4.9,
    reviewsCount: 104,
    category: 'baby-products',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eb6?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop',
    description: 'Wrap your newborn in organic warmth. Made of hypoallergenic bamboo & hemp mesh, ultra stretchable, thermoregulating knit fabric. Certified nontoxic inks.',
    features: [
      '70% organic bamboo, 30% soft hemp',
      'Naturally antibacterial and breathable',
      'Generous 120cm x 120cm square layout',
      'Washes beautifully getting softer each time',
      'Includes organic linen carry tote'
    ],
    inStock: true,
    reviews: []
  },
  {
    id: 'p17',
    name: 'EvoGrip Leather Steering Wheel Cover',
    price: 29,
    originalPrice: 45,
    rating: 4.3,
    reviewsCount: 55,
    category: 'car-accessories',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop',
    description: 'Premium feel under grip. Made of selected breathable calf suede, non-slip rubber core, stitching kit for easy mounting. Prevents slip and hot steer wheel burns.',
    features: [
      'Calf suede high-grip texture',
      'Odorless, eco-friendly interior ring',
      'Fits standard 14.5 to 15 inch steering wheels',
      'Heat resistant during direct summer sun',
      'Reinforced sports style stitching'
    ],
    inStock: true,
    reviews: []
  },
  {
    id: 'p18',
    name: 'ProGrade Metal Ergonomic Stapler Set',
    price: 18,
    originalPrice: 25,
    rating: 4.6,
    reviewsCount: 38,
    category: 'office-supplies',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop',
    description: 'Heavy duty desktop workhorse, staples up to 40 pages with soft action press. Rust-resistant chrome plating, integrated staple puller and box of 5000 staples included.',
    features: [
      'Heavy-duty alloy metal structures',
      'Soft-touch leverage anti-jam system',
      'Rotatable anvil for permanent & temporary staple pin',
      'Staples up to 40 paper sheets at once',
      'Comes with 1 staple puller and 5,000 staples'
    ],
    inStock: false,
    reviews: []
  },
  {
    id: 'p19',
    name: 'UltraQuiet Smart Humidifier Diffuser',
    price: 45,
    originalPrice: 69,
    rating: 4.7,
    reviewsCount: 112,
    category: 'smart-gadgets',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    description: 'Keep your room hydrated with premium oil diffusion. Ultrasonic cool mist mechanism with 1.5L water capacity, LED colorful custom halo, smartphone timing triggers.',
    features: [
      'Ultrasonic whisper-quiet operation',
      '1.5 Liter tank for 12 hours run time',
      'Aromatherapy pure oil diffuser tray',
      'Auto-off when dry safety mechanism',
      'App-controlled LED mood glow ring'
    ],
    inStock: true,
    isTrending: true,
    reviews: []
  },
  {
    id: 'p20',
    name: 'Yoga balance Grip Core Mat',
    price: 35,
    originalPrice: 50,
    rating: 4.6,
    reviewsCount: 47,
    category: 'health-fitness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=600&auto=format&fit=crop',
    description: 'No slip, no slide, pure training. Recyclable 6mm TPE mat, highly cushioned for joint protection, alignments tracker lines engraved, water-repellent wash coat.',
    features: [
      'Eco-friendly biodegradable TPE certified',
      'Dual-side texture non-slip traction',
      '6mm extra density joint cushioning',
      'Engraved posture alignment guide',
      'Includes premium elastic carry strap'
    ],
    inStock: true,
    reviews: []
  },
  {
    id: 'zambeel-zb7',
    name: 'Zambeel Portable Handheld Mini Fan USB-C',
    price: 15,
    originalPrice: 24,
    rating: 4.8,
    reviewsCount: 34,
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
    ],
    inStock: true,
    reviews: [
      { id: 'r21', username: 'Bilal Khan', rating: 5, text: 'Superb quality product delivered extremely fast via PakPost COD tracking! Recommending.', date: 'May 28, 2026' }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post1',
    title: 'Top Smart Gadgets and Tech Essentials to Simplify Your 2026 Home Routine',
    excerpt: 'Smart technology is marching faster than ever. We examine the must-have automation accessories that will save you time, power bills, and keep routines fully synchronized.',
    content: 'Smart technology is marching faster than ever. From smart rings tracking your physiological patterns to AI-backed robotic vacuums that mop and charge without human touch, the goal is simple: returning precious hours to your life. In this comprehensive review, we evaluate the smart ring index and the automated devices designed to minimize stress and maximizing leisure hours.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
    date: 'May 28, 2026',
    author: 'Elena Vance'
  },
  {
    id: 'post2',
    title: 'Minimalist Wardrobe: How to Curate the Perfect Capsule Dress Code',
    excerpt: 'Getting exhausted looking at a packed closet with "nothing to wear"? Let us guide you on building an elegant capsule wardrobe centering comfort and maximum styles.',
    content: 'Getting exhausted looking at a packed closet with "nothing to wear"? The capsule wardrobe is an curated methodology of selecting high grade, versatile garments like vintage calf jackets, comfortable canvas pieces, and classic accessories. This article explores how to achieve style leverage by mixing fewer pieces for countless smart-casual outlines.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    date: 'May 16, 2026',
    author: 'Marcus Brody'
  },
  {
    id: 'post3',
    title: 'The Home Gym Revolution: Why Multi-Weight Adjustables are Dominating Fit trends',
    excerpt: 'Throw out the cluttered shelf of steel bells. Discover how micro-dial structural engineering provides full strength trainers on a single stand cradle.',
    content: 'Throw out the cluttered shelf of steel bells. Discover how micro-dial structural engineering provides full strength trainers on a single stand cradle. Dynamic adjustable dumbbells have evolved with soft grip, rapid mechanical gears, and fail-safe lock brackets. We interview leading trainers on why 15-in-1 gear designs are the smartest space investment you can buy.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
    date: 'April 22, 2026',
    author: 'Sarah Fit'
  }
];

export const promoCoupons = [
  { code: 'FLEX2026', type: 'percentage', value: 20, minSpend: 50 },
  { code: 'FLASH30', type: 'percentage', value: 30, minSpend: 100 },
  { code: 'SAVETEN', type: 'fixed', value: 10, minSpend: 30 },
  { code: 'FREESHIP', type: 'percentage', value: 0, minSpend: 0, label: 'Free Shipping' }
];
