"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Package } from "lucide-react";
import MobileBackButton from "../MobileBackButton";
import { useGetUserOrders } from "@/hooks/api/orders";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function ProfileOrdersPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { fetchUserOrders, orders, pagination, loading } = useGetUserOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (user?._id || user?.userId) {
      const uId = (user._id || user.userId) as string;
      fetchUserOrders(uId, { page: currentPage, limit: limit });
    }
  }, [user, fetchUserOrders, currentPage, limit]);

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
    <div className="animate-in fade-in duration-300 w-full flex-1">
      <MobileBackButton title="Order History" />

      <div className="hidden md:block">
        <h2 className="text-2xl mb-6" style={{ fontSize: "24px", fontWeight: 500, color: "#111827" }}>
          Order History
        </h2>
      </div>

      {loading ? (
        <div className="rounded-md overflow-hidden divide-y divide-[var(--cultured)]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white animate-shade h-[88px]" />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <>
          <div className="w-full rounded-md overflow-hidden divide-y divide-[var(--cultured)] border border-(--cultured)">
            {orders.map((order: any) => {
              const orderId = order._id || order.id || "N/A";
              const status = (order.status || "pending").toLowerCase();
              const statusClass = statusColors[status] || "bg-gray-100 text-gray-700";
              const items = order.items || [];
              const productNames = items.slice(0, 3).map((item: any) => item.name).join(" x ") + (items.length > 3 ? "..." : "");
              
              return (
                <Link
                  key={String(orderId)}
                  href={`/user/profile/orders/${orderId}`}
                  className="flex items-center justify-between w-full p-4 bg-white hover:bg-[var(--cultured)] transition-all cursor-pointer group rounded-md"
                >
                  {/* Left Section: Visual + Details */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Order Visual (Single or Mesh/Collage) */}
                    <div className="w-16 h-16 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden relative border border-gray-100">
                      {items.length > 1 ? (
                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-[1px] bg-gray-100">
                          {items.slice(0, 4).map((item: any, idx: number) => (
                            <div key={idx} className="bg-white w-full h-full overflow-hidden">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                  <Package size={12} className="text-gray-300" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        items[0]?.image ? (
                          <img src={items[0].image} alt={items[0].name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Package size={24} className="text-gray-300" />
                          </div>
                        )
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h4 className="text-[15px] font-medium text-gray-900 truncate group-hover:text-[var(--ocean-green)] transition-colors">
                        {productNames || "Order Details"}
                      </h4>
                      <p className="text-xs text-gray-400 ">Order {String(orderId).slice(-8).toUpperCase()}</p>
                      <div className="flex items-center gap-1 mt-3 text-[13px] text-gray-500 ">
                        <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Price + Status */}
                  <div className="flex flex-col items-end justify-between gap-2 ml-4 flex-shrink-0">
                    <span className="text-[14px] font-medium text-gray-900 group-hover:text-[var(--eerie-black)] transition-colors">
                      {formatPrice(order.totalAmount || order.total || 0)}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm uppercase ${statusClass}`}>
                      {status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {pagination && (
            <Pagination 
              currentPage={currentPage}
              totalPages={pagination.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
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
