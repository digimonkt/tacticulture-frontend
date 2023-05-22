export type UpdateUserType = {
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
  available_from?: string | null;
  available_to?: string | null;
  off_weekdays?: string[];
  events?: number[];
  is_profile_complete?: boolean;
  username?: string;
};

export type UserDetailType = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  userRoles?: string;
  phoneNumber?: string;
  timezone?: string;
  bio?: string;
  availableFrom?: string;
  availableTo?: string;
  offWeekdays?: string[];
  events?: number[];
  profileImage?: string;
  isPublicProfile?: boolean;
  isProfileComplete?: boolean;
  defaultRole?: string;
};

export type UserDetailResponseType = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  user_roles: string;
  phone_number: string;
  timezone: string;
  bio: string;
  available_from: string;
  available_to: string;
  off_weekdays: string[];
  events: number[];
  profile_image: string;
  is_public_profile: boolean;
  is_profile_complete: boolean;
  default_profile: string;
};
