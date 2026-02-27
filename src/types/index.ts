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
  email: string;
  password: string;
};