"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAuthState } from "@/redux/Slices/authSlice";
import { useGetUserAddresses } from "@/hooks/api/users";
import { AgeDisclaimerModal } from "@/components/modals/AgeDisclaimerModal";
import { AddressRequiredModal } from "@/components/modals/AddressRequiredModal";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { BaseModal } from "@/components/modals/BaseModal";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { fetchAddresses } = useGetUserAddresses();

  const [activeModal, setActiveModal] = useState<"none" | "clear_cart" | "remove_item" | "age_verification" | "address_required" | "empty_cart">("none");
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);

  const closeModal = () => setActiveModal("none");

  const totals = getCartTotals();
  const isEmpty = cart.length === 0;

  const handleClearCart = () => setActiveModal("clear_cart");

  const formatPrice = (price: number) => {
    return `£${parseFloat(price.toString()).toFixed(2)}`;
  };

  const handleRemoveItem = (id: string, name: string) => {
    setSelectedItem({ id, name });
    setActiveModal("remove_item");
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setActiveModal("empty_cart");
      return;
    }

    // 1. Logged In Check
    if (!user) {
      router.push(`/auth/sign-in?redirect=/cart`);
      return;
    }

    // 2. Age Disclaimer Check
    const ageStatus = localStorage.getItem("age_verified");
    const isAgeVerified = ageStatus === "true" || ageStatus === "yes";
    
    // Show popup if not verified (including "no", "false", null, empty strings)
    if (!isAgeVerified) {
      setActiveModal("age_verification");
      return;
    }

    await proceedToAddressCheck();
  };

  const proceedToAddressCheck = async () => {
    // 3. Address Check
    let addrs = user?.addresses && Array.isArray(user.addresses) ? user.addresses : [];

    // If Redux says we have 0 addresses, let's confidently double check with the backend
    if (addrs.length === 0) {
      const userId = user?.id || (user as any)?._id || (user as any)?.userId;
      if (userId) {
        addrs = await fetchAddresses(userId);
        
        // Update redux so checkout page & profile won't have to fetch again blindly
        if (addrs.length > 0) {
          dispatch(setAuthState({ user: { ...user, addresses: addrs } as any }));
        }
      }
    }

    if (addrs.length === 0) {
      setActiveModal("address_required");
      return;
    }

    router.push("/checkout");
  };

  return (
    <>
      <ConfirmationModal
        isOpen={activeModal === "clear_cart"}
        onClose={closeModal}
        onConfirm={() => {
          clearCart();
          closeModal();
        }}
        title="Clear Cart"
        message="Are you sure you want to clear your entire cart?"
        confirmText="Clear Cart"
        type="danger"
      />

      <ConfirmationModal
        isOpen={activeModal === "remove_item"}
        onClose={closeModal}
        onConfirm={() => {
          if (selectedItem) removeFromCart(selectedItem.id);
          closeModal();
        }}
        title="Remove Item"
        message={`Remove ${selectedItem?.name} from cart?`}
        confirmText="Remove"
        type="danger"
      />

      <AgeDisclaimerModal
        isOpen={activeModal === "age_verification"}
        onClose={closeModal}
        onConfirm={async () => {
          localStorage.setItem("age_verified", "true");
          closeModal();
          await proceedToAddressCheck();
        }}
        onReject={() => {
          localStorage.setItem("age_verified", "no");
          closeModal();
        }}
      />

      <AddressRequiredModal
        isOpen={activeModal === "address_required"}
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          router.push("/user/profile/addresses");
        }}
      />

      <BaseModal isOpen={activeModal === "empty_cart"} onClose={closeModal}>
        <div className="text-center py-4">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Cart Empty</h2>
          <p className="text-gray-500 mb-6">Your cart is empty</p>
          <button onClick={closeModal} className="btn btn-primary w-full">OK</button>
        </div>
      </BaseModal>
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

        {/* <h1 className="cart-title">Shopping Cart</h1> */}

        {/* Loading State */}
        {isLoading ? (
          <div className="w-[100%] py-20">
            <div className="flex flex-col justify-center items-center gap-4">
              <Loader2
                size={50}
                className="animate-spin text-gray-400"
                style={{ animation: "spin 1s linear infinite" }}
              />
              <p className="text-xl md:text-2xl font-medium text-gray-600 animate-pulse">Loading your cart...</p>
            </div>
          </div>
        ) : (
          <div className={`cart-layout ${isEmpty ? 'cart-layout--empty' : ''}`}>
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
                  <a href="/products" className="btn btn-primary">
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
                              {formatPrice(item.costPrice ?? item.price)}
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
                              {formatPrice((item.costPrice ?? item.price) * item.quantity)}
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

                    {/* <div className="summary-row">
                      <span className="summary-label">VAT (20%):</span>
                      <span className="summary-value">
                        {formatPrice(totals.tax)}
                      </span>
                    </div> */}

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

                  <a href="/products" className="btn-text btn-continue-shopping">
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
    </>
  );
}
