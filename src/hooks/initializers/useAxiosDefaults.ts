"use client";
import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearAuthState } from "@/redux/Slices/authSlice";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";

import { showErrorToast } from "@/utils/toaster";

function useAxiosDefaults({ accessToken, user }: { accessToken?: string; user?: any }) {
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    // 1. GLOBAL DEFAULTS
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post["Content-Type"] = "application/json";

    // 2. REQUEST INTERCEPTOR: Inject Bearer Token
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          // If no token exists, ensure the header is removed from subsequent requests
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 3. RESPONSE INTERCEPTOR: Handle 401 Unauthorized
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If we get a 401, it means the session/token is invalid or expired
        // But do not redirect / clear if we are in the middle of a login attempt
        const isLoginRequest = error.config?.url?.includes("/login") || error.config?.url?.includes("/sign-in") || false;
        
        if (error.response?.status === 401 && !isLoginRequest) {
          console.warn("Unauthorized! Clearing session data...");

          // 1. Notify the user
          showErrorToast({ 
            message: "Session Expired", 
            description: "Your session has timed out. Please sign in again to continue." 
          });

          // 2. Cart Handover: Preserve items by copying to guest cart
          const userId = user?.id || user?._id;
          if (userId) {
            const userCartKey = `discountdrinks_cart_${userId}`;
            const guestCartKey = "discountdrinks_cart_guest";
            const userCartData = localStorage.getItem(userCartKey);
            
            if (userCartData) {
              localStorage.setItem(guestCartKey, userCartData);
            }
          }
          
          // 3. Clear Redux state
          dispatch(clearAuthState());
          
          // 4. Wipe persistent storage (purge cache)
          if (persistor) {
            await persistor.purge();
          }

          // 5. Redirect to sign-in with callback URL to preserve context
          const currentPath = window.location.pathname;
          const callbackParam = currentPath !== "/" ? `?callbackUrl=${encodeURIComponent(currentPath)}` : "";
          router.push(`/auth/sign-in${callbackParam}`);
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts or token changes
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, user, dispatch, router]);
}

export default useAxiosDefaults;
