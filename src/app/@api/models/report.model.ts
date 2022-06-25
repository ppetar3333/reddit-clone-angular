import { Comment } from './comment.model';
import { EReportReason } from './EReportReason';
import { Post } from './post.model';
import { User } from './user.model';

export interface Report {
  reportID?: number;
  reportReason: EReportReason;
  timestamp?: Date;
  accepted: boolean;
  comment: Comment;
  post: Post;
  user: User;
}
