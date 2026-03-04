import { OrderPayload, OrderResponse } from "@/types";

export interface TCreateOrderService {
  payload: OrderPayload;
}

export interface OrderInterface {
  createOrder(data: TCreateOrderService): Promise<{ data: OrderResponse }>;
}
