import axiosInstance from "./axiosInstance";
import { tokens } from "@/utils/jwtTokenStorage";

// @desc register user and send code to email
export const registerUser = async (userEmail) => {
  const data = {
    email: userEmail,
  };

  const response = await axiosInstance.request({
    url: "/register/",
    method: "POST",
    data,
  });

  return response;
};
export const verifyUser = async (payload) => {
  const data = {
    email: payload.email,
    verification_code: payload.verification_code,
  };
  const response = await axiosInstance.request({
    url: "/verify/",
    method: "POST",
    data,
  });

  return response;
};

// fetch user types list
export const userTypesList = async () => {
  const response = await axiosInstance.request({
    url: "/user-types/",
    method: "GET",
  });
  return response;
};

// Update user details
export const updateUser = async (payload) => {
  const data = {
    email: payload.email,
    user_type: payload.userTypeId ? [payload.userTypeId] : null,
    default_profile: payload.userTypeName,
    first_name: payload.firstName,
    last_name: payload.lastName,
    profile_image: payload.profileImage,
    is_public_profile: payload.publicProfile,
    password: payload.password,
    timezone: payload.timeZone,
    bio: payload.bio,
    available_from: payload.availableFrom,
    available_to: payload.availableTo,
    off_weekdays: payload.off_weekdays && payload.off_weekdays,
    events: payload.eventIds && payload.eventIds,
    is_profile_complete: payload.isProfileComplete,
  };
  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
      delete data[key];
    }
  });
  const response = await axiosInstance.request({
    url: "/change-profile-details/",
    method: "PATCH",
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

// fetch Subscription Plans List
export const subscriptionPlansList = async () => {
  const response = await axiosInstance.request({
    url: "/subscription-plans/",
    method: "GET",
  });
  return response;
};

// fetch event categories  List
export const eventCategoriesList = async () => {
  const response = await axiosInstance.request({
    url: "/events/categories/",
    method: "GET",
  });
  return response;
};

// Login API
export const loginUser = async (payload) => {
  const data = {
    email: payload.email,
    password: payload.password,
  };

  Object.keys(data).forEach((key) => {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
      delete data[key];
    }
  });

  const response = await axiosInstance.request({
    url: "/login/",
    method: "POST",
    data,
  });
  return response;
};

// Forgot password API
export const forgotPassword = async (payload) => {
  const data = {
    email: payload.email,
  };
  const response = await axiosInstance.request({
    url: "/forgot-password/",
    method: "POST",
    data,
  });
  return response;
};

// Reset password API
export const resetPassword = async (payload) => {
  const data = {
    password: payload.password,
    password_confirm: payload.confirmPassword,
    token: payload.token,
    uid: payload.uid,
  };

  const response = await axiosInstance.request({
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

// verify Login Token API
export const verifyLoginToken = async (payload) => {
  const data = {
    token: payload.token,
    uid: payload.uid,
  };

  const response = await axiosInstance.request({
    url: "/verify-token/",
    method: "POST",
    data,
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
