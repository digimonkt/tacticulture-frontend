export type UpdateUserType = {
  email?: string;
  user_roles?: string;
  default_profile?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
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
