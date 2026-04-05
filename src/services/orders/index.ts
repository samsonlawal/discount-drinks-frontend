import axios from "axios";
import env from "@/config/env";
import { OrderInterface, TCreateOrderService } from "./types";
import { store } from "@/redux/store";

class Service implements OrderInterface {
  private getAuthHeader() {
    const token = store.getState().auth.accessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  createOrder({ payload }: TCreateOrderService) {
    return axios.post(env.api.orders, payload, {
      headers: this.getAuthHeader(),
      withCredentials: true,
    });
  }

  createCheckout(payload: any) {
    return axios.post(env.api.checkout, payload, {
      headers: this.getAuthHeader(),
      withCredentials: true,
    });
  }

  getUserOrders(userId: string, query?: any) {
    return axios.get(`${env.api.orders}/user/${userId}`, {
      params: query,
      headers: this.getAuthHeader(),
      withCredentials: true,
    });
  }

  getOrderById(orderId: string) {
    return axios.get(`${env.api.orders}/${orderId}`, {
      headers: this.getAuthHeader(),
      withCredentials: true,
    });
  }
}

const OrderService = new Service();
export default OrderService;
