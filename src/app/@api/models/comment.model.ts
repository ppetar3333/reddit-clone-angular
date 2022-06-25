import { Post } from './post.model';
import { User } from './user.model';

export interface Comment {
  id: number;
  text: string;
  timestamp?: Date;
  parentComment: number;
  user: User;
  post: Post;
  voteCount: number;
  numberOfReplys: number;
}
