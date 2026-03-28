"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MobileBackButton from "../MobileBackButton";
import { showSuccessToast } from "@/utils/toaster";

export default function ProfileSettingsPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: (user as any)?.phone || "",
    gender: (user as any)?.gender || "",
    dateOfBirth: (user as any)?.dateOfBirth || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: wire up to a PATCH /profile endpoint
    setTimeout(() => {
      setIsSaving(false);
      showSuccessToast({ message: "Profile updated", description: "Your changes have been saved." });
    }, 800);
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="Account Settings" />

      <div className="hidden md:block">
        <h2 className="text-2xl mb-2" style={{ fontSize: "24px", fontWeight: 600, color: "#111827" }}>
          Account Settings
        </h2>
      </div>

      <form onSubmit={handleSave} className="max-w-lg mt-4 space-y-5">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        {/* Username */}
        <div>
          <label className={labelClass}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="@username"
            className={inputClass}
          />
        </div>

        {/* Email — read-only */}
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
          />
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed here. Contact support.</p>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+44 7700 000000"
            className={inputClass}
          />
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
