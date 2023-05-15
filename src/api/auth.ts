import axiosInstance from "./axiosInstance";
import { tokens } from "@/utils/jwtTokenStorage";
import {
  ForgotPassword,
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  ResetPassword,
  UserTypeResponseType,
  VerifyLoginToken,
  VerifyUser,
} from "./types/auth";
import {
  transformGetUserDetailsAPIResponse,
  transformGetUserTypeListAPIResponse,
} from "./transform/auth";
import { ErrorResult, SuccessResult } from "./types";
import { USER_ROLES } from "@/utils/enum";

// @desc register user and send code to email
export const registerUser = async (data: RegisterUser) => {
  const response = await axiosInstance.request<null>({
    url: "/register/",
    method: "POST",
    data,
  });

  return response;
};

export const verifyUser = async (data: VerifyUser) => {
  const response = await axiosInstance.request({
    url: "/verify/",
    method: "POST",
    data,
  });

  return response;
};

// fetch user types list
export const userTypesList = async (): Promise<
  SuccessResult<USER_ROLES> | ErrorResult
> => {
  const response = await axiosInstance.request<UserTypeResponseType>({
    url: "/user-types/",
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformGetUserTypeListAPIResponse(response.data),
    };
  }
  return response;
};

// fetch week days list
export const weekDaysList = async () => {
  const response = await axiosInstance.request({
    url: "/week-days/",
    method: "GET",
  });
  return response;
};

// fetch Subscription Plans List
export const subscriptionPlansList = async () => {
  const response = await axiosInstance.request({
    url: "/subscription-plans/",
    method: "GET",
  });
  return response;
};

// Login API
export const loginUser = async (data: LoginUser) => {
  const response = await axiosInstance.request<LoginUserResponse>({
    url: "/login/",
    method: "POST",
    data,
  });
  return response;
};

// verify Login Token API
export const verifyLoginToken = async (data: VerifyLoginToken) => {
  const response = await axiosInstance.request<LoginUserResponse>({
    url: "/verify-token/",
    method: "POST",
    data,
  });
  return response;
};

// Forgot password API
export const forgotPassword = async (data: ForgotPassword) => {
  const response = await axiosInstance.request<null>({
    url: "/forgot-password/",
    method: "POST",
    data,
  });
  return response;
};

// Reset password API
export const resetPassword = async (data: ResetPassword) => {
  const response = await axiosInstance.request<null>({
    url: "/forgot-password-confirm/",
    method: "POST",
    data,
  });
  return response;
};

// Get User Details
export const getCurrentUserDetails = async () => {
  const response = await axiosInstance.request({
    url: "/change-profile-details/",
    method: "GET",
  });
  return response;
};

// Get Followings
export const getFollowings = async () => {
  const response = await axiosInstance.request({
    url: "/following/",
    method: "GET",
  });
  return response;
};

// Get Followers
export const getFollowers = async () => {
  const response = await axiosInstance.request({
    url: "/follower/",
    method: "GET",
  });
  return response;
};

// Logout Function
export const handleLogout = async () => {
  tokens.removeAccessToken();
  window.location.reload();
};

// export const getUserDetailsAPI = async (): Promise<
//   SuccessResult<USER> | ErrorResult
// > => {
//   const res = await axiosInstance.request<GetUserDetailsAPIResponse>({
//     url: "test",
//     method: "GET",
//   });
//   if (res.remote === "success") {
//     return {
//       remote: "success",
//       data: transformGetUserDetailsAPIResponse(res.data),
//     };
//   }
//   return res;
// };
