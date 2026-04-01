import axios from "axios";
import env from "@/config/env";
import { store } from "@/redux/store";

interface ICreateUserPayload {
  name?: string;
  email: string;
  role?: string;
  status?: string;
  [key: string]: unknown;
}

interface IUpdateUserPayload {
  id: string;
  [key: string]: unknown;
}

class Service {
  fetchUsers(query?: Record<string, string | number>) {
    const { search, page, pageSize } = query || {};
    return axios.get(env.api.users, {
      params: {
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(pageSize ? { pageSize } : {}),
      },
      withCredentials: true,
    });
  }

  getUserById({ userId }: { userId: string }) {
    return axios.get(`${env.api.users}/${userId}`, {
      withCredentials: true,
    });
  }

  getUserAddresses({ userId }: { userId: string }) {
    const token = store.getState().auth.accessToken;
    return axios.get(`${env.api.users}/${userId}/addresses`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createUser(data: ICreateUserPayload) {
    return axios.post(env.api.users, data);
  }

  updateUser({ id, ...data }: IUpdateUserPayload) {
    return axios.put(`${env.api.users}/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteUser({ id }: { id: string }) {
    return axios.delete(`${env.api.users}/${id}`, {
      withCredentials: true,
    });
  }

  deleteUserAddress({ userId, addressId }: { userId: string; addressId: string }) {
    const token = store.getState().auth.accessToken;
    return axios.delete(`${env.api.users}/${userId}/addresses/${addressId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createUserAddress({ userId, data }: { userId: string; data: any }) {
    const token = store.getState().auth.accessToken;
    return axios.post(`${env.api.users}/${userId}/addresses`, data, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateUserAddress({ userId, addressId, data }: { userId: string; addressId: string; data: any }) {
    const token = store.getState().auth.accessToken;
    return axios.put(`${env.api.users}/${userId}/addresses/${addressId}`, data, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateProfile({ userId, data }: { userId: string; data: any }) {
    return axios.put(`${env.api.users}/${userId}`, data, {
      withCredentials: true,
    });
  }

  uploadProfileImage({ userId, formData }: { userId: string; formData: FormData }) {
    return axios.post(`${env.api.users}/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  }
}

const UsersService = new Service();
export default UsersService;
