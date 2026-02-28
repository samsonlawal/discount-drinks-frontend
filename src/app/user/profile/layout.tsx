"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { User, Mail, MapPin, Package, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/api/auth";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const { onLogout } = useLogout();

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

  const menuItems = [
    { name: "Overview", path: "/user/profile/overview", icon: <User size={18} /> },
    { name: "Order History", path: "/user/profile/orders", icon: <Package size={18} /> },
    { name: "Saved Addresses", path: "/user/profile/addresses", icon: <MapPin size={18} /> },
    { name: "Settings", path: "/user/profile/settings", icon: <Settings size={18} /> },
  ];

  // Determine if we're on the root profile page (which acts as the menu on mobile)
  const isRootProfilePage = pathname === "/user/profile";

  return (
    <main className="bg-gray-50 min-h-screen pb-10">
      <div className="container max-w-6xl sm:px-6">
        
        {/* Main Interface Wrapper */}
        <div className="bg-white overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
          
          {/* Sidebar Navigation */}
          {/* On mobile: Render only if we're on the root page. On desktop: Always render */}
          <aside className={`w-full md:w-64 lg:w-72 bg-gray-50/50 md:bg-gray-50 md:border-r md:border-gray-100 flex-shrink-0 flex flex-col ${isRootProfilePage ? 'block' : 'hidden md:flex'}`}>
            
            <div className="py-6 md:px-8 md:pt-8 md:pb-4 flex-shrink-0">
              <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
            </div>

            <nav className="py-1 md:px-4 md:py-1 flex-grow flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive 
                        ? 'bg-gray-200 text-white' 
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900 bg-transparent'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              
              <button 
                onClick={handleLogout}
                className="!flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 hover:bg-red-100 bg-transparent transition-colors w-full text-left"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          {/* On mobile: Render only if we're NOT on the root page. On desktop: Always render */}
          <div className={`flex-1 flex flex-col bg-white ${!isRootProfilePage ? 'block' : 'hidden md:block'}`}>
            <div className="py-6 px-2 md:p-10 h-full">
              {children}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
