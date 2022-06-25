import { Flair } from './flair.model';
import { User } from './user.model';

export class Subreddit {
  constructor(
    public subredditID?: number,
    public creationDate?: number,
    public name?: string,
    public description?: string,
    public isSuspended?: boolean,
    public suspendedReason?: string,
    public rules?: string[],
    public moderators?: User[]
  ) {}
}
