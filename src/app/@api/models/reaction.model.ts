import { Comment } from './comment.model';
import { EReactionType } from './EReactionType';
import { Post } from './post.model';
import { User } from './user.model';

export interface Reaction {
  reactionID?: number;
  type: EReactionType;
  timestamp?: Date;
  user: User;
  comment?: Comment;
  post?: Post;
}
