import axios from "axios";
import env from "@/config/env";
import {
  AuthInterface,
  TLoginService,
  TRegisterService,
  TForgotPasswordService,
  TVerifyCodeService,
  TResetPasswordService,
  TRefreshToken
} from "./types";

class Service implements AuthInterface {
 login({ payload }: TLoginService) {
    return axios.post(env.api.auth + "/login", payload, {
      withCredentials: true,
    });
  }

  refreshToken({payload}: TRefreshToken) {
    return axios.post(env.api.auth + "/refresh-token", payload)
  }

  register({ payload }: TRegisterService) {
    return axios.post(env.api.auth + "/register", payload);
  }

  forgotPassword({ payload }: TForgotPasswordService) {
    return axios.post(env.api.auth + "/forgot-password", payload);
  }

  verifyCode({ payload }: TVerifyCodeService) {
    return axios.post(env.api.auth + "/verify-code", payload);
  }

  resetPassword({ payload }: TResetPasswordService) {
    return axios.post(env.api.auth + "/reset-password", payload);
  }
}

const AuthService = new Service();
export default AuthService;
