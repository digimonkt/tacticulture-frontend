export type UserDetailType = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  userRoles: USER_ROLES | "";
  phoneNumber: string;
  timezone: string;
  bio: string;
  availableFrom: string;
  availableTo: string;
  offWeekdays: string[];
  events: number[];
  profileImage: string;
  isPublicProfile: boolean;
  isProfileComplete: boolean;
  defaultRole: USER_ROLES | "";
};
