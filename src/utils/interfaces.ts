import { USER_ROLES } from "./enum";

export interface NewIUserType {
  id: string;
  user_roles: USER_ROLES;
  content: string;
  title: string;
}
