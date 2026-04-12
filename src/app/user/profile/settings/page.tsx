"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setAuthState } from "@/redux/Slices/authSlice";
import MobileBackButton from "../MobileBackButton";
import { useUpdateProfile, useUploadProfileImage, useGetUserById } from "@/hooks/api/users";
import { User as UserIcon, Camera, Loader2, ChevronDown, Check } from "lucide-react";
import { UploadImageModal } from "@/components/modals/UploadImageModal";
import * as Select from "@radix-ui/react-select";

// Helper to format date for input type="date" (expects YYYY-MM-DD)
const formatDateForInput = (dateString: string | null | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; 
  return date.toISOString().split("T")[0];
};

export default function ProfileSettingsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { updateProfile, loading: isSaving } = useUpdateProfile();
  const { uploadImage, loading: isUploading } = useUploadProfileImage();
  const { fetchUser, loading: isFetching } = useGetUserById();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: (user as any)?.phone || (user as any)?.phoneNumber || "",
    gender: (user as any)?.gender || "",
    dob: formatDateForInput((user as any)?.dob),
  });

  // Fetch full user data on mount to ensure we have phone/dob
  useEffect(() => {
    const userId = user?.id || user?._id || (user as any)?.userId;
    if (userId) {
      fetchUser(userId).then((fetchedUser) => {
        if (fetchedUser) {
          dispatch(setAuthState({ 
            user: user ? { ...user, ...fetchedUser } : fetchedUser 
          }));
        }
      });
    }
  }, [dispatch, user?.id, user?._id, (user as any)?.userId]);

  // Sync state if user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        phone: (user as any)?.phone || (user as any)?.phoneNumber || "",
        gender: (user as any)?.gender || "",
        dob: formatDateForInput((user as any)?.dob),
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value.toLowerCase() }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file);
    if (result) {
      setIsModalOpen(false); // Close on success
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const profileImage = (user as any)?.profileImage || (user as any)?.image;

  return (
    <div className="animate-in fade-in duration-300">
      <MobileBackButton title="Account Settings" />

      <div className="hidden md:block">
        <h2 className="text-2xl mb-2" style={{ fontSize: "24px", fontWeight: 600, color: "#111827" }}>
          Account Settings
        </h2>
      </div>

      <div className="max-w-lg mt-8">
        {/* Profile Image Section */}
        <div className="mb-10 flex flex-col items-center group relative w-fit mx-auto md:mx-0">
          <div
            onClick={handleUploadClick}
            className="w-24 h-24 rounded-full border-2 border-[var(--cultured)] overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer relative group transition-all"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt={user.name}
                className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
              />
            ) : (
              <UserIcon size={40} className="text-gray-300" strokeWidth={1} />
            )}

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
          </div>

          <div className="mt-3 text-center md:text-left">
            <button
              type="button"
              onClick={handleUploadClick}
              className="text-xs font-semibold text-(--ocean-green) hover:underline"
            >
              {profileImage ? "Change Photo" : "Add Photo"}
            </button>
            <p className="text-[10px] text-gray-400 mt-1">Update your professional image.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
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

            <div className="md:col-span-2">
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
              />
              <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed here. Contact support.</p>
            </div>

            {/* Gender with Radix Select */}
            <div>
              <label className={labelClass}>Gender</label>
              <Select.Root value={formData.gender} onValueChange={handleGenderChange}>
                <Select.Trigger
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors flex items-center justify-between group"
                  aria-label="Gender"
                >
                  <Select.Value placeholder="Select Gender" />
                  <Select.Icon>
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="z-[1300] overflow-hidden bg-white rounded-xl border border-gray-100 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.Viewport className="p-1 min-w-[var(--radix-select-trigger-width)]">
                      {[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ].map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="relative flex items-center px-8 py-2.5 text-sm text-gray-700 font-medium rounded-lg cursor-pointer outline-none hover:bg-gray-50 focus:bg-gray-50 transition-colors data-[state=checked]:text-(--ocean-green)"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2.5 inline-flex items-center justify-center">
                            <Check size={14} strokeWidth={3} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full h-[60px] bg-(--eerie-black) text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving && <Loader2 size={18} className="animate-spin" />}
              {isSaving ? "Saving Settings..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Image Upload Modal */}
      <UploadImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentImage={profileImage}
        onUpload={handleImageUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
