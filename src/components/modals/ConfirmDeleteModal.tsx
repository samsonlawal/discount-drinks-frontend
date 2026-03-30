"use client";

import React from "react";
import { BaseModal } from "./BaseModal";
import { Trash2, AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title?: string;
  message?: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Delete Address",
  message = "Are you sure you want to delete this address? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="p-0 border-none bg-white">
      <div className="p-6">
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col text-center w-full">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-8 text-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 text-center! bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {/* {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )} */}
            Delete
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
