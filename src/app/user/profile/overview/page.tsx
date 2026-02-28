"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Mail } from "lucide-react";
import MobileBackButton from "../MobileBackButton";

export default function ProfileOverviewPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="" />
            <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
      </div>
      <div className="flex flex-col gap-10" style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        <div>
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Full Name</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="bg-gray-900 rounded-full flex items-center justify-center text-white" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827', color: '#fff', fontSize: '14px', fontWeight: 500 }}>
              {user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <p className="text-gray-900 flex items-center gap-2" style={{ fontWeight: 500 }}>
              {user.name || "N/A"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Username</p>
          <p className="text-gray-900" style={{ fontWeight: 500 }}>@{user.username}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Email Address</p>
          <p className="text-gray-900 flex items-center gap-2" style={{ fontWeight: 500 }}>
            <Mail size={16} className="text-gray-400" />
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
