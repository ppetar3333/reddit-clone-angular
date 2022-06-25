import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../@api/auth/auth.service';
import { Comment } from '../../../@api/models/comment.model';
import { EReactionType } from '../../../@api/models/EReactionType';
import { Reaction } from '../../../@api/models/reaction.model';
import { User } from '../../../@api/models/user.model';
import { VotePayload } from '../../../@api/models/vote-payload.model';
import { CommentService } from '../../../@api/services/comment.service';
import { VoteService } from '../../../@api/services/vote.service';
import { NoAccessDialogComponent } from '../../../@ui/no-access-dialog/no-access-dialog.component';

@Component({
  selector: 'app-vote-comments',
  templateUrl: './vote-comments.component.html',
})
export class VoteCommentsComponent implements OnInit {
  @Input()
  comment!: Comment;
  upvoted: boolean = false;
  downvoted: boolean = false;
  votePayload: VotePayload;
  commentReaction!: Comment;
  user!: User;
  reaction!: Reaction;
  loggedInUser!: User;

  constructor(
    private auth: AuthService,
    private router: Router,
    private voteService: VoteService,
    private commentService: CommentService,
    private dialog: MatDialog
  ) {
    this.votePayload = {
      voteType: EReactionType.downvote,
      id: 1,
    };
  }

  public ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.getLoggedInUser();
    }
  }

  public getLoggedInUser(): void {
    this.auth.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }
  
  public upvoteComment(): void {
    this.upvoted = true;
    this.downvoted = false;
    this.votePayload.voteType = EReactionType.upvote;
    this.vote();
  }

  public downvoteComment(): void {
    this.downvoted = true;
    this.upvoted = false;
    this.votePayload.voteType = EReactionType.downvote;
    this.vote();
  }

  public vote(): void {
    if (this.auth.isLoggedIn()) {
      if(!this.loggedInUser.banned) {
        this.votePayload.id = this.comment.id;
        this.commentService
          .getCommentByID(this.votePayload.id)
          .subscribe((data) => {
            this.commentReaction = data;
          });

        this.auth.getLoggedInUser().subscribe((data) => {
          this.user = data;
        });

        this.reaction = {
          comment: this.commentReaction,
          user: this.user,
          type: this.votePayload.voteType,
        };

        this.voteService.voteComment(this.reaction).subscribe(() => {});

        this.commentService.getCommentByID(this.comment.id).subscribe((data) => {
          this.comment = data;
        });
      } else {
        this.noAccessUserBanned();
      }
    } else {
      this.noAccessDialog();
    }
  }

  public noAccessUserBanned(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Ok',
      dialogText: 'Your profile is banned.',
      navigateTo: ''
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate([''])
      this.upvoted = false;
      this.downvoted = false;
    });
  }

  private noAccessDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Login',
      dialogText: 'You need to be logged in.',
      navigateTo: '/login'
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }
}
