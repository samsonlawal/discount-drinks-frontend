"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ShoppingCart } from "lucide-react";
import "../../style.css";

function CanceledContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCanceled = searchParams.get("canceled");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Security Check: If missing the canceled flags, redirect
    if (!isCanceled && !sessionId) {
      router.replace("/");
    }
  }, [isCanceled, sessionId, router]);

  if (!isCanceled && !sessionId) {
    return null; // Return null while redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div 
        className="flex h-24 w-24 items-center justify-center rounded-full mb-8 animate-[scaleIn_0.4s_ease-out]"
        style={{ background: "hsla(356, 65%, 63%, 0.1)", color: "var(--candy-pink)" }}
      >
        <XCircle size={48} strokeWidth={1.5} />
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--eerie-black)" }}>
        Payment Canceled
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        Your payment was canceled or failed. You have not been charged. Please try again.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/checkout" 
          className="btn btn-primary flex-1 py-4 flex items-center justify-center"
        >
          Return to Checkout
        </Link>
        
        <Link 
          href="/cart" 
          className="btn btn-outline flex-1 py-4 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          View Cart
        </Link>
      </div>
    </div>
  );
}

export default function OrderCanceledPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-white flex flex-col items-center">
      <React.Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
        <CanceledContent />
      </React.Suspense>
    </main>
  );
}
