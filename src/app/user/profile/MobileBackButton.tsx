"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function MobileBackButton({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="md:hidden flex items-center mb-6">
      <button 
        onClick={() => router.push("/user/profile")}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft size={20} className="mr-1" />
        <span>Back to Menu</span>
      </button>
      <h2 className="text-xl font-semibold ml-auto text-gray-900">{title}</h2>
    </div>
  );
}
