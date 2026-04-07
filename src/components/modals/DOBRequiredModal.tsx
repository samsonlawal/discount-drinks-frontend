"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cake, Loader2 } from "lucide-react";
import { BaseModal } from "./BaseModal";
import { useUpdateProfile } from "@/hooks/api/users";
import { isAtLeast18 } from "@/utils/ageUtils";
import { showErrorToast } from "@/utils/toaster";

interface DOBRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (dob: string) => void;
}

export function DOBRequiredModal({
  isOpen,
  onClose,
  onSuccess,
}: DOBRequiredModalProps) {
  const [dob, setDob] = useState("");
  const { updateProfile, loading } = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) {
      showErrorToast({ message: "Please select your date of birth" });
      return;
    }

    if (!isAtLeast18(dob)) {
      showErrorToast({ 
        message: "Age Requirement", 
        description: "You must be at least 18 years old to proceed." 
      });
      return;
    }

    const res = await updateProfile({ dob });
    if (res) {
      onSuccess(dob);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[500px] bg-white p-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--ocean-green)/10 text-(--ocean-green)">
          <Cake size={40} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <Dialog.Title className="text-2xl font-bold text-(--eerie-black) mb-2">
            Date of Birth Required
          </Dialog.Title>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            To comply with legal requirements for alcohol sales, please provide your date of birth before checking out.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6 pt-4">
          <div>
            <label htmlFor="dob-input" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              id="dob-input"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:border-(--ocean-green) transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading || !dob}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-(--eerie-black) px-6 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Updating Profile..." : "Verify & Continue"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex w-full justify-center rounded-xl border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 active:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
        
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-medium">
          Secure Verification
        </p>
      </div>
    </BaseModal>
  );
}
