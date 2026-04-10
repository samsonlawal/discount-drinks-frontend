"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ShoppingCart, MessageCircle } from "lucide-react";
import "../../style.css";

function FailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || searchParams.get("orderId");

  useEffect(() => {
    // If no orderId is present, we still show the page but with a fallback message
    // or we could redirect to home. Let's keep it for now.
  }, [orderId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div 
        className="flex h-24 w-24 items-center justify-center rounded-full mb-8 animate-[scaleIn_0.4s_ease-out]"
        style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
      >
        <AlertCircle size={48} strokeWidth={1.5} />
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--eerie-black)" }}>
        Order Processing Failed
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-6 text-lg font-medium">
        Something went wrong while processing your payment.
      </p>
      
      {/* <p className="text-gray-400 max-w-md mx-auto mb-8">
        Your order {orderId && <span className="font-semibold text-gray-600">(#{orderId})</span>} has been recorded as failed, and you have not been charged for this attempt.
      </p> */}

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <Link 
          href="/checkout" 
          className="btn btn-primary w-full sm:w-auto px-6 lg:px-10 gap-2 !flex !justify-center whitespace-nowrap"
        >
          <ShoppingCart size={20} />
          Try Again
        </Link>
        
        <Link 
          href="/contact" 
          className="btn btn-outline w-full sm:w-auto px-6 lg:px-10 gap-2 !flex !justify-center whitespace-nowrap"
        >
          <MessageCircle size={20} />
          Contact Support
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>If you have already been charged, please contact us immediately with your order reference.</p>
      </div>
    </div>
  );
}

export default function OrderFailedPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-white flex flex-col items-center">
      <React.Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-gray-400">Loading...</div>}>
        <FailedContent />
      </React.Suspense>
    </main>
  );
}
