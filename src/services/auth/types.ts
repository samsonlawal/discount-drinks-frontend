import { AxiosResponse } from "axios";
import { User } from "@/types";

export type TRegisterService = {
  payload: {
    name: string;
    email: string;
    username: string;
    password: string;
    // terms: boolean;
  };

  // assignee: TAssignee;
  // workspace_id: string;
  // deadline: string;
};

export type TLoginService = {
  payload: {
    email: string;
    password: string;
  };
};

export type TActivateAccountService = {
  token: string;
};

export type TForgotPasswordService = {
  payload: {
    email: string;
  };
};

export type TVerifyCodeService = {
  payload: {
    email: string;
    code: string;
  };
};

export type TResetPasswordService = {
  payload: {
    email: string;
    code: string;
    new_password: string;
    confirm_new_password: string;
  };
};

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthInterface {
  login: ({ payload }: TLoginService) => Promise<AxiosResponse<any>>;
  register: ({ payload }: TRegisterService) => Promise<AxiosResponse<any>>;
  forgotPassword: ({ payload }: TForgotPasswordService) => Promise<AxiosResponse<any>>;
  verifyCode: ({ payload }: TVerifyCodeService) => Promise<AxiosResponse<any>>;
  resetPassword: ({ payload }: TResetPasswordService) => Promise<AxiosResponse<any>>;
}
