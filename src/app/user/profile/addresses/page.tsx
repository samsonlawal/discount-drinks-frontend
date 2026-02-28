"use client";

import React, { useState } from "react";
import { MapPin, Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";
import MobileBackButton from "../MobileBackButton";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
  isDefault: boolean;
}

export default function ProfileAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "London",
      county: "Greater London",
      postcode: "SW1A 1AA",
      phone: "+44 7700 900077",
      isDefault: true,
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Address, "id">>({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    phone: "",
    isDefault: false,
  });

  const handleOpenForm = (address?: Address) => {
    if (address) {
      setEditingId(address.id);
      setFormData({
        firstName: address.firstName,
        lastName: address.lastName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || "",
        city: address.city,
        county: address.county,
        postcode: address.postcode,
        phone: address.phone,
        isDefault: address.isDefault,
      });
    } else {
      setEditingId(null);
      setFormData({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        county: "",
        postcode: "",
        phone: "",
        isDefault: addresses.length === 0, // Auto-default if it's the first one
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let updatedAddresses = [...addresses];

    // If setting as default, remove default from all others
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({ ...addr, isDefault: false }));
    }

    if (editingId) {
      // Update existing
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === editingId ? { ...formData, id: editingId } : addr
      );
    } else {
      // Create new
      const newAddress: Address = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9), // Simple UUID for mock
      };
      updatedAddresses.push(newAddress);
    }

    // Sort to keep default at the top
    updatedAddresses.sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1));

    setAddresses(updatedAddresses);
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    const newAddresses = addresses.filter((addr) => addr.id !== id);
    // If we deleted the default, make the first remaining one default
    if (newAddresses.length > 0 && addresses.find(a => a.id === id)?.isDefault) {
       newAddresses[0].isDefault = true;
    }
    setAddresses(newAddresses);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="" />

      <div className="flex justify-between items-center mb-4 hidden md:flex">
        <h2 className="text-2xl font-semibold text-gray-900">Addresses</h2>
        {!isFormOpen && (
          <button onClick={() => handleOpenForm()} className="flex items-center justify-center gap-1 px-4 py-2.5 bg-[var(--eerie-black)] text-[white] text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
            <Plus size={18} />
            Add New
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <input required type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} placeholder="Street address, P.O. box, company name, c/o" className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 <span className="text-gray-400 font-normal ml-1">(Optional)</span></label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} placeholder="Apartment, suite, unit, building, floor, etc." className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">County / State</label>
                <input required type="text" name="county" value={formData.county} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input required type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-white !border !border-solid !border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:!border-transparent outline-none transition-all text-gray-900" />
            </div>

            <div className="pt-2 pb-4">
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} className="w-4 h-4 text-gray-900 !border !border-solid !border-gray-300 rounded focus:ring-gray-900" />
                <span className="text-sm font-medium text-gray-900">Set as default shipping address</span>
              </label>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
              <button type="button" onClick={handleCloseForm} className="flex items-center justify-center px-6 py-2.5 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">Cancel</button>
              <button type="submit" className="flex items-center justify-center px-6 py-2.5 bg-[#1a1a1a] text-white rounded-lg hover:bg-black text-sm font-medium transition-colors shadow-sm">Save Address</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Mobile Add Button */}
          <div className="md:hidden mb-6 flex justify-between items-center">
             <h2 className="text-2xl font-semibold text-gray-900">Addresses</h2>
          <button onClick={() => handleOpenForm()} className="flex items-center justify-center gap-1 px-4 py-2.5 bg-[var(--eerie-black)] text-[white] text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
            <Plus size={18} />
            Add New
          </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No addresses saved</h3>
              <p className="text-gray-500 mb-6">You haven't saved any delivery addresses yet.</p>
              <button onClick={() => handleOpenForm()} className="btn btn-outline mx-auto text-sm h-10 px-6">Add your first address</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className={`p-5 rounded-xl border relative transition-all ${address.isDefault ? 'border-gray-200 bg-var(--eerie) ' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
                  
                  {address.isDefault && (
                    <span className="inline-block bg-black text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded mb-3">
                      Default
                    </span>
                  )}
                  
                  <div className="absolute top-4 right-4 flex gap-1">
                     <button onClick={() => handleOpenForm(address)} className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                        <Edit2 size={16} />
                     </button>
                     <button onClick={() => handleDelete(address.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 size={16} />
                     </button>
                  </div>

                  {/* <h3 className="font-semibold text-gray-900 text-lg mb-1">{address.firstName} {address.lastName}</h3> */}
                  
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.county} {address.postcode}</p>
                    {/* <p className="pt-2 flex items-center gap-1">
                      <span className="text-gray-400">T:</span> {address.phone}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
