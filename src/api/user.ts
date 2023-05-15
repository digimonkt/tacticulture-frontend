import { UpdateUserType } from "./types/user";
import axiosInstance from "./axiosInstance";

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
