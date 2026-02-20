import { AxiosResponse } from "axios";

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


export interface AuthInterface {
  login: ({ payload }: TLoginService) => Promise<AxiosResponse<any, any>>;
}
