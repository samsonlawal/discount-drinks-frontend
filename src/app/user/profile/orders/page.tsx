"use client";

import React from "react";
import { Package } from "lucide-react";
import MobileBackButton from "../MobileBackButton";

export default function ProfileOrdersPage() {
  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="" />

                 <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-2xl mb-6" style={{ fontSize: '24px', fontWeight: 500, marginBottom: '24px', color: '#111827' }}>Order History</h2>
      </div>

      <div className="text-center py-12" style={{ textAlign: 'center', padding: '48px 0' }}>
        <Package size={48} className="mx-auto text-gray-300 mb-4" style={{ margin: '0 auto 16px auto', color: '#d1d5db' }} />
        <h3 className="text-lg text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 500, color: '#111827', marginBottom: '4px' }}>No orders yet</h3>
        <p className="text-gray-500" style={{ color: '#6b7280', fontWeight: 400 }}>When you place orders, they will appear here.</p>
      </div>
    </div>
  );
}
