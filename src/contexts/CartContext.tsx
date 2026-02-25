"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";

interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartTotals: () => CartTotals;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("discountdrinks_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        const cartToSave = cart.map(item => ({
          ...item,
          image: typeof item.image === 'string' && item.image.length > 500 ? '' : item.image
        }));
        localStorage.setItem("discountdrinks_cart", JSON.stringify(cartToSave));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
           localStorage.removeItem("discountdrinks_cart");
        }
      }
    }
  }, [cart, isLoading]);

  const addToCart = (product: Product) => {
    // Determine the best image string to save to prevent undefined src in Next.js Image component
    const productImage = product.image || (product as any).imageUrl || (product as any).thumbnail || (product as any).images?.[0] || "/images/product-1.jpg";
    
    // Ensure the product we store has a valid image string
    const productToSave = {
      ...product,
      image: typeof productImage === 'string' ? productImage : "/images/product-1.jpg"
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, image: productToSave.image }
            : item,
        );
      }

      return [...prevCart, { ...productToSave, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.costPrice ?? item.price) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotals = (): CartTotals => {
    const subtotal = cart.reduce(
      (total, item) => total + (item.costPrice ?? item.price) * item.quantity,
      0,
    );
    const tax = subtotal * 0.2; // 20% VAT
    const total = subtotal + tax;
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      tax,
      total,
      itemCount,
    };
  };

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartTotals,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
