import { User } from "./user.model";

export interface Banned {
  id?: number,
  timestamp?: Date,
  byModerator: User
}