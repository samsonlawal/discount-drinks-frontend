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
} from "lucide-react";
import "../../app/cart.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotals } =
    useCart();

  const totals = getCartTotals();
  const isEmpty = cart.length === 0;

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your entire cart?")) {
      clearCart();
    }
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
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </nav>

        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            {/* Empty Cart State */}
            <div className="empty-cart" data-empty-cart>
              <div className="empty-cart-icon">
                <ShoppingCart size={100} />
              </div>
              <h2 className="empty-cart-title">Your cart is empty</h2>
              <p className="empty-cart-text">Add some drinks to get started!</p>
              <a href="index.html" className="btn btn-primary">
                Continue Shopping
              </a>
            </div>

            {/* Cart Items List */}
            <div
              className="cart-items-wrapper"
              data-cart-items-wrapper
              style={{ display: "none" }}
            >
              <div className="cart-items-header">
                <h2 className="cart-items-title">
                  Items in Cart (<span data-total-items>0</span>)
                </h2>
                <button
                  className="btn-text btn-clear-cart"
                  data-clear-cart
                  aria-label="Clear entire cart"
                >
                  Clear Cart
                </button>
              </div>

              <ul className="cart-items-list" data-cart-items-list>
                {/* Cart items will be dynamically inserted here */}
              </ul>
            </div>
          </div>

          {/* Cart Summary Section */}
          <aside
            className="cart-summary"
            data-cart-summary
            style={{ display: "none" }}
          >
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-details">
                <div className="summary-row">
                  <span className="summary-label">Subtotal:</span>
                  <span className="summary-value" data-subtotal>
                    £0.00
                  </span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">VAT (20%):</span>
                  <span className="summary-value" data-tax>
                    £0.00
                  </span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Shipping:</span>
                  <span className="summary-value summary-free">FREE</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row summary-total">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value" data-total>
                    £0.00
                  </span>
                </div>
              </div>

              <button
                className="btn btn-primary w-100 btn-checkout"
                data-checkout
              >
                Proceed to Checkout
              </button>

              <a href="index.html" className="btn-text btn-continue-shopping">
                <ArrowLeft />
                Continue Shopping
              </a>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <ShieldCheck />
                <span>Secure Checkout</span>
              </div>
              <div className="trust-badge">
                <RotateCcw />
                <span>Easy Returns</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
