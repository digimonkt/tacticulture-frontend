import { userDetailResponseType, userDetailType } from "../types/user";

export const transformGetUserDetailsAPIResponse = (
  data: userDetailResponseType
): userDetailType => {
  return {
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name || "",
    userRoles: data.user_roles,
    username: data.username,
    phoneNumber: data.phone_number,
    timezone: data.timezone,
    bio: data.bio,
    availableFrom: data.available_from,
    availableTo: data.available_to,
    offWeekdays: data.off_weekdays || [],
    events: data.events || [],
    profileImage: data.profile_image,
    isPublicProfile: data.is_public_profile,
    isProfileComplete: data.is_profile_complete,
    defaultRole: data.default_profile,
  };
};
