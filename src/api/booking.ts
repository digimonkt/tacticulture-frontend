import { bookingPayload, getBookingType } from "@/types/booking";
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

  return response;
};

export const guestProfileCreateAPI = async (data: any) => {
  const response = await axiosInstance.request({
    url: "events/guest-user-profile-detail-change",
    method: "PATCH",
    data,
  });

  return response;
};

export const guestBookingAPI = async (
  data: bookingPayload
): Promise<SuccessResult<getBookingType> | ErrorResult> => {
  // JSON.stringify({ data });
  const res = await axiosInstance.request({
    url: "events/event-booking",
    method: "POST",
    data,
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data as getBookingType,
    };
  }
  return res;
};
