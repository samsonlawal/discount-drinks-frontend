import axios from "axios";
import env from "@/config/env";
import { OrderInterface, TCreateOrderService } from "./types";

class Service implements OrderInterface {
  createOrder({ payload }: TCreateOrderService) {
    return axios.post(env.api.orders, payload, {
      withCredentials: true,
    });
  }

  createCheckout(payload: any) {
    return axios.post(env.api.checkout, payload, {
      withCredentials: true,
    })
  }

  getUserOrders(userId: string, query?: any) {
    return axios.get(`${env.api.orders}/user/${userId}`, {
      params: query,
      withCredentials: true,
    });
  }

  getOrderById(orderId: string) {
    return axios.get(`${env.api.orders}/${orderId}`, {
      withCredentials: true,
    });
  }
}

const OrderService = new Service();
export default OrderService;
