import { USER_ROLES } from "@/utils/enum";

export type RegisterUser = {
  email: string;
};

export type VerifyUser = {
  email: string;
  verification_code: string;
};

export type LoginUser = {
  email: string;
  password?: string;
};

export type LoginUserResponse = {
  message?: string;
  default_profile?: USER_ROLES;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
  password_confirm: string;
  token?: string;
  uid?: string;
};

export type VerifyLoginToken = {
  token: string;
  uid: string;
};
