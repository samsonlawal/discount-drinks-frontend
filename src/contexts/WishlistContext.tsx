"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("discountdrinks_wishlist");
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        setWishlist(parsed);
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("discountdrinks_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  const addToWishlist = (product: Product) => {
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
      id: product.id || (product as any)._id,
      image: extractedImage
    };

    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => (item.id || (item as any)._id) === productToSave.id);
      if (exists) {
        return prevWishlist;
      }
      return [...prevWishlist, productToSave];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => (item.id || (item as any)._id) !== productId),
    );
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => (item.id || (item as any)._id) === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
