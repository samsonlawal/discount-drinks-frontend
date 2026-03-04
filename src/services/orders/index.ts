import axios from "axios";
import env from "@/config/env";
import { OrderInterface, TCreateOrderService } from "./types";

class Service implements OrderInterface {
  createOrder({ payload }: TCreateOrderService) {
    return axios.post(env.api.orders, payload, {
      withCredentials: true,
    });
  }
}

const OrderService = new Service();
export default OrderService;
