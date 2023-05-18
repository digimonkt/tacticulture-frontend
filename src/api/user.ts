import {
  UpdateUserType,
  userDetailResponseType,
  userDetailType,
} from "./types/user";
import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";
import { transformGetUserDetailsAPIResponse } from "./transform/user";

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
  SuccessResult<userDetailType> | ErrorResult
> => {
  const res = await axiosInstance.request<userDetailResponseType>({
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
