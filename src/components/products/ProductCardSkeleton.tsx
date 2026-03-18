"use client";

import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse rounded-t-lg" />
      
      <div className="card-content flex flex-row justify-between pt-3">
        <div className="flex flex-col flex-1 mr-4 gap-2">
          <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded" />
          <div className="h-3 bg-gray-100 animate-pulse w-1/4 rounded" />
        </div>

        <div className="flex items-center -mt-1">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}
