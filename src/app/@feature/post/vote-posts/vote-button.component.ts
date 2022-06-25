import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../@api/auth/auth.service';
import { EReactionType } from '../../../@api/models/EReactionType';
import { Post } from '../../../@api/models/post.model';
import { Reaction } from '../../../@api/models/reaction.model';
import { User } from '../../../@api/models/user.model';
import { VotePayload } from '../../../@api/models/vote-payload.model';
import { PostService } from '../../../@api/services/post.service';
import { UserService } from '../../../@api/services/user.service';
import { VoteService } from '../../../@api/services/vote.service';
import { NoAccessDialogComponent } from '../../../@ui/no-access-dialog/no-access-dialog.component';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
})
export class VoteButtonComponent implements OnInit {
  votePayload!: VotePayload;
  @Input("post") post!: Post;
  postReaction!: Post;
  reaction!: Reaction;
  user!: User;
  upvoted: boolean = false;
  downvoted: boolean = false;
  loggedInUser!: User;

  constructor(
    private voteService: VoteService,
    private postService: PostService,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    this.votePayload = {
      voteType: EReactionType.downvote,
      id: 1,
    };
  }

  public ngOnInit(): void { 
    if(this.auth.isLoggedIn()) { 
      this.getLoggedInUser();
    }
  }

  public getLoggedInUser(): void {
    this.auth.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public downvotePost(): void {
    this.downvoted = true;
    this.upvoted = false;
    this.votePayload.voteType = EReactionType.downvote;
    this.vote();
  }

  public upvotePost(): void {
    this.upvoted = true;
    this.downvoted = false;
    this.votePayload.voteType = EReactionType.upvote;
    this.vote();
  }

  private vote(): void {
    if (this.auth.isLoggedIn()) {
      if(!this.loggedInUser.banned) {
        this.votePayload.id = this.post.postID;
        this.postService.getPostByID(this.votePayload.id).subscribe((data) => {
          this.postReaction = data;
        });

        this.auth.getLoggedInUser().subscribe((data) => {
          this.user = data;
        });

        this.reaction = {
          post: this.postReaction,
          user: this.user,
          type: this.votePayload.voteType,
        };

        this.voteService.votePost(this.reaction).subscribe(() => {});

        this.postService.getPostByID(this.reaction.post?.postID).subscribe((data) => {
          this.post = data;
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
