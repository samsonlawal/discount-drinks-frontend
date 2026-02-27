"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

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
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen
          ? "bg-black/50 backdrop-blur-sm opacity-100"
          : "bg-black/0 opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl flex flex-col gap-10 w-[90%] max-w-md transition-all duration-300 transform ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        style={{ padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >

        <div className="flex flex-col gap-2 items-start justify-between w-[100%]">

        <div className="flex items-center justify-between w-[100%]">
          <h2 id="modal-title" className="h3" style={{ fontSize: "1.25rem", margin: 0 }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>


        </div>
                          <div className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
          {message}
        </div>
        </div>




        <div className="flex items-center justify-end gap-3 pt-4 ">
          {type === "confirm" && (
            <button
              onClick={onClose}
              className="btn btn-outline py-3 px-4 !h-[50px]"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              if (type === "alert") onClose();
            }}
            className="btn btn-primary py-3 px-4 !h-[50px]"
          >
            {type === "alert" ? "OK" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
