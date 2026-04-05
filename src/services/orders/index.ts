import axios from "axios";
import env from "@/config/env";
import { OrderInterface, TCreateOrderService } from "./types";
import { store } from "@/redux/store";


    const token = store.getState().auth.accessToken;

class Service implements OrderInterface {
  createOrder({ payload }: TCreateOrderService) {
    return axios.post(env.api.orders, payload, {

      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },

    });
  }

  createCheckout(payload: any) {
    return axios.post(env.api.checkout, payload, {

      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },

    })
  }

  getUserOrders(userId: string, query?: any) {
    return axios.get(`${env.api.orders}/user/${userId}`, {

      params: query,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },

    });
  }

  getOrderById(orderId: string) {
    return axios.get(`${env.api.orders}/${orderId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },

    });
  }
}

const OrderService = new Service();
export default OrderService;
