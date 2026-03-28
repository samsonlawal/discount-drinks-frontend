import { OrderPayload, OrderResponse } from "@/types";

export interface TCreateOrderService {
  payload: OrderPayload;
}

export interface OrderInterface {
  createOrder(data: TCreateOrderService): Promise<{ data: OrderResponse }>;
  createCheckout(payload: any): Promise<any>;
  getUserOrders(userId: string): Promise<any>;
}
