"use client";

import React, { useState, useRef } from "react";
import { BaseModal } from "./BaseModal";
import { Camera, Loader2, User as UserIcon, Upload, X } from "lucide-react";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export function UploadImageModal({
  isOpen,
  onClose,
  currentImage,
  onUpload,
  isUploading,
}: UploadImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile);
      // Reset after success is handled by the caller closing the modal
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} className="bg-white">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Update Profile Photo</h3>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isUploading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Preview Circle */}
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="w-32 h-32 rounded-full border-2 border-[var(--cultured)] overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer relative group mb-6 transition-all"
        >
          {previewUrl || currentImage ? (
            <img 
              src={previewUrl || currentImage} 
              alt="Preview" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <UserIcon size={56} className="text-gray-300" strokeWidth={1} />
          )}
          
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera size={24} className="text-white" />
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Loader2 size={32} className="text-(--ocean-green) animate-spin" />
            </div>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        <p className="text-sm text-gray-500 text-center mb-8">
          {selectedFile ? selectedFile.name : "Select a professional photo to update your profile."}
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-11 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            {selectedFile ? "Change Image" : "Choose Image"}
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full h-11 bg-(--eerie-black) text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
