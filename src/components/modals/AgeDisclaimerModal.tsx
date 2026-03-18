"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShieldAlert } from "lucide-react";
import { BaseModal } from "./BaseModal";

interface AgeDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}

export function AgeDisclaimerModal({
  isOpen,
  onClose,
  onConfirm,
  onReject,
}: AgeDisclaimerModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[700px] bg-(--eerie-black)">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green)">
          <ShieldAlert size={48} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <Dialog.Title className="text-2xl font-bold text-white mb-1">
Are you 18 years of age or older?
          </Dialog.Title>
          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>You must be of legal drinking age to purchase alcohol in the UK.</p>
            {/* <p className="font-semibold text-white text-lg">Are you 18 years of age or older?</p> */}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 pt-4">
          <button
            onClick={onConfirm}
            className="flex w-full justify-center rounded-xl bg-white px-6 py-4 text-sm font-bold text-[var(--eerie-black)] transition-all hover:bg-gray-100 active:scale-[0.98] shadow-md"
          >
            YES, I AM 18+
          </button>
          <button
            onClick={onReject}
            className="flex w-full justify-center rounded-xl border border-white/20 bg-transparent px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/20"
          >
            NO, I AM UNDER 18
          </button>
        </div>
        
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-medium">
          Responsible Drinking counts
        </p>
      </div>
    </BaseModal>
  );
}
