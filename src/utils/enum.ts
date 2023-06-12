import { NewIUserType } from "./interfaces";

export enum USER_ROLES {
  apprentice = "apprentice",
  instructor = "instructor",
}

export enum SUBSCRIPTION_PLAN_TYPE {
  monthly = "monthly",
  yearly = "yearly",
}

export const USER_TYPE_LIST: NewIUserType[] = [
  {
    id: "1",
    title: "1",
    userRoles: USER_ROLES.apprentice,
    content:
      "Discover and attend new events, track your training and progress by collecting badges, and connect with new instructors and friends.",
  },
  {
    id: "2",
    title: "2",
    userRoles: USER_ROLES.instructor,
    content:
      "Create and manage events, accept payments from attendees, manage event roster and questions, and build your training network.",
  },
];

export enum IMAGE_VARIENTS {
  profile = "profile",
  event = "event",
}
export enum WEEKDAYS {
  sunday = "sunday",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
}

export enum RESET_PASSWORD_PAGE {
  verifyEmail = "verify-email",
  resetPassword = "reset-password",
}

export enum EVENT_QUESTION_TYPE {
  shortText = "ShortText",
  longText = "LongText",
  checkbox = "CheckBox",
  selectDropdown = "Select/Dropdown",
  optionalGuest = "OptionalGuest",
}
export enum EVENT_TEST {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
}
export enum REQUEST_STATUS_TYPE {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}
