import { useState, useCallback } from "react";
import { OrderPayload, PaginationMetadata } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { getErrorMessage } from "@/utils/errorUtils";
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
      
      const backendMessage = getErrorMessage(error, "Failed to place order!");
      
      showErrorToast({
        message: "Order Failed",
        description: backendMessage,
      });

      errorCallback?.({
        message: backendMessage,
        description: backendMessage,
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
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);

  const fetchUserOrders = useCallback(async (userId: string, query?: Record<string, string | number>) => {
    if (!userId) {
      console.warn("useGetUserOrders: fetch called with empty userId");
      return;
    }
    setLoading(true);
    console.log("useGetUserOrders: fetching orders for userId", userId, "with query", query);
    try {
      const res = await OrderService.getUserOrders(userId, query);
      console.log("useGetUserOrders: SUCCESS API Response", res.data);
      
      // Extract orders and pagination from backend format: { success, data, pagination }
      const finalOrders = Array.isArray(res.data?.data) ? res.data.data : [];
      const paginationData = res.data?.pagination || null;
      
      console.log("useGetUserOrders: Final Orders", finalOrders);
      setOrders(finalOrders);
      setPagination(paginationData);
      return finalOrders;
    } catch (error: any) {
      console.error("[useGetUserOrders] Failed to fetch orders:", error);
      setOrders([]);
      setPagination(null);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUserOrders, orders, pagination, loading };
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
      return data;
    } catch (error: any) {
      console.error("[useGetOrderDetails] Failed to fetch order details:", error);
      setOrder(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchOrderDetails, order, loading };
};
