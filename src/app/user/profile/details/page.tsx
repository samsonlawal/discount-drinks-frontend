"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetUserById } from "@/hooks/api/users";
import { setAuthState } from "@/redux/Slices/authSlice";
import { Pencil } from "lucide-react";
import Link from "next/link";
import MobileBackButton from "../MobileBackButton";

export default function ProfileOverviewPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { fetchUser, loading } = useGetUserById();

  useEffect(() => {
    const userId = user?.id || user?._id || (user as any)?.userId;
    if (userId) {
      fetchUser(userId).then((fetchedUser) => {
        if (fetchedUser) {
          // Sync with Redux store to keep the session fresh across the app
          dispatch(setAuthState({ 
            user: user ? { ...user, ...fetchedUser } : fetchedUser 
          }));
        }
      });
    }
  }, [dispatch]);

  if (!user && loading) return (
     <div className="animate-pulse p-8 bg-gray-50 rounded-xl h-96 w-full flex items-center justify-center">
        <p className="text-gray-400">Loading your profile info...</p>
     </div>
  );

  if (!user) return null;

  // Helper to get initials from name or username
  const getInitials = () => {
    if (user.name) {
      const parts = user.name.split(" ");
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return user.username?.charAt(0).toUpperCase() || "U";
  };

  // Deterministic HSL color for the fallback
  const getFallbackColor = () => {
    const seed = user.name || user.username || user.email || "user";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 50%, 45%)`; 
  };

  const profileImage = user.profileImage || user.image;

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="Profile Details" />

      <div 
        className="flex flex-col gap-8" 
        style={{ 
          // backgroundColor: '#f9fafb', 
          padding: '0px 24px', 
          borderRadius: '12px', 
          // border: '1px solid #f3f4f6' 
        }}
      >
        <div className="hidden md:block">
          <h2 className="text-2xl mb-2" style={{ fontSize: '24px', fontWeight: 600, color: '#111827' }}>
            Profile Details
          </h2>
        </div>
      
        <div className="w-full flex flex-col items-center md:items-start justify-center md:justify-start pb-2">
          <div 
            className="rounded-full flex items-center justify-center text-white overflow-hidden relative group" 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              color: '#fff', 
              fontSize: '18px', 
              fontWeight: 500 
            }}
          >
            <Link 
              href="/user/profile/edit-profile"
              className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-400 hover:text-(--ocean-green) transition-colors z-10"
              title="Edit Profile"
            >
              <Pencil size={14} />
            </Link>

            {profileImage ? (
              <img src={profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              getInitials()
            )}
            
            {/* Subtle loading overlay on top of the current image/initials */}
            {loading && (
              <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-(--ocean-green) border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Data Grid with proper alignment */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-12 lg:gap-x-24">
          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Full Name</p>
            <p className="text-gray-900 font-normal">{user.name || "N/A"}</p>
          </div>

          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Username</p>
            <p className="text-gray-900 font-normal">@{user.username}</p>
          </div>

          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Email Address</p>
            <p className="text-gray-900 font-normal">{user.email}</p>
          </div>

          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Gender</p>
            <p className="text-gray-900 font-normal capitalize">{user.gender || "N/A"}</p>
          </div>      

          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Phone</p>
            <p className="text-gray-900 font-normal">{user.phone || "N/A"}</p>
          </div>

          <div className="pb-1">
            <p className="text-sm text-gray-500 mb-1.5" style={{ fontWeight: 400 }}>Date of Birth</p>
            <p className="text-gray-900 font-normal">
              {user.dob ? (
                (() => {
                  const d = new Date(user.dob);
                  return isNaN(d.getTime()) 
                    ? user.dob 
                    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                })()
              ) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
