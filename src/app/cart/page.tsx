"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import "../../app/cart.css";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    isLoading,
  } = useCart();

  const totals = getCartTotals();
  const isEmpty = cart.length === 0;

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
    }
  };

  const formatPrice = (price: number) => {
    return `£${parseFloat(price.toString()).toFixed(2)}`;
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    if (confirm(`Remove ${productName} from cart?`)) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    alert("Proceeding to checkout...");
  };

  return (
    <main className="cart-main">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </nav>

        <h1 className="cart-title">Shopping Cart</h1>

        {/* Loading State */}
        {isLoading ? (
          <div className="w-[100%]">
            <div className="cart-items-section">
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <Loader2
                    size={50}
                    className="animate-spin"
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                </div>
                <h2 className="empty-cart-title">Loading your cart...</h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              {/* Empty Cart State */}
              {isEmpty && (
                <div className="empty-cart">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={100} />
                  </div>
                  <h2 className="empty-cart-title">Your cart is empty</h2>
                  <p className="empty-cart-text">
                    Add some drinks to get started!
                  </p>
                  <a href="/" className="btn btn-primary">
                    Continue Shopping
                  </a>
                </div>
              )}

              {/* Cart Items List */}
              {!isEmpty && (
                <div className="cart-items-wrapper">
                  <div className="cart-items-header">
                    <h2 className="cart-items-title">
                      Items in Cart ({cart.length})
                    </h2>
                    <button
                      className="btn-text btn-clear-cart"
                      onClick={handleClearCart}
                      aria-label="Clear entire cart"
                    >
                      Clear Cart
                    </button>
                  </div>

                  <ul className="cart-items-list">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="cart-item"
                        data-product-id={item.id}
                      >
                        <article className="cart-item-card">
                          {/* Image section */}
                          <figure className="cart-item-image">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={120}
                              height={155}
                              loading="lazy"
                            />
                          </figure>

                          {/* Content section */}
                          <div className="cart-item-content">
                            <h3 className="cart-item-title">{item.name}</h3>
                            <p className="cart-item-price">
                              {formatPrice(item.price)}
                            </p>

                            {/* Quantity controls */}
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn quantity-btn--decrease"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus size={16} />
                              </button>
                              <input
                                type="number"
                                className="quantity-input"
                                value={item.quantity}
                                min="1"
                                max="99"
                                readOnly
                                aria-label={`Quantity of ${item.name}`}
                              />
                              <button
                                className="quantity-btn quantity-btn--increase"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Actions section */}
                          <div className="cart-item-actions">
                            <p className="cart-item-total">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                              className="btn-remove"
                              onClick={() =>
                                handleRemoveItem(item.id, item.name)
                              }
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={20} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Cart Summary Section */}
            {!isEmpty && (
              <aside className="cart-summary">
                <div className="cart-summary-card">
                  <h2 className="cart-summary-title">Order Summary</h2>

                  <div className="cart-summary-details">
                    <div className="summary-row">
                      <span className="summary-label">Subtotal:</span>
                      <span className="summary-value">
                        {formatPrice(totals.subtotal)}
                      </span>
                    </div>

                    <div className="summary-row">
                      <span className="summary-label">VAT (20%):</span>
                      <span className="summary-value">
                        {formatPrice(totals.tax)}
                      </span>
                    </div>

                    <div className="summary-row">
                      <span className="summary-label">Shipping:</span>
                      <span className="summary-value summary-free">FREE</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row summary-total">
                      <span className="summary-label">Total:</span>
                      <span className="summary-value">
                        {formatPrice(totals.total)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 btn-checkout"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>

                  <a href="/" className="btn-text btn-continue-shopping">
                    <ArrowLeft />
                    Continue Shopping
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                  <div className="trust-badge">
                    <ShieldCheck style={{ color: "hsl(353, 42%, 32%)" }} />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge">
                    <RotateCcw style={{ color: "hsl(353, 42%, 32%)" }} />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
