"use client";

import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, Mail, MapPin, Package, Settings, LogOut, ChevronRight, List } from "lucide-react";
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
    return null;
  }

  const handleLogout = () => {
    onLogout();
    // Use window.location for a hard redirect to avoid the "Redirecting..." flash in the layout
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Profile Details", path: "/user/profile/details", icon: <CircleUserRound size={21} strokeWidth={1.75} /> },
    { name: "Order History", path: "/user/profile/orders", icon: <List size={21} strokeWidth={1.75} /> },
    { name: "Saved Addresses", path: "/user/profile/addresses", icon: <MapPin size={21} strokeWidth={1.75} /> },
    { name: "Edit Profile", path: "/user/profile/edit-profile", icon: <Settings size={21} strokeWidth={1.75} /> },
  ];

  // Determine if we're on the root profile page (which acts as the menu on mobile)
  const isRootProfilePage = pathname === "/user/profile";

  return (
    <main className="min-h-screen pb-10 pt-[0px] lg:pt-[10px] w-full">
      <div className="container mx-auto max-w-6xl">
        
        {/* Main Interface Wrapper */}
        <div className="flex flex-col md:flex-row md:gap-10 w-full min-h-[70vh]">
          
          {/* Sidebar Navigation */}
          {/* On mobile: Render only if we're on the root page. On desktop: Always render */}
          <aside className={`rounded-md w-full md:w-64 lg:w-68 bg-white/50 h-fit pb-24 flex-shrink-0 flex flex-col ${isRootProfilePage ? 'block' : 'hidden md:flex'}`}>
            
            <div className="py-5 px-0 md:px-0 md:pt-8 md:pb-4 flex-shrink-0">
              <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
            </div>

            <nav className="py-1 md:px-0 md:py-1 flex-grow flex flex-col gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex flex-row items-center justify-between px-0 hover:md:px-4 py-2.5 rounded-md text-[14px] transition-all text- ${
                      isActive 
                        ? 'md:bg-(--cultured) text-(--eerie-black) md:px-4' 
                        : 'md:hover:bg-(--cultured) text-(--eerie-black) bg-transparent'
                    }`}
                  >
                    <p className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-[16px] font-normal">{item.name}</span>
                    </p>
                    <ChevronRight size={21} className="flex md:hidden text-gray-400" />
                  </Link>
                );
              })}
              
              
              <button 
                onClick={handleLogout}
                className="!flex items-center gap-3 px-0 hover:md:px-4 py-2.5 rounded-lg text-[16px] text-red-600 md:hover:bg-red-100 bg-transparent transition-colors w-full md:text-left text-center"
              >
                <LogOut size={20} strokeWidth={1.75} />
                <span className="font-normal">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          {/* On mobile: Render only if we're NOT on the root page. On desktop: Always render */}
          <div className={`flex-1 min-w-0 flex flex-col ${!isRootProfilePage ? '' : 'hidden md:block'} overflow-hidden`}>
            <div className="flex flex-col py-6 px-0 md:px-0 md:py-8 h-full">
              {children}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
