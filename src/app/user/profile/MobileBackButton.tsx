"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function MobileBackButton({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center mb-6 md:hidden">
      <button 
        onClick={() => router.push("/user/profile")}
        className="flex items-center text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-[var(--eerie-black)] rounded-md p-1 hover:text-white"
      >
        <ChevronLeft size={20} className="" />
      </button>

        <span>{title}</span>

      {/* <h2 className="text-xl font-semibold ml-auto text-gray-900">{title}</h2> */}
    </div>
  );
}
