"use client";

import React from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const router = useRouter();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-600 animate-pulse">Loading your wishlist...</p>
        </div>
      </main>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div
        className="container"
        style={{ padding: "100px 15px", textAlign: "center" }}
      >
        <Heart size={64} style={{ margin: "0 auto 20px", opacity: 0.3 }} />
        <h2 className="h2" style={{ marginBottom: "20px" }}>
          Your Wishlist is Empty
        </h2>
        <p style={{ marginBottom: "30px", color: "var(--sonic-silver)" }}>
          Save your favorite products to your wishlist and shop them later!
        </p>
        <Link href="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main>
      <section className="section product">
        <div className="container">
          {/* <h2
            className="text-[20px] section-title"
            style={{ color: "var(--eerie-black)" }}
          >
            My Wishlist ({wishlist.length})
          </h2> */}

          {/* Breadcrumb */}
          <div className="products-page-header">
            <nav className="breadcrumb">
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Wishlist</li>
              </ul>
            </nav>
          </div>

          <ul className="product-list">
            {wishlist.map((product) => (
              <li key={product.id}>
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
                        className="card-action-btn"
                        onClick={() => router.push(`/product/${product.id}`)}
                        aria-label="Quick view"
                      >
                        <Eye className="icon" />
                      </button>

                      <button
                        className="card-action-btn cart-btn"
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        disabled={isInCart(product.id)}
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="icon" aria-hidden="true" />
                        <p>
                          <span className="cart-btn-text">
                            {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                          </span>
                        </p>
                      </button>

                      <button
                        className="card-action-btn"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        style={{ color: "var(--candy-pink)" }}
                      >
                        <Heart className="icon" fill="currentColor" />
                      </button>
                    </div>
                  </figure>

                  <div className="card-content">
                    <h3 className="h4 card-title">
                      <a href={`/product/${product.id}`}>{product.name}</a>
                    </h3>
                    <div className="card-price">
                      <data value={product.price}>
                        £{product.price.toFixed(2)}
                      </data>
                      {product.originalPrice && (
                        <data value={product.originalPrice}>
                          £{product.originalPrice.toFixed(2)}
                        </data>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
