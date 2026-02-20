import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import UsersService from "@/services/users";

// Hook for fetching users
export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await UsersService.fetchUsers();
      setUsers(res?.data?.data || []);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch users",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, users, fetchUsers };
};

// Hook for fetching a single user by ID
export const useGetUserById = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const fetchUser = async (id: string) => {
    setLoading(true);
    try {
      const res = await UsersService.getUserById({ userId: id });
      setUser(res?.data?.data || null);
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch user",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, fetchUser };
};

// Hook for creating a user
export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);

  const createUser = async ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await UsersService.createUser(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "User created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create user",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createUser };
};

// Hook for updating a user
export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);

  const updateUser = async ({
    data,
    successCallback,
  }: {
    data: { id: string; [key: string]: any };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await UsersService.updateUser(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "User updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update user",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateUser };
};

// Hook for deleting a user
export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await UsersService.deleteUser(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "User deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete user",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};
