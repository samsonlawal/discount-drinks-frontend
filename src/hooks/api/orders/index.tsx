import { useState, useCallback } from "react";
import { OrderPayload } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import OrderService from "@/services/orders";
import { AxiosError } from "axios";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onCreateOrder = useCallback(async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: OrderPayload;
    successCallback?: (data: any) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);
    console.log("🚀 [useCreateOrder] Initiating order creation...");
    try {
      const res = await OrderService.createOrder({ payload });
      console.log("✅ [useCreateOrder] Order created successfully.", res.data);

      showSuccessToast({
        message: "Order placed successfully 🚀",
        description: res?.data?.message || "",
      });
      successCallback?.(res.data);
    } catch (error: Error | AxiosError | any) {
      console.error("[useCreateOrder] Order creation failed.", error);
      errorCallback?.({
        message: error?.response?.data?.message || "Failed to place order!",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { onCreateOrder, loading };
};

export const useGetUserOrders = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchUserOrders = useCallback(async (userId: string) => {
    if (!userId) {
      console.warn("useGetUserOrders: fetch called with empty userId");
      return;
    }
    setLoading(true);
    console.log("useGetUserOrders: fetching orders for userId", userId);
    try {
      const res = await OrderService.getUserOrders(userId);
      console.log("useGetUserOrders: SUCCESS API Response", res.data);
      
      // Extract orders array from various possible backend formats
      const rawData = res.data?.data || res.data?.orders || res.data?.order || res.data;
      const finalOrders = Array.isArray(rawData) ? rawData : [];
      
      console.log("useGetUserOrders: Final Orders", finalOrders);
      setOrders(finalOrders);
    } catch (error: any) {
      console.error("[useGetUserOrders] Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUserOrders, orders, loading };
};

export const useGetOrderDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);

  const fetchOrderDetails = useCallback(async (orderId: string) => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await OrderService.getOrderById(orderId);
      const data = res.data?.data || res.data?.order || res.data;
      setOrder(data);
    } catch (error: any) {
      console.error("[useGetOrderDetails] Failed to fetch order details:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchOrderDetails, order, loading };
};
