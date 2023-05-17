import { Flair } from './flair.model';
import { Subreddit } from './subreddit.model';
import { User } from './user.model';

export class AddPost {
  constructor(
    public title: string,
    public description: string,
    public user: any,
    public flair: any,
    public subreddit: any,
    public image: string
  ) {}
}
