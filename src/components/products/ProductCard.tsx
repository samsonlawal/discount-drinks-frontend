"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Eye, ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

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
          <button className="card-action-btn" aria-label="Quick view">
            <Eye className="icon" />
          </button>

          <button
            className="card-action-btn cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="icon" aria-hidden="true" />
            <p>Add to Cart</p>
          </button>

          <button className="card-action-btn" aria-label="Add to Wishlist">
            <Heart className="icon" />
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
