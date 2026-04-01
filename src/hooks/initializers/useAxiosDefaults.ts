"use client";
import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearAuthState } from "@/redux/Slices/authSlice";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";

function useAxiosDefaults({ accessToken }: { accessToken?: string }) {
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
        if (error.response?.status === 401) {
          console.warn("Unauthorized! Clearing session data...");
          
          // Clear Redux state
          dispatch(clearAuthState());
          
          // Wipe persistent storage (purge cache)
          if (persistor) {
            await persistor.purge();
          }

          // Redirect to home/login to force a fresh start
          router.push("/");
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts or token changes
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, dispatch, router]);
}

export default useAxiosDefaults;
