import {
  AvailabilityGetDataType,
  AvailabilityPayloadType,
  AvailabilityResponseType,
  AvailabilitySendDataType,
  defaultAvailabilityResponseType,
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
export const transformGetUserAvailabilityResponse = (
  data: AvailabilityResponseType
): AvailabilityGetDataType => {
  return {
    id: data.id,
    timeZone: data.time_zone,
    availability: data.availability,
    specificDate: data.specific_date,
  };
};

export const transformUserDefaultAvailabilityResponse = (
  data: defaultAvailabilityResponseType
): AvailabilityPayloadType => {
  return {
    id: data.id,
    timeZone: data.timezone,
    userCustomAvailability: data.availability.map((el) => {
      return {
        day: el.weekdays,
        timeArray: el.user_availability_time_slot.map((ell) => {
          return {
            fromTime: ell.from_time,
            toTime: ell.to_time,
          };
        }),
      };
    }),
    specificDate: data.specific_date.map((el) => {
      return {
        date: el.specific_hours_date,
        timeZone: el.specific_date_timezone,
        availableHours: el.user_availability_time_slot.map((ell) => {
          return { id: ell.id, fromTime: ell.from_time, toTime: ell.to_time };
        }),
      };
    }),
  };
};

export const transformSendUserAvailabilityPayload = (
  data: AvailabilityPayloadType
): AvailabilitySendDataType => {
  return {
    timezone: data.timeZone,
    availability: data.userCustomAvailability.map((el) => {
      return {
        weekdays: el.day,
        user_availability_time_slot: el.timeArray.map((time) => {
          return { from_time: time.fromTime, to_time: time.toTime };
        }),
      };
    }),
    specific_date: data.specificDate.map((spe) => {
      return {
        specific_date_timezone: spe.timeZone,
        specific_hours_date: spe.date,
        user_availability_time_slot: spe.availableHours.map((time) => {
          return { from_time: time.fromTime, to_time: time.toTime };
        }),
      };
    }),
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
  };

  for (const key in payload) {
    if (!payload[key as keyof UserPayloadType]) {
      delete payload[key as keyof UserPayloadType];
    }
  }
  return payload;
};
