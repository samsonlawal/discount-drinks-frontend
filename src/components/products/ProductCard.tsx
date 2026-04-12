"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Eye, ShoppingCart, Heart, Ban } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const handleCartToggle = () => {
    if (inCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const productId = product.id || (product as any)._id;

  const handleQuickView = () => {
    router.push(`/product/${productId}`);
  };

  const inWishlist = product ? isInWishlist(product.id || (product as any)._id) : false;
  const inCart = product ? isInCart(product.id || (product as any)._id) : false;

  // Fallback to price if costPrice is undefined
  const displayPrice = product.costPrice ?? product.price;

  return (
    <div className="product-card">
      <figure className="card-banner">
        <a href={`/product/${productId}`}>
          <img
            src={product.image || (product as any).images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            loading="lazy"
            width="800"
            height="800"
            className={`w-full object-cover aspect-square ${(product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0 ? "opacity-60" : ""}`}
          />
        </a>

        {((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? (
          <div className="card-badge bg-gray-500 text-white rounded-md px-2 py-1 text-xs font-medium uppercase absolute top-3 left-3 z-10 shadow-sm flex items-center gap-1">
            <Ban size={12} strokeWidth={2.5} />
            Out of Stock
          </div>
        ) : product.badge && (
          <div
            className={`card-badge ${product.badge === "sale" ? "red" : "green"}`}
          >
            {product.badge}
          </div>
        )}

      </figure>

      <div className="card-content flex flex-row justify-between">
          <div className="flex flex-col">
                    <h3 className="text-sm leading-5 card-title line-clamp-1 overflow-hidden">
          <a href={`/product/${productId}`}>{product.name}</a>
        </h3>

        <div className="card-price">
          <data value={displayPrice}>&pound;{displayPrice.toFixed(2)}</data>
          {product.basePrice && (
            <data value={product.basePrice} className="text-xs font-normal">
              &pound;{product.basePrice.toFixed(2)}
            </data>
          )}
        </div>
          </div>

            <button
            className={`card-action-btn cart-btn group ${inCart ? "text-(--ocean-green)!" : ""} ${((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? undefined : handleCartToggle}
            disabled={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0)}
            aria-label={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? "Out of stock" : inCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
          >
            <ShoppingCart
              className={`icon transition-all duration-200 ${inCart ? "fill-current stroke-(--ocean-green)" : "group-hover:fill-current group-hover:stroke-(--ocean-green) group-hover:text-(--ocean-green)"}`}
              aria-hidden="true"
            />
          </button>
      </div>
    </div>
  );
}
