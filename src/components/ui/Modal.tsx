"use client";

import React, { useEffect, useState } from "react";
import { X, Trash } from "lucide-react";

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
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 200);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isOpen && !isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 py-10 sm:px-6 transition-all duration-300 ${
        isOpen
          ? "bg-black/50 backdrop-blur-sm opacity-100"
          : "bg-black/0 opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white h-fit px-[28px] py-10 rounded-2xl flex flex-col gap-4 w-[90%] max-w-md transition-all duration-300 transform justify-center items-center ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        // style={{ padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >

        <Trash size={60} className="text-[var(--eerie-black)] font-400 color-[red]" strokeWidth={1.5}/>

        <div className="flex flex-col items-center justify-between gap-4 w-[100%]">

        <div className="flex flex-col items-center justify-between w-[100%] text-center">
          <h2 className="text-center w-full font-500 text-[var(--eerie-black)]" style={{ fontSize: "1.25rem"}}>
            {title}
          </h2>
          {/* <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button> */}

        <div className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
          {message}
        </div>
        </div>
  
        </div>




        <div className="flex flex-row w-[100%] items-center justify-end gap-3 pt-4">
          {type === "confirm" && (
            <button
              onClick={onClose}
              className="py-2 rounded-sm text-[14px] text-[var(--eerie-black)] hover:bg-[var(--eerie-black)] hover:text-white transition-all duration-300 px-4 border border-[var(--eerie-black)]"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              if (type === "alert") onClose();
            }}
            className="py-2 px-4 bg-[var(--eerie-black)] border border-[var(--eerie-black)] rounded-sm text-white text-[14px] hover:bg-[var(--eerie-black)]/90"
          >
            {type === "alert" ? "OK" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
