/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  secondaryImage?: string;
  images?: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isFlashSale?: boolean;
  reviews: Review[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string; // Lucide icon name
  image: string;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
}

export interface Address {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  address: Address;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
