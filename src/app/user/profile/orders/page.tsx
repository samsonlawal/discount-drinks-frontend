"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Package, ChevronRight } from "lucide-react";
import MobileBackButton from "../MobileBackButton";
import { useGetUserOrders } from "@/hooks/api/orders";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function ProfileOrdersPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { fetchUserOrders, orders, loading } = useGetUserOrders();

  useEffect(() => {
    if (user?._id || user?.userId) {
      const uId = (user._id || user.userId) as string;
      fetchUserOrders(uId);
    }
  }, [user, fetchUserOrders]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => `£${(price || 0).toFixed(2)}`;

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="Order History" />

      <div className="hidden md:block">
        <h2 className="text-2xl mb-6" style={{ fontSize: "24px", fontWeight: 500, color: "#111827" }}>
          Order History
        </h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const orderId = order._id || order.id || "N/A";
            const status = (order.status || "pending").toLowerCase();
            const statusClass = statusColors[status] || "bg-gray-100 text-gray-700";
            return (
              <div
                key={String(orderId)}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-gray-200 transition-all shadow-sm"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">
                      Order #{String(orderId).slice(-8).toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusClass}`}>
                      {status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  <p className="text-sm text-gray-500">
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-base font-semibold text-gray-900">
                    {formatPrice(order.totalAmount || order.total || 0)}
                  </span>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg text-gray-900 font-medium mb-1">No orders found</h3>
          <p className="text-gray-500 text-sm">
            {user
              ? "When you place orders, they will appear here."
              : "Please log in to view your orders."}
          </p>
        </div>
      )}
    </div>
  );
}
