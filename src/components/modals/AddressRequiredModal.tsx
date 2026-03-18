"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MapPin } from "lucide-react";
import { BaseModal } from "./BaseModal";

interface AddressRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AddressRequiredModal({
  isOpen,
  onClose,
  onConfirm,
}: AddressRequiredModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[700px] bg-white p-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green)">
          <MapPin size={40} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <Dialog.Title className="text-2xl font-bold text-(--eerie-black) mb-2">
            Address Required
          </Dialog.Title>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            Please add a delivery address to your profile before checking out to complete your order.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 pt-4">
          <button
            onClick={onConfirm}
            className="flex w-full justify-center rounded-xl bg-(--eerie-black) px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
          >
            Go to Address Management
          </button>
          <button
            onClick={onClose}
            className="flex w-full justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
