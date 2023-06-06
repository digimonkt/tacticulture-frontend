import {
  UpdateUserDetailPayloadType,
  UserDetailResponseType,
  UserDetailType,
  UserPayloadType,
} from "../types/user";

// ======transform user data for response======
export const transformGetUserDetailsAPIResponse = (
  data: UserDetailResponseType
): UserDetailType => {
  return {
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name || "",
    userRoles: data.user_roles,
    username: data.username,
    phoneNumber: data.phone_number || "",
    timezone: data.timezone || "",
    bio: data.bio,
    availableFrom: data.available_from,
    availableTo: data.available_to,
    offWeekdays: data.off_weekdays || [],
    events: data.events || [],
    profileImage: data.profile_image || "",
    isPublicProfile: data.is_public_profile,
    isProfileComplete: data.is_profile_complete,
    defaultRole: data.default_profile,
  };
};

// ======transform user data for API request======
export const transformUpdateUserDetailsPayload = (
  data: UpdateUserDetailPayloadType
): UserPayloadType => {
  const payload: UserPayloadType = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    user_roles: data.userRoles,
    username: data.username,
    timezone: data.timezone,
    bio: data.bio,
    available_from: data.availableFrom,
    available_to: data.availableTo,
    off_weekdays: data.offWeekdays,
    events: data.events,
    profile_image: data.profileImage,
    is_public_profile: data.isPublicProfile,
    is_profile_complete: data.isProfileComplete,
    default_profile: data.defaultRole,
    password: data.password,
  };

  for (const key in payload) {
    if (
      payload[key as keyof UserPayloadType] === "" ||
      payload[key as keyof UserPayloadType] === undefined ||
      payload[key as keyof UserPayloadType] === null
    ) {
      delete payload[key as keyof UserPayloadType];
    }
  }
  return payload;
};
