import {
  AvailabilityGetDataType,
  AvailabilityPayloadType,
  AvailabilityResponseType,
  UpdateUserType,
  UserDefaultResponseType,
  UserDetailResponseType,
} from "./types/user";
import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";
import {
  transformGetUserAvailabilityResponse,
  transformGetUserDetailsAPIResponse,
  transformSendUserAvailabilityPayload,
  transformUserDefaultAvailabilityResponse,
} from "./transform/user";
import { UserDetailType } from "@/types/user";
// Update user details
export const updateUser = async (data: UpdateUserType) => {
  const response = await axiosInstance.request({
    url: "/change-profile-details/",
    method: "PATCH",
    data,
  });
  return response;
};

export const getUserDetailsAPI = async (): Promise<
  SuccessResult<UserDetailType> | ErrorResult
> => {
  const res = await axiosInstance.request<UserDetailResponseType>({
    url: "/change-profile-details/",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetUserDetailsAPIResponse(res.data),
    };
  }
  return res;
};

export const getUserAvailabilityAPI = async (): Promise<
  SuccessResult<AvailabilityPayloadType> | ErrorResult
> => {
  const res = await axiosInstance.request<UserDefaultResponseType>({
    url: "/events/availability/",
    method: "GET",
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformUserDefaultAvailabilityResponse(res.data),
    };
  }
  return res;
};

export const updateUserAvailabilityAPI = async (
  data: AvailabilityPayloadType
): Promise<SuccessResult<AvailabilityGetDataType> | ErrorResult> => {
  const res = await axiosInstance.request<AvailabilityResponseType>({
    url: "events/availability/",
    method: "POST",
    data: transformSendUserAvailabilityPayload(data),
  });

  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformGetUserAvailabilityResponse(res.data),
    };
  }
  return res;
};
