"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import "../../style.css";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  useEffect(() => {
    // Security Check: If no session_id is present, redirect to checkout or home
    if (!sessionId && !orderId) {
      router.replace("/");
    } else {
      // Clear the cart when order is successful
      clearCart();
    }
  }, [sessionId, orderId, router, clearCart]);

  // Optionally, you can trigger an API call here to verify the session_id with your backend
  // and mark the order as paid in your database. 
  // e.g., verifyPayment(sessionId)

  if (!sessionId && !orderId) {
    return null; // Return null while redirecting to avoid layout flash
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green) mb-8 animate-[scaleIn_0.4s_ease-out]">
        <CheckCircle2 size={48} strokeWidth={1.5} />
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--eerie-black)" }}>
        Payment Successful!
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        Thank you for your purchase. Your order has been placed successfully and is being processed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <Link 
          href="/user/profile/orders" 
          className="btn btn-primary w-full sm:w-auto px-6 lg:px-10 h-14 gap-2 !flex !justify-center whitespace-nowrap"
          style={{ "--height": "56px" } as React.CSSProperties}
        >
          <ShoppingBag size={20} />
          <span>View My Orders</span>
        </Link>
        
        <Link 
          href="/products" 
          className="btn btn-outline w-full sm:w-auto px-6 lg:px-10 h-14 !flex !justify-center whitespace-nowrap"
          style={{ "--height": "56px" } as React.CSSProperties}
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-white flex flex-col items-center">
      <React.Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
        <SuccessContent />
      </React.Suspense>
    </main>
  );
}
