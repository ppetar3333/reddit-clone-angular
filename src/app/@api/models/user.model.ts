import { EUserRole } from './EUserRole';

export interface User {
  userID: number;
  username: string;
  password: string;
  email: string;
  displayName?: string;
  profileDescription?: string;
  avatar: string;
  banned: boolean;
  role: EUserRole;
  registrationDate: Date;
}
