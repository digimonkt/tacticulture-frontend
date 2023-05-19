import axiosInstance from "./axiosInstance";
import { tokens } from "@/utils/jwtTokenStorage";
import {
  ForgotPassword,
  LoginUser,
  LoginUserResponse,
  RegisterUser,
  ResetPassword,
  VerifyLoginToken,
  VerifyUser,
} from "./types/auth";

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

// fetch week days list
export const weekDaysList = async () => {
  const response = await axiosInstance.request({
    url: "/week-days/",
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
};
