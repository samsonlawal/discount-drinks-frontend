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
    // Try to get the most appropriate image string
    let extractedImage = product.image;
    
    if (!extractedImage || typeof extractedImage !== 'string') {
      const potentialImages = [
        (product as any).imageUrl,
        (product as any).thumbnail,
        Array.isArray(product.images) ? product.images[0] : typeof product.images === 'string' ? product.images : null,
        Array.isArray((product as any).images) ? (product as any).images[0] : null
      ];
      extractedImage = potentialImages.find(img => typeof img === 'string' && img.trim() !== '') || "";
    }

    const productToSave = {
      ...product,
      image: extractedImage
    };

    setCart((prevCart) => {
      const productId = product.id || (product as any)._id;
      const existingItem = prevCart.find((item) => (item.id || (item as any)._id) === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          (item.id || (item as any)._id) === productId
            ? { ...item, quantity: item.quantity + 1, image: productToSave.image }
            : item,
        );
      }

      return [...prevCart, { ...productToSave, id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => (item.id || (item as any)._id) !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || (item as any)._id) === productId ? { ...item, quantity } : item,
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
    return cart.some((item) => (item.id || (item as any)._id) === productId);
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
