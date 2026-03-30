"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <nav 
      className={`flex items-center justify-center gap-2 mt-16 mb-12 ${className}`}
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-[var(--ocean-green)] hover:border-[var(--ocean-green)] transition-all duration-300 bg-white "
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2 mx-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-md text-[14px] font-semibold transition-all duration-300 ${
              currentPage === page
                ? "bg-[var(--ocean-green)]/10 border-gray-300 border-(--ocean-green) text-(--ocean-green) scale-110"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[var(--ocean-green)]/40 hover:text-[var(--ocean-green)]"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-500 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-[var(--ocean-green)] hover:border-[var(--ocean-green)] transition-all duration-300 bg-white "
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
