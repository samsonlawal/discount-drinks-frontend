"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { BaseModal } from "./BaseModal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}: ConfirmationModalProps) {
  const isDanger = type === "danger";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[700px] bg-white p-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green)">
          {isDanger ? (
            <Trash2 size={40} strokeWidth={1.5} />
          ) : (
            <AlertTriangle size={40} strokeWidth={1.5} />
          )}
        </div>

        <div className="text-center">
          <Dialog.Title className="text-2xl font-bold text-(--eerie-black) mb-2">
            {title}
          </Dialog.Title>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-4">
          <button
            onClick={onConfirm}
            className={`flex w-full justify-center rounded-xl px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md ${
              isDanger ? 'bg-(--ocean-green)' : 'bg-(--eerie-black)'
            }`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex w-full justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
