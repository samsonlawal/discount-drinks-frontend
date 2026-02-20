import axios from "axios";
import env from "@/config/env";

import { IFetchUserQuery } from "@/types";

class Service {
  fetchUsers(query?: IFetchUserQuery) {
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

  createUser(data: any) {
    return axios.post(env.api.users, data);
  }

  updateUser({ id, ...data }: { id: string; [key: string]: any }) {
    return axios.put(`${env.api.users}/${id}`, data);
  }

  deleteUser({ id }: { id: string }) {
    return axios.delete(`${env.api.users}/${id}`);
  }
}

const UsersService = new Service();
export default UsersService;
