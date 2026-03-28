"use client";

import React, { useState } from "react";
import { BaseModal } from "./BaseModal";
import { useCreateUserAddress } from "@/hooks/api/users";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAddress: any) => void;
}

export function AddAddressModal({ isOpen, onClose, onSuccess }: AddAddressModalProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const { createAddress, loading: isCreating } = useCreateUserAddress();

  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postCode: "",
    phone: "",
    isDefault: true, // Usually default if they are adding it during checkout for the first time
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user?.id || (user as any)?._id;
    if (!userId) return;

    await createAddress({
      userId,
      data: formData,
      successCallback: (newAddress) => {
        onSuccess(newAddress);
        onClose();
      },
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="md:min-w-[500px] p-6">
      <h2 className="text-xl font-bold mb-6">Add Delivery Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
          <input 
            required 
            type="text" 
            name="addressLine1" 
            value={formData.addressLine1} 
            onChange={handleInputChange} 
            placeholder="Street address" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
          <input 
            type="text" 
            name="addressLine2" 
            value={formData.addressLine2} 
            onChange={handleInputChange} 
            placeholder="Apartment, suite, etc." 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              required 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State / County</label>
            <input 
              required 
              type="text" 
              name="state" 
              value={formData.state} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
            <input 
              required 
              type="text" 
              name="postCode" 
              value={formData.postCode} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              required 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isCreating}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 font-bold"
          >
            {isCreating ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
