"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MobileBackButton from "../MobileBackButton";

export default function ProfileSettingsPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="" />
                 <div className="flex justify-between items-center mb-2 md:hidden">
        <h2 className="text-2xl font-semibold text-gray-900">Account Settings</h2>
      </div>
      <div className="hidden md:block">
        <h2 className="text-2xl mb-2" style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>Account Settings</h2>
      </div>

      <div className="max-w-md" style={{ maxWidth: '448px' }}>
        <p className="text-gray-500 mb-6" style={{ color: '#6b7280', marginBottom: '24px', fontWeight: 400 }}>Edit your account information here. Functionality disabled for preview.</p>
        <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="block text-sm text-gray-700 mb-1" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Full Name</label>
            <input type="text" disabled value={user.name || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" style={{ width: '100%', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 400 }} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Email</label>
            <input type="email" disabled value={user.email || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" style={{ width: '100%', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 400 }} />
          </div>
          <div className="pt-4" style={{ paddingTop: '16px' }}>
            <button disabled className="btn btn-primary w-full opacity-50 cursor-not-allowed" style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed', fontWeight: 500 }}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
