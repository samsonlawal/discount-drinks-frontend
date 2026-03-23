import { useState } from "react";
import { OrderPayload } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import OrderService from "@/services/orders";
import { AxiosError } from "axios";



export const useCreateOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onCreateOrder = async ({
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
    console.log("📦 [useCreateOrder] Payload:", JSON.stringify(payload, null, 2));

    try {
      const res = await OrderService.createOrder({ payload });
      console.log("✅ [useCreateOrder] Order created successfully.");
      console.log("📥 [useCreateOrder] Response:", res.data);

      showSuccessToast({
        message: "Order placed successfully 🚀",
        description: res?.data?.message || "",
      });
      successCallback?.(res.data);
    } catch (error: Error | AxiosError | any) {
      console.error("[useCreateOrder] Order creation failed.");
      if (error?.response) {
        console.error("[useCreateOrder] Error Response Data:", error.response.data);
        console.error("[useCreateOrder] Error Response Status:", error.response.status);
      } else {
        console.error("[useCreateOrder] Error Object:", error);
      }

      errorCallback?.({
        message: error?.response?.data?.message || "Failed to place order!",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setLoading(false);
      console.log("[useCreateOrder] Request finished.");
    }
  };

  return { onCreateOrder, loading };
};
