export enum USER_ROLES {
  apprentice = "apprentice",
  instructor = "instructor",
}

export enum SUBSCRIPTION_PLAN_TYPE {
  monthly = "monthly",
  yearly = "yearly",
}

export interface NewIUserType {
  id: string;
  user_roles: USER_ROLES;
  content: string;
  title: string;
}

export const userTypeList: NewIUserType[] = [
  {
    id: "1",
    title: "1",
    user_roles: USER_ROLES.apprentice,
    content:
      "Discover and attend new events, track your training and progress by collecting badges, and connect with new instructors and friends.",
  },
  {
    id: "2",
    title: "2",
    user_roles: USER_ROLES.instructor,
    content:
      "Create and manage events, accept payments from attendees, manage event roster and questions, and build your training network.",
  },
];
