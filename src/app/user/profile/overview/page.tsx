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
      <MobileBackButton title="Profile Details" />
            {/* <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
      </div> */}

      <div className="flex flex-col gap-10 w-full" style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>

            <div className="hidden md:block">
        <h2 className="text-2xl mb-2" style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>Profile Details</h2>
      </div>
      
<div className="w-full flex flex-col items-center justify-center pb-4">
         <div className="bg-gray-900 rounded-full flex items-center justify-center text-white" style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#111827', color: '#fff', fontSize: '18px', fontWeight: 500 }}>
              {user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || "U"}
            </div>
</div>

        <div className="border-b border-gray-300 pb-1 w-full">
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Full Name</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p className="text-gray-900 flex items-center gap-2">
              {user.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 pb-1 w-full">
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Username</p>
          <p className="text-gray-900">@{user.username}</p>
        </div>
        <div className="border-b border-gray-300 pb-1 w-full">
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Email Address</p>
          <p className="text-gray-900 flex items-center gap-2" >
            {/* <Mail size={16} className="text-gray-400" /> */}
            {user.email}
          </p>
        </div>
        <div className="border-b border-gray-300 pb-1 w-full">
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Gender</p>
          <p className="text-gray-900 flex items-center gap-2" >
            {/* {user.email} */}
            M
          </p>
        </div>      
        <div className="border-b border-gray-300 pb-1 w-full">
          <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 400 }}>Phone</p>
          <p className="text-gray-900 flex items-center gap-2" >
            {/* {user.email} */}
            *** *** ***
          </p>
        </div>
      </div>
    </div>
  );
}
