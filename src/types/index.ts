export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "new" | "sale";
  badgeText?: string;
  category?: string;
  tags?: string[];
  specifications?: Record<string, string>;
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
  name: string;
  image: string;
  slug: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface User {
  email: string;
  name?: string;
}


export type TRegister = {
  fullname: string;
  email: string;
  username: string;
  password: string;

  // assignee: TAssignee;
  // workspace_id: string;
  // deadline: string;
};

export type TLogin = {
  email: string;
  password: string;
};