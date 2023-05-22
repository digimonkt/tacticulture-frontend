import {
  UpdateUserType,
  UserDetailResponseType,
  UserDetailType,
} from "./types/user";
import axiosInstance from "./axiosInstance";
import { ErrorResult, SuccessResult } from "./types";
import { transformGetUserDetailsAPIResponse } from "./transform/user";

// Update user details
export const updateUser = async (data: UpdateUserType) => {
  console.log(data);
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