import { useState, useEffect } from "react";
import { TLogin, TRegister } from "@/types";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, setAuthState } from "@/redux/Slices/authSlice";
import { deleteFromLocalStorage } from "@/utils/localStorage/AsyncStorage";
import env from "@/config/env";
import axios, { AxiosError } from "axios";
import AuthService from "@/services/auth";
// import accountService from "@/services/account";
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
      // console.log("error", error?.response?.data);
      errorCallback?.({
        message: error?.response?.data?.message || "An error occured!",
        description: error?.response?.data?.message || "",
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
      // console.log(register_res?.data?.message);
      successCallback?.(res?.data?.message);
      router.push("/auth/sign-in");
    } catch (error: Error | any) {
      let message = "An error occured!";

      // console.log("error?.response?.data", error?.response?.data);
      if (typeof error?.response?.data === "string") message = error?.response;

      if (typeof error?.response?.data === "string")
        message = error?.response?.data;
      if (
        typeof error?.response?.data === "object" &&
        Object.keys(error?.response?.data)?.length
      ) {
        message =
          error?.response?.data[Object.keys(error?.response?.data)?.[0]];
      }
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

  const onLogout = () => {
    dispatch(clearAuthState());
    deleteFromLocalStorage({ key: env.auth.PERSIST_AUTH_KEY });
  };

  return { onLogout };
};

// export const useForgotPassword = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const onForgotPassword = async ({
//     payload,
//     successCallback,
//     errorCallback,
//   }: {
//     payload: string;
//     successCallback?: (message: string) => void;
//     errorCallback?: (message?: string) => void;
//   }) => {
//     setLoading(true);

//     try {
//       const res = await AuthService.forgotPassword({
//         payload: { email: payload },
//       });
//       console.log(res?.data?.message);
//       successCallback?.(res?.data?.message);
//     } catch (error: Error | any) {
//       showErrorToast({
//         message:
//           error?.response?.data?.message || typeof error?.message === "string"
//             ? error?.message
//             : "An error occured!",
//         description: error?.response?.data?.description || "",
//       });
//       errorCallback?.(error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { onForgotPassword, loading };
// };

// export const useResetPassword = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const onResetPassword = async ({
//     payload,
//     successfulCallback,
//   }: {
//     payload: {
//       new_password: string;
//       confirm_new_password: string;
//       otp: number | null;
//     };
//     successfulCallback?: (message: string) => void;
//   }) => {
//     setLoading(true);
//     try {
//       const res = await AuthService.resetPassword({
//         payload,
//       });
//       successfulCallback?.(res?.data?.message);
//     } catch (error: Error | any) {
//       showErrorToast({
//         message:
//           error?.response?.data?.message || typeof error?.message === "string"
//             ? error?.message
//             : "An error occured!",
//         description: error?.response?.data?.description || "",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { onResetPassword, loading };
// };

// export const useActivateUser = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const onActivateUser = async ({
//     token,
//     successCallback,
//     errorCallback,
//   }: {
//     token: string;
//     successCallback?: (message: string) => void;
//     errorCallback?: (message?: string) => void;
//   }) => {
//     setLoading(true);

//     try {
//       const res = await AuthService.activateAccount(token);
//       console.log(res?.data?.message);
//       successCallback?.(res?.data?.message);
//     } catch (error: Error | any) {
//       showErrorToast({
//         message:
//           error?.response?.data?.message || typeof error?.message === "string"
//             ? error?.message
//             : "An error occured!",
//         description: error?.response?.data?.description || "",
//       });
//       errorCallback?.(error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { onActivateUser, loading };
// };
