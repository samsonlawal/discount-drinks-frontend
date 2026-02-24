"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { User, Mail, MapPin, Package, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/api/auth";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { onLogout } = useLogout();
  const [activeTab, setActiveTab] = useState("overview");

  // If component mounts and no user, we might want to redirect.
  // Using simple client-side guard:
  if (!user) {
    return (
      <main className="section flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="h2 mb-4">You are not logged in</h2>
        <button onClick={() => router.push("/auth/sign-in")} className="btn btn-primary">
          Sign In
        </button>
      </main>
    );
  }

  const handleLogout = () => {
    onLogout();
    router.push("/");
  };

  return (
    <main className="bg-gray-50 min-h-screen" style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '32px' }}>My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ borderRadius: '16px', border: '1px solid #f3f4f6', backgroundColor: '#fff' }}>
              <nav className="p-3" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button 
                  onClick={() => setActiveTab("overview")}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: activeTab === 'overview' ? '#fff' : '#4b5563', backgroundColor: activeTab === 'overview' ? '#111827' : 'transparent', fontWeight: 500 }}
                  onMouseEnter={(e) => { if(activeTab !== 'overview') e.currentTarget.style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { if(activeTab !== 'overview') e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <User size={18} />
                  <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab("orders")}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: activeTab === 'orders' ? '#fff' : '#4b5563', backgroundColor: activeTab === 'orders' ? '#111827' : 'transparent', fontWeight: 500 }}
                  onMouseEnter={(e) => { if(activeTab !== 'orders') e.currentTarget.style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { if(activeTab !== 'orders') e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <Package size={18} />
                  <span>Order History</span>
                </button>
                <button 
                  onClick={() => setActiveTab("addresses")}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: activeTab === 'addresses' ? '#fff' : '#4b5563', backgroundColor: activeTab === 'addresses' ? '#111827' : 'transparent', fontWeight: 500 }}
                  onMouseEnter={(e) => { if(activeTab !== 'addresses') e.currentTarget.style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { if(activeTab !== 'addresses') e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <MapPin size={18} />
                  <span>Saved Addresses</span>
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: activeTab === 'settings' ? '#fff' : '#4b5563', backgroundColor: activeTab === 'settings' ? '#111827' : 'transparent', fontWeight: 500 }}
                  onMouseEnter={(e) => { if(activeTab !== 'settings') e.currentTarget.style.backgroundColor = '#f9fafb' }}
                  onMouseLeave={(e) => { if(activeTab !== 'settings') e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <Settings size={18} />
                  <span>Account Settings</span>
                </button>
                
                <div className="my-2 border-t border-gray-100"></div>
                
                <button 
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: '#dc2626', fontWeight: 500, backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px]" style={{ padding: '32px', borderRadius: '16px', border: '1px solid #f3f4f6', backgroundColor: '#fff', minHeight: '500px' }}>
              
              {activeTab === "overview" && (
                <div className="animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="bg-gray-900 rounded-full flex items-center justify-center text-white font-bold" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827', color: '#fff', fontSize: '14px' }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {user.name || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Username</p>
                      <p className="font-medium text-gray-900">@{user.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-6" style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#111827' }}>Order History</h2>
                  <div className="text-center py-12" style={{ textAlign: 'center', padding: '48px 0' }}>
                    <Package size={48} className="mx-auto text-gray-300 mb-4" style={{ margin: '0 auto 16px auto', color: '#d1d5db' }} />
                    <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 500, color: '#111827', marginBottom: '4px' }}>No orders yet</h3>
                    <p className="text-gray-500" style={{ color: '#6b7280' }}>When you place orders, they will appear here.</p>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-6" style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#111827' }}>Saved Addresses</h2>
                  <div className="text-center py-12" style={{ textAlign: 'center', padding: '48px 0' }}>
                     <MapPin size={48} className="mx-auto text-gray-300 mb-4" style={{ margin: '0 auto 16px auto', color: '#d1d5db' }} />
                     <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 500, color: '#111827', marginBottom: '4px' }}>No addresses saved</h3>
                     <p className="text-gray-500" style={{ color: '#6b7280' }}>You haven't saved any delivery addresses yet.</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-6" style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#111827' }}>Account Settings</h2>
                  <div className="max-w-md" style={{ maxWidth: '448px' }}>
                    <p className="text-gray-500 mb-6" style={{ color: '#6b7280', marginBottom: '24px' }}>Edit your account information here. Functionality disabled for preview.</p>
                    <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Full Name</label>
                        <input type="text" disabled value={user.name || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" style={{ width: '100%', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Email</label>
                        <input type="email" disabled value={user.email || ""} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" style={{ width: '100%', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb', color: '#6b7280' }} />
                      </div>
                      <div className="pt-4" style={{ paddingTop: '16px' }}>
                        <button disabled className="btn btn-primary w-full opacity-50 cursor-not-allowed" style={{ width: '100%', opacity: 0.5, cursor: 'not-allowed' }}>Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
