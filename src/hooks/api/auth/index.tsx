import { useState, useEffect } from "react";
import { TLogin, TRegister } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, setAuthState } from "@/redux/Slices/authSlice";
import { deleteFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import env from "@/config/env";
import axios, { AxiosError } from "axios";
import AuthService from "@/services/auth";
import { getErrorMessage } from "@/utils/errorUtils";
import { useRouter } from "next/navigation";
import router from "next/router";


// For logout to set the initial state to the empty
const INITIAL_APP_STATE = env.auth.INITIAL_APP_STATE;

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    console.log("Auth state:", auth);
  }, [auth]);

  const onLogin = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: { email: string; password: string };
    successCallback?: () => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await AuthService.login({ payload });
      // const profile_res = await accountService.getUserProfile({
      //   id: login_res?.data?.user?._id,
      //   accessToken: login_res?.data?.token,
      // });

      const user = {
        ...res?.data?.user
      };
      // console.log(res?.data)
      const accessToken = res?.data.token;

      dispatch(
        setAuthState({
          accessToken,
          //    refreshToken,
          //    expiresIn,
          user,
        }),
      );

      showSuccessToast({
        message: "Login success 🚀",
        description: res?.data?.description || "",
      });
      router.push("/products");
      setLoading(false);
    } catch (error: Error | AxiosError | any) {
      errorCallback?.({
        message: getErrorMessage(error, "An error occured!"),
        description: "",
      });
      setLoading(false);
    } finally {
    }
  };

  return { onLogin, loading };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter(); // <-- Added missing router initialization

  const onRegister = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: {
      name: string;
      username: string;
      email: string;
      password: string;
    };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string; description?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await AuthService.register({ payload });
      successCallback?.(res?.data?.message);
      router.push("/auth/sign-in");
    } catch (error: Error | any) {
      // If Next.js throws a redirect error, don't show it as an error toast
      if (error?.message === "NEXT_REDIRECT") return;
      
      const message = getErrorMessage(error, "An error occured!");
      errorCallback?.({ message });
    } finally {
      setLoading(false);
    }
  };

  return { onRegister, loading };
};


export const useLogout = () => {
  // const updateAppState = useUpdateAuthContext();
  const dispatch = useDispatch();

  const onLogout = async () => {
    // Navigate FIRST — this tears down the React tree immediately,
    // preventing the naked header/footer flash while async cleanup runs
    window.location.href = "/";

    // Clear Redux state
    dispatch(clearAuthState());

    // Purge persistent storage in the background (page is already navigating)
    const { persistor } = await import("@/redux/store");
    if (persistor) {
      await persistor.purge();
    }
  };

  return { onLogout };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onForgotPassword = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: { email: string };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await AuthService.forgotPassword({ payload });
      successCallback?.(res?.data?.message);
    } catch (error: Error | any) {
      const message = getErrorMessage(error, "An error occurred!");
      showErrorToast({ message });
      errorCallback?.({ message });
    } finally {
      setLoading(false);
    }
  };

  return { onForgotPassword, loading };
};

export const useVerifyCode = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onVerifyCode = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: { email: string; code: string };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await AuthService.verifyCode({ payload });
      successCallback?.(res?.data?.message);
    } catch (error: Error | any) {
      const message = getErrorMessage(error, "An error occurred!");
      showErrorToast({ message });
      errorCallback?.({ message });
    } finally {
      setLoading(false);
    }
  };

  return { onVerifyCode, loading };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onResetPassword = async ({
    payload,
    successCallback,
    errorCallback,
  }: {
    payload: {
      email: string;
      code: string;
      new_password: string;
      confirm_new_password: string;
    };
    successCallback?: (message: string) => void;
    errorCallback?: (props: { message?: string }) => void;
  }) => {
    setLoading(true);

    try {
      const res = await AuthService.resetPassword({ payload });
      successCallback?.(res?.data?.message);
    } catch (error: Error | any) {
      const message = getErrorMessage(error, "An error occurred!");
      showErrorToast({ message });
      errorCallback?.({ message });
    } finally {
      setLoading(false);
    }
  };

  return { onResetPassword, loading };
};
