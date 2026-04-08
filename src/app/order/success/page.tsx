"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useGetOrderDetails } from "@/hooks/api/orders";
import "../../style.css";

const SUCCESS_STATUSES = ["paid", "processing", "shipped", "delivered"];

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { fetchOrderDetails, order, loading: isFetching } = useGetOrderDetails();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCleared, setHasCleared] = useState(false);

  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  useEffect(() => {
    // Security Check: If no session_id or order_id is present, redirect
    if (!sessionId && !orderId) {
      router.replace("/");
      return;
    }

    let pollCount = 0;
    const maxPolls = 5;
    const pollInterval = 3000; // 3 seconds

    const verifyOrder = async () => {
      const oid = orderId || sessionId; // Try both if backend supports it
      if (!oid) return;

      try {
        const fetchedOrder = await fetchOrderDetails(oid);
        const status = (fetchedOrder?.status || "").toLowerCase();

        if (SUCCESS_STATUSES.includes(status)) {
          // Truly successful!
          if (!hasCleared) {
            clearCart();
            setHasCleared(true);
          }
          setIsVerifying(false);
          setError(null);
        } else if (status === "failed" || status === "cancelled") {
          setError("Your order was not successful. Please check your payment or contact support.");
          setIsVerifying(false);
        } else {
          // Still pending, try polling
          if (pollCount < maxPolls) {
            pollCount++;
            setTimeout(verifyOrder, pollInterval);
          } else {
            setError("We couldn't verify your payment immediately. Don't worry, your order is being processed. Please check your email for confirmation.");
            setIsVerifying(false);
          }
        }
      } catch (err) {
        setError("Something went wrong while verifying your order.");
        setIsVerifying(false);
      }
    };

    verifyOrder();
  }, [sessionId, orderId, router, fetchOrderDetails, clearCart, hasCleared]);

  if (!sessionId && !orderId) {
    return null;
  }

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-500 mb-8">
          <Loader2 size={48} className="animate-spin" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
        <p className="text-gray-500">Checking your order status with your bank.</p>
      </div>
    );
  }

  if (error && !hasCleared) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500 mb-8">
          <AlertCircle size={48} strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold mb-4">Verification Incomplete</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">{error}</p>
        <Link href="/cart" className="btn btn-primary px-8">Return to Cart</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green) mb-8 animate-[scaleIn_0.4s_ease-out]">
        <CheckCircle2 size={48} strokeWidth={1.5} />
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--eerie-black)" }}>
        {order?.status === "paid" ? "Payment Successful!" : "Order Received!"}
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        {order?.status === "paid" 
          ? "Thank you for your purchase. Your order has been placed successfully and is being processed."
          : "Your order has been received and is currently pending verification. You will receive an email once your payment is confirmed."}
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
