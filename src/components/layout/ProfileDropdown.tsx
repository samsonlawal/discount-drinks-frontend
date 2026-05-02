"use client";

import React from "react";
import Link from "next/link";
import {
  CircleUserRound,
  List,
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
    <div className="hidden lg:block">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 group focus:outline-none rounded-sm px-3 py-1.5 hover:bg-(--cultured) transition-colors text-(--eerie-black)/70 hover:text-(--eerie-black)">
            <div className="flex items-center justify-center rounded-full transition-colors h-6 w-6 overflow-hidden shrink-0">
              {user && user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  style={{ objectFit: 'cover', width: '100%', height: '100%', aspectRatio: '1/1' }}
                />
              ) : (
                <CircleUserRound size={20} />
              )}
            </div>
            <span className="text-sm font-medium group-hover:text-black hidden lg:block max-w-[100px] truncate">
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
                href="/user/profile/details" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <CircleUserRound size={16} />
                Profile Details
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild className="outline-none">
              <Link 
                href="/user/profile/orders" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <List size={16} />
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
                href="/user/profile/edit-profile" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors focus:bg-gray-100"
              >
                <Settings size={16} />
                Edit Profile
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-px bg-gray-100 my-2" />

            <DropdownMenu.Item 
              onClick={() => onLogout()} 
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
