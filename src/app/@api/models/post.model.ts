import { Flair } from './flair.model';
import { Subreddit } from './subreddit.model';
import { User } from './user.model';

export interface Post {
  postID: number;
  title: string;
  text: string;
  creationDate: Date;
  imagePath: string;
  user: User;
  flair: Flair;
  reportAccepted: boolean,
  subreddit: Subreddit;
  voteCount: number;
  imagePreview: any;
}
