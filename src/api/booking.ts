import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";

export const guestRegistrationAPI = async (email: string) => {
  const response = await axiosInstance.request({
    url: "events/guest-user-register",
    method: "POST",
    data: { email },
  });

  return response;
};

export const guestOtpSubmitAPI = async (data: any) => {
  const response = await axiosInstance.request({
    url: "events/verify-guest-user",
    method: "POST",
    data,
  });
  console.log(response, "res");
  return response;
};
