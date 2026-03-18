"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2 } from "lucide-react";
import { BaseModal } from "./BaseModal";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function OrderSuccessModal({
  isOpen,
  onClose,
  message,
}: OrderSuccessModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[700px] bg-white p-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green)">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <Dialog.Title className="text-2xl font-bold text-(--eerie-black) mb-2">
            Order Placed
          </Dialog.Title>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex w-full justify-center rounded-xl bg-(--eerie-black) px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
          >
            OK
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
