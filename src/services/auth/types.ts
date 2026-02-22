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

export type TResetPasswordService = {
  payload: {
    new_password: string;
    confirm_new_password: string;
    otp: number | null;
  };
};

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthInterface {
  login: ({ payload }: TLoginService) => Promise<AxiosResponse<AuthResponse>>;
}
