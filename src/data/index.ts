import { Product, Category, ServiceFeature, BlogPost } from "@/types";

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Premium Red Wine",
    price: 48.75,
    originalPrice: 65.0,
    image: "/images/product-1.jpg",
    badge: "sale",
    badgeText: "-25%",
  },
  {
    id: "prod_002",
    name: "Classic White Wine",
    price: 62.0,
    image: "/images/product-2.jpg",
    badge: "new",
    badgeText: "New",
  },
  {
    id: "prod_003",
    name: "Aged Whiskey",
    price: 32.0,
    image: "/images/product-3.jpg",
  },
  {
    id: "prod_004",
    name: "Smooth Dark Rum",
    price: 84.0,
    image: "/images/product-4.jpg",
  },
  {
    id: "prod_005",
    name: "Luxury Cognac",
    price: 45.0,
    image: "/images/product-5.jpg",
  },
  {
    id: "prod_006",
    name: "Premium Tequila",
    price: 30.0,
    originalPrice: 38.0,
    image: "/images/product-6.jpg",
  },
  {
    id: "prod_007",
    name: "Fine Dry Gin",
    price: 25.0,
    originalPrice: 39.0,
    image: "/images/product-7.jpg",
  },
  {
    id: "prod_008",
    name: "Party Mix Combo",
    price: 85.0,
    originalPrice: 99.0,
    image: "/images/product-8.jpg",
  },
  {
    id: "prod_009",
    name: "Bulk Alcohol Pack",
    price: 32.0,
    image: "/images/product-9.jpg",
  },
  {
    id: "prod_010",
    name: "Creamy Liqueur",
    price: 71.0,
    image: "/images/product-10.jpg",
    badge: "new",
    badgeText: "New",
  },
];

export const categories: Category[] = [
  {
    id: "cat_001",
    name: "Gin",
    image: "/images/category-1.jpg",
    slug: "gin",
  },
  {
    id: "cat_002",
    name: "Party Liquour",
    image: "/images/category-2.jpg",
    slug: "party-liquour",
  },
  {
    id: "cat_003",
    name: "Whiskey",
    image: "/images/category-3.jpg",
    slug: "whiskey",
  },
  {
    id: "cat_004",
    name: "Scotch Whiskey",
    image: "/images/category-4.jpg",
    slug: "scotch-whiskey",
  },
  {
    id: "cat_005",
    name: "Vintage Whiskey",
    image: "/images/category-5.jpg",
    slug: "vintage-whiskey",
  },
  {
    id: "cat_006",
    name: "Distilled Whiskey",
    image: "/images/category-6.jpg",
    slug: "distilled-whiskey",
  },
];

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: "/images/service-icon-1.svg",
    title: "Free Shipping",
    description: "On All Order Over $599",
  },
  {
    icon: "/images/service-icon-2.svg",
    title: "Easy Returns",
    description: "30 Day Returns Policy",
  },
  {
    icon: "/images/service-icon-3.svg",
    title: "Secure Payment",
    description: "100% Secure Gaurantee",
  },
  {
    icon: "/images/service-icon-4.svg",
    title: "Special Support",
    description: "24/7 Dedicated Support",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog_001",
    title: "How to Choose the Perfect Wine for Every Occasion",
    image: "/images/blog-1.jpg",
    category: "Vodka",
    date: "2025-12-31",
    slug: "perfect-wine-for-every-occasion",
  },
  {
    id: "blog_002",
    title: "What Goes Best With Wines and Spirits",
    image: "/images/blog-2.jpg",
    category: "Rum",
    date: "2025-12-31",
    slug: "what-goes-best-with-wines-and-spirits",
  },
  {
    id: "blog_003",
    title: "How We Source Quality Wines and Drinks Worldwide",
    image: "/images/blog-3.jpg",
    category: "Whiskey",
    date: "2025-12-31",
    slug: "sourcing-quality-wines-worldwide",
  },
];
