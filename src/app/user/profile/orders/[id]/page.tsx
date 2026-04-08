"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetOrderDetails } from "@/hooks/api/orders";
import { ChevronLeft, Package, MapPin, CreditCard, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const timelineSteps = [
  { label: "Payment Received", status: "pending" },
  { label: "Preparing Order", status: "processing" },
  { label: "Dispatched", status: "dispatched" },
  { label: "On its way", status: "shipped" },
  { label: "Delivered", status: "delivered" },
];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { fetchOrderDetails, order, loading } = useGetOrderDetails();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId, fetchOrderDetails]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => `£${(price || 0).toFixed(2)}`;

  if (loading) {
    return (
      <div className="animate-in fade-in duration-500">
        {/* Skeleton Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="h-4 w-64 bg-gray-100 animate-pulse rounded-sm hidden md:block" />
          <div className="flex md:hidden items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 animate-pulse rounded-sm" />
            <div className="h-6 w-32 bg-gray-100 animate-pulse rounded-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden">
              <div className="px-4 py-2 border-b bg-(--cultured) border-[var(--cultured)] flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-3 w-24 bg-gray-200 animate-pulse rounded-sm" />
              </div>
              <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-3 w-16 bg-gray-100 animate-pulse rounded-sm" />
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white border border-[var(--cultured)] rounded-sm overflow-hidden h-48">
                  <div className="p-4 space-y-4">
                    <div className="h-3 w-full bg-gray-50 animate-pulse rounded-sm" />
                    <div className="h-3 w-3/4 bg-gray-50 animate-pulse rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white border border-[var(--cultured)] rounded-sm overflow-hidden h-full min-h-[400px]">
              <div className="p-8 space-y-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 bg-gray-100 animate-pulse rounded-full" />
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="text-center py-20">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Order Not Found</h3>
        <p className="text-gray-500 mb-6">We couldn't find the order you're looking for.</p>
        <button
          onClick={() => router.push("/user/profile/orders")}
          className="px-6 py-2 bg-(--eerie-black) text-white rounded-sm hover:opacity-90 transition-opacity"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const status = (order.status || "pending").toLowerCase();
  const statusClass = statusColors[status] || "bg-gray-100 text-gray-700";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => router.push("/user/profile/orders")}
            className="flex items-center justify-center text-gray-600 hover:text-white bg-gray-100 hover:bg-(--eerie-black) rounded-sm p-2 transition-all group"
            title="Back to Orders"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900">
              Order Details
            </h1>
          </div>
        </div>
        <div className="hidden md:block">
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
            {order.items?.map((item: any) => item.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 1. Info Sidebar Section (First on everything) */}
        <div className="lg:col-span-2 flex flex-col gap-4 order-1 lg:order-1">
          {/* Order Info */}
          <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden">
            <div className="px-4 py-2 border-b bg-(--cultured) border-[var(--cultured)] flex items-center gap-2">
              <Package size={16} strokeWidth={1.5} className="text-gray-400" />
              <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Order Info</h3>
            </div>
            <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Order ID:</span>
                <span className="text-(--eerie-black)">
                  #{String(order._id || order.id).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between md:justify-start md:gap-4 text-xs">
                <span className="text-gray-500 tracking-tight">Status:</span>
                <span className={`px-3 py-0.5 rounded-sm text-[10px] font-medium uppercase ${statusClass}`}>
                  {status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 tracking-tight">Placed On:</span>
                <span className="text-(--eerie-black)">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery and Payment side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden h-full">
              <div className="px-4 py-2 border-b bg-(--cultured) border-(--cultured) flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.5} className="text-gray-400" />
                <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Delivery Info</h3>
              </div>
              <div className="p-4 space-y-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Method:</span>
                  <span className="text-(--eerie-black)">Home Delivery</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Shipping Fee:</span>
                  <span className="text-(--eerie-black)">Free</span>
                </div>
                <div className="flex items-start justify-between text-xs">
                  <span className="text-gray-500">Address:</span>
                  {order.shippingAddress ? (
                    <div className="text-right space-y-0.5 text-(--eerie-black)">
                      <p className="font-semibold">{order.shippingAddress.fullName || order.user?.fullName}</p>
                      <p className="">{order.shippingAddress.addressLine1} {order.shippingAddress.city},<br/>{order.shippingAddress.postCode}, {order.shippingAddress.country}</p>
                      {/* {order.shippingAddress.addressLine2 && <p className="">{order.shippingAddress.addressLine2}</p>} */}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No information available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden h-full">
              <div className="px-4 py-2 border-b bg-(--cultured) border-(--cultured) flex items-center gap-2">
                <CreditCard size={18} strokeWidth={1.5} className="text-gray-400" />
                <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Payment Info</h3>
              </div>
              <div className="p-4 space-y-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Method:</span>
                  <span className="text-gray-900 capitalize">{order.paymentMethod || 'Stripe'}</span>
                </div>
                <div className="flex items-center justify-between md:justify-start md:gap-4 text-xs">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                    (order.status === 'paid' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {(order.status === 'paid' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <div className="pt-3 border-t border-(--cultured) flex items-center justify-between text-sm font-medium">
                  <span className="text-gray-900 tracking-tight">Total Amount:</span>
                  <span className="text-(--ocean-green)">{formatPrice(order.totalAmount || order.total || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Order Items (Full width on Desktop, Middle on Mobile) */}
        <div className="lg:col-span-3 order-2 lg:order-3 mt-4 lg:mt-0">
          <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden">
            <div className="px-4 py-2 border-b bg-(--cultured) border-(--cultured) flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package size={16} strokeWidth={1.5} className="text-gray-400" />
                <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Order Items ({order.items?.length || 0})</h3>
              </div>
            </div>
            <div className="divide-y divide-(--cultured)">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="p-3 md:p-4 flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="text-gray-300" size={24} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate uppercase tracking-tight">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tracking Timeline (Last on Mobile, Right on Desktop) */}
        <div className="lg:col-span-1 order-3 lg:order-2">
          <div className="bg-white border border-(--cultured) rounded-sm overflow-hidden h-full">
            <div className="px-4 py-2 border-b bg-(--cultured) border-(--cultured) flex items-center gap-2">
              <Activity size={16} strokeWidth={1.5} className="text-gray-400" />
              <h3 className="text-[12px] font-medium text-gray-900 uppercase tracking-widest">Tracking Timeline</h3>
            </div>
            <div className="p-8">
              <div className="flex flex-col gap-0 relative">
                {timelineSteps.map((step, index) => {
                  const isPastOrActive = 
                     (status === "delivered") ||
                     (status === "shipped" && index <= 3) ||
                     (status === "dispatched" && index <= 2) ||
                     (status === "processing" && index <= 1) ||
                     (status === "pending" && index <= 0);

                  const isSegmentActive = 
                    (status === "delivered" && index < 4) ||
                    (status === "shipped" && index < 3) ||
                    (status === "dispatched" && index < 2) ||
                    (status === "processing" && index < 1);

                  return (
                    <div key={index} className="flex items-start gap-4 relative min-h-[60px] last:min-h-0 group">
                      {index < timelineSteps.length - 1 && (
                        <div className="absolute top-2.5 left-2.5 w-0.5 h-[calc(100%-10px)] z-0">
                          <div className="h-full w-full bg-(--cultured)" />
                          <div 
                            className="absolute top-0 left-0 w-full bg-(--ocean-green) transition-all duration-1000 ease-out" 
                            style={{ height: isSegmentActive ? '100%': '0%' }}
                          />
                        </div>
                      )}

                      <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-500 relative z-10 flex-shrink-0 ${
                        isPastOrActive ? "bg-(--ocean-green)" : "bg-white border-2 border-gray-200"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isPastOrActive ? "hidden" : "bg-gray-200"}`} />
                      </div>

                      <div className="flex flex-col pt-1">
                        <span className={`text-xs font-medium uppercase tracking-tight transition-colors duration-500 ${
                          isPastOrActive ? "text-gray-900" : "text-gray-400"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
