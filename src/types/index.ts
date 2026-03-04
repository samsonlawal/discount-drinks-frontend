export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  costPrice?: number;
  basePrice?: number;
  originalPrice?: number;
  image: string;
  images?: string;

  badge?: string;
  badgeText?: string;
  category?: string;
  tags?: string[];
  brand?: string | Brand;
  specifications?: Record<string, string>;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export interface Category {
  id: string;
  _id?: string;
  name: string;
  image?: string;
  slug?: string;
  status?: string;
  isActive?: boolean;
}

export interface Brand {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  status?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface Tag {
  id?: string;
  _id?: string;
  name: string;
  status?: string;
  isActive?: boolean;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface User {
  email: string;
  name?: string;
  username?: string;
  role?: string;
  isActive?: boolean;
}

export type TRegister = {
  fullname: string;
  email: string;
  username: string;
  password: string;
};

export type TLogin = {
  password: string;
};

export interface OrderItemPayload {
  product: string;
  quantity: number;
  price: number;
  image?: string;
  name: string;
}

export interface ShippingAddressPayload {
  addressLine1: string;
  addressLine2?: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
}

export interface OrderPayload {
  items: OrderItemPayload[];
  shippingAddress?: ShippingAddressPayload;
  paymentMethod: "card" | "cash" | "transfer" | string;
  totalAmount: number;
  shippingCost?: number;
  taxRate?: number;
  discount?: number;
  notes?: string;
  coupon?: string | null
}

export interface OrderResponse {
  message: string;
  orderId?: string;
  order?: any;
}
