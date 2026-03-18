"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2, AlertTriangle } from "lucide-react";

export type ModalType = "alert" | "confirm";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: React.ReactNode;
  type?: ModalType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = "alert",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 z-[1200] bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <Dialog.Content 
          className="fixed left-[50%] top-[50%] z-[1201] w-[90%] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-8 shadow-2xl transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex flex-col items-center gap-6">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${type === 'confirm' ? 'bg-red-50 text-(--ocean-green)' : 'bg-blue-50 text-blue-600'}`}>
              {type === 'confirm' ? (
                <Trash2 size={32} strokeWidth={1.5} />
              ) : (
                <AlertTriangle size={32} strokeWidth={1.5} />
              )}
            </div>

            <div className="text-center">
              <Dialog.Title className="text-xl font-semibold text-[var(--eerie-black)]">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-500 leading-relaxed">
                {message}
              </Dialog.Description>
            </div>

            <div className="flex w-full gap-3 pt-2 justify-center">
              {type === "confirm" && (
                <Dialog.Close asChild>
                  <button
                    className="flex w-fit rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    {cancelText}
                  </button>
                </Dialog.Close>
              )}
              <button
                onClick={() => {
                  if (onConfirm) onConfirm();
                  if (type === "alert") onClose();
                }}
                className={`flex w-fit rounded-md px-4 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] ${
                  type === 'confirm' ? 'bg-(--ocean-green)' : 'bg-(--eerie-black)'
                }`}
              >
                {type === "alert" ? "OK" : confirmText}
              </button>
            </div>
          </div>

          {/* <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 opacity-70 transition-opacity hover:bg-gray-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
