"use client";

import React from "react";
import Link from "next/link";
import {
  CircleUser,
  User as UserIcon,
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronDown
} from "lucide-react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface ProfileDropdownProps {
  user: any;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  return (
    <div className="hidden md:block">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-1 group focus:outline-none rounded-sm px-3 py-1.5 hover:bg-(--cultured) transition-colors text-(--eerie-black)/70 hover:text-(--eerie-black)">
            <div className="flex items-center justify-center rounded-full transition-colors">
              {user && user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-6 h-6 rounded-full" />
              ) : (
                <CircleUser size={20} />
              )}
            </div>
            <span className="text-sm font-medium group-hover:text-black hidden pr-1 md:block max-w-[100px] truncate">
              {user.username || "Account"}
            </span>
            <ChevronDown size={14} className="group-hover:text-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content 
            className="min-w-[240px] bg-white rounded-xl border border-gray-100 p-2 text-sm animate-in fade-in zoom-in-95 duration-200 mt-2"
            style={{ zIndex: 9999 }}
            sideOffset={5}
            align="end"
          >
            <div className="px-3 py-2 border-b border-gray-100 mb-2">
              <p className="font-semibold text-gray-900 truncate">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email || "My Account"}</p>
            </div>

            <DropdownMenu.Item asChild className="outline-none">
              <Link 
                href="/user/profile/overview" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <UserIcon size={16} />
                Overview
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild className="outline-none">
              <Link 
                href="/user/profile/orders" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <Package size={16} />
                Order History
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild className="outline-none">
              <Link 
                href="/user/profile/addresses" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <MapPin size={16} />
                Saved Addresses
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild className="outline-none">
              <Link 
                href="/user/profile/settings" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <Settings size={16} />
                Settings
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-px bg-gray-100 my-2" />

            <DropdownMenu.Item 
              onClick={() => {
                onLogout();
                window.location.href = '/';
              }} 
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition-colors focus:bg-red-50 outline-none w-full text-left"
            >
              <LogOut size={16} />
              Sign Out
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
