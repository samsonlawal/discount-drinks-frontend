"use client";

import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { User, Mail, MapPin, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { useLogout } from "@/hooks/api/auth";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const { onLogout } = useLogout();

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in?redirect=" + pathname);
    }
  }, [user, router, pathname]);

  if (!user) {
    return (
      <main className="section flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400 font-medium">Redirecting to sign in...</div>
      </main>
    );
  }

  const handleLogout = () => {
    onLogout();
    router.push("/");
  };

  const menuItems = [
    { name: "Overview", path: "/user/profile/overview", icon: <User size={18} strokeWidth={1.5} /> },
    { name: "Order History", path: "/user/profile/orders", icon: <Package size={18} strokeWidth={1.5} /> },
    { name: "Saved Addresses", path: "/user/profile/addresses", icon: <MapPin size={18} strokeWidth={1.5} /> },
    { name: "Settings", path: "/user/profile/settings", icon: <Settings size={18} strokeWidth={1.5} /> },
  ];

  // Determine if we're on the root profile page (which acts as the menu on mobile)
  const isRootProfilePage = pathname === "/user/profile";

  return (
    <main className="min-h-screen pb-10 ">
      <div className="container max-w-6xl">
        
        {/* Main Interface Wrapper */}
        <div className="overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
          
          {/* Sidebar Navigation */}
          {/* On mobile: Render only if we're on the root page. On desktop: Always render */}
          <aside className={`rounded-md w-full md:w-64 lg:w-72 bg-white/50 md:bg-(--cultured)/40 h-fit pb-24 flex-shrink-0 flex flex-col ${isRootProfilePage ? 'block' : 'hidden md:flex'}`}>
            
            <div className="py-6 px-2 md:px-8 md:pt-8 md:pb-4 flex-shrink-0">
              <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
            </div>

            <nav className="py-1 md:px-4 md:py-1 flex-grow flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex flex-row items-center justify-between px-2 md:px-4 py-2 rounded-md text-[14px] transition-all text- ${
                      isActive 
                        ? 'md:bg-[var(--cultured)] text-(--eerie-black)' 
                        : 'md:hover:bg-[var(--cultured)] text-(--eerie-black) bg-transparent'
                    }`}
                  >
                    <p className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </p>
                    <ChevronRight size={18} className="flex md:hidden" />
                  </Link>
                );
              })}
              
              
              <button 
                onClick={handleLogout}
                className="!flex items-center gap-3 px-2 md:px-4 py-2 rounded-lg text-[14px] text-red-600 md:hover:bg-red-100 bg-transparent transition-colors w-full text-left"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          {/* On mobile: Render only if we're NOT on the root page. On desktop: Always render */}
          <div className={`flex-1 flex flex-col ${!isRootProfilePage ? 'block' : 'hidden md:block'}`}>
            <div className="py-6 px-2 md:px-10 md:py-8 h-full">
              {children}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
