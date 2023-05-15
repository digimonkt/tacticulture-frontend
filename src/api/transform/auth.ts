import { USER, USER_ROLES } from "@/redux/reducers/userRole";
import { GetUserDetailsAPIResponse, UserTypeResponseType } from "../types/auth";

export const transformGetUserDetailsAPIResponse = (
  data: GetUserDetailsAPIResponse
): USER => {
  return {
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name || "",
    role: data.role,
    createdAt: data.created,
  };
};

export const transformGetUserTypeListAPIResponse = (
  data: UserTypeResponseType
): USER_ROLES => {
  return {
    id: data.id,
    userType: data.user_roles,
    slugName: data.slug_name,
    content: data.content,
  };
};
