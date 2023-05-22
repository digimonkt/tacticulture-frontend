import { USER_ROLES } from "./enum";

export interface NewIUserType {
  id: string;
  userRoles: USER_ROLES;
  content: string;
  title: string;
}
