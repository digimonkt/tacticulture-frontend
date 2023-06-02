import { UserDetailResponseType, UserDetailType } from "./types/user";
import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";
import {
  transformGetUserDetailsAPIResponse,
  transformUpdateUserDetailsPayload,
} from "./transform/user";
// Update user details
export const updateUser = async (data: UserDetailType) => {
  const response = await axiosInstance.request({
    url: "/change-profile-details/",
    method: "PATCH",
    data: transformUpdateUserDetailsPayload(data),
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
