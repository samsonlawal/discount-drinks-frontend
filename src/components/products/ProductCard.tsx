"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Eye, ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = () => {
    router.push(`/product/${product.id}`);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <figure className="card-banner">
        <a href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width="800"
            height="1034"
            className="w-100"
          />
        </a>

        {product.badge && (
          <div
            className={`card-badge ${product.badge === "sale" ? "red" : "green"}`}
          >
            {product.badgeText}
          </div>
        )}

        <div className="card-actions">
          <button
            className="card-action-btn card-eye-btn"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            <Eye className="icon" />
          </button>

          <button
            className="card-action-btn cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="icon" aria-hidden="true" />
            <p className="cart-btn-text">Add to Cart</p>
          </button>

          <button
            className="card-action-btn"
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            style={{
              color: inWishlist ? "var(--candy-pink)" : "inherit",
            }}
          >
            <Heart
              className="icon"
              fill={inWishlist ? "currentColor" : "none"}
            />
          </button>
        </div>
      </figure>

      <div className="card-content">
        <h3 className="h4 card-title">
          <a href={`/product/${product.id}`}>{product.name}</a>
        </h3>

        <div className="card-price">
          <data value={product.price}>&pound;{product.price.toFixed(2)}</data>
          {product.originalPrice && (
            <data value={product.originalPrice}>
              &pound;{product.originalPrice.toFixed(2)}
            </data>
          )}
        </div>
      </div>
    </div>
  );
}
