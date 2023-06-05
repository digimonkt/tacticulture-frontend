import { USER_ROLES } from "@/utils/enum";

export type UserPayloadType = {
  email?: string;
  user_roles?: string;
  default_profile?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string | null;
  is_public_profile?: boolean;
  password?: string;
  timezone?: string;
  bio?: string;
  available_from?: string;
  available_to?: string;
  off_weekdays?: string[];
  events?: number[];
  is_profile_complete?: boolean;
  username?: string;
};

export type UserDetailResponseType = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  user_roles: USER_ROLES;
  phone_number?: string;
  timezone?: string;
  bio: string;
  available_from: string;
  available_to: string;
  off_weekdays: string[];
  events: number[];
  profile_image?: string | null;
  is_public_profile: boolean;
  is_profile_complete: boolean;
  default_profile: USER_ROLES | "";
};

export type AvailabilityPayloadType = {
  id?: number;
  timeZone: string;
  specificDate: {
    date: string;
    timeZone: string;
    availableHours: { fromTime: string; toTime: string }[];
  }[];
  userCustomAvailability: {
    day: string;
    timeArray: { id?: number; fromTime: string; toTime: string }[];
  }[];
};

// export type UserDefaultAvailabilityType = {
//   id: number;
//   timeZone: string;
//   userCustomAvailability: {
//     day: string;
//     timeArray: { id: number; fromTime: string; toTime: string }[];
//   }[];
//   specificDate: {
//     date: string;
//     timeZone: string;
//     availableHours: { id: number; fromTime: string; toTime: string }[];
//   }[];
// };

export type UserDefaultResponseType = {
  id: number;
  timezone: string;
  availability: {
    weekdays: string;
    user_availability_time_slot: {
      id: number;
      from_time: string;
      to_time: string;
    }[];
  }[];
  specific_date: {
    specific_hours_date: string;
    specific_date_timezone: string;
    user_availability_time_slot: {
      id: number;
      from_time: string;
      to_time: string;
    }[];
  }[];
};

export type AvailabilityResponseType = {
  id: number;
  time_zone: string;
  availability: null;
  specific_date: null;
};

export type defaultAvailabilityResponseType = {
  id: number;
  timezone: string;
  availability: {
    weekdays: string;
    user_availability_time_slot: {
      id: number;
      from_time: string;
      to_time: string;
    }[];
  }[];
  specific_date: {
    specific_hours_date: string;
    specific_date_timezone: string;
    user_availability_time_slot: {
      id: number;
      from_time: string;
      to_time: string;
    }[];
  }[];
};

export type AvailabilityGetDataType = {
  id: number;
  timeZone: string;
  availability: null;
  specificDate: null;
};

export type AvailabilitySendDataType = {
  timezone: string;
  availability: {
    weekdays: string;
    user_availability_time_slot: { from_time: string; to_time: string }[];
  }[];
  specific_date: {
    specific_hours_date: string;
    specific_date_timezone: string;
    user_availability_time_slot: {
      from_time: string;
      to_time: string;
    }[];
  }[];
};
export type UserDetailType = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  userRoles?: USER_ROLES | "";
  phoneNumber?: string;
  timezone?: string;
  bio?: string;
  availableFrom?: string;
  availableTo?: string;
  offWeekdays?: string[];
  events?: number[];
  profileImage?: string | null;
  isPublicProfile?: boolean;
  isProfileComplete?: boolean;
  defaultRole?: USER_ROLES | "";
};
