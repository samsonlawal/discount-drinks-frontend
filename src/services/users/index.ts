import axios from "axios";
import env from "@/config/env";

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
    return axios.get(`${env.api.users}/${userId}`);
  }

  createUser(data: ICreateUserPayload) {
    return axios.post(env.api.users, data);
  }

  updateUser({ id, ...data }: IUpdateUserPayload) {
    return axios.put(`${env.api.users}/${id}`, data);
  }

  deleteUser({ id }: { id: string }) {
    return axios.delete(`${env.api.users}/${id}`);
  }
}

const UsersService = new Service();
export default UsersService;
