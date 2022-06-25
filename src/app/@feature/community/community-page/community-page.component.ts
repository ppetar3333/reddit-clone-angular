import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subreddit } from 'src/app/@api/models/subreddit.model';
import { User } from 'src/app/@api/models/user.model';
import { FlairService } from 'src/app/@api/services/flair.service';
import { SubredditService } from 'src/app/@api/services/subreddit.service';
import { AuthService } from '../../../@api/auth/auth.service';
import { Post } from '../../../@api/models/post.model';
import { PostService } from '../../../@api/services/post.service';
import { SuspendCommunityComponent } from '../suspend-community/suspend-community.component';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
})
export class CommunityPageComponent implements OnInit {
  public posts: Array<Post> = [];
  public id: any;
  public subredditAdmin: boolean = false;
  public currentSubreddit!: Subreddit;
  public subredditFlairs: string[] = [];
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public imageName: any;
  public subredditModerator: boolean = false;
  public editMode: boolean = false;
  public editedDesc: string = '';

  constructor(
    private postService: PostService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private flairService: FlairService,
    private subredditService: SubredditService,
    private routerNavigate: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.getPosts();
    this.isLoggedInAmin();
    this.isLoggedInModerator();
    this.getFlairsBySubreddit();
  }

  public handleSelectedOptionPost(event: string): void {
    this.postService.sortPostsByAndSubredditId(this.currentSubreddit?.subredditID,event).subscribe(data => this.posts = data)
  }

  private getPosts(): void {
    this.id = this.router.snapshot.params;
    this.postService
      .getPostsBySubredditID(this.id.subredditID)
      .subscribe((response) => {
        this.posts = response;
        this.currentSubreddit = response[0].subreddit;
        this.posts.forEach((element) => {
          if (element.imagePath) {
            this.postService
              .getImageByImageName(element.imagePath)
              .subscribe((data) => {
                this.retrieveResonse = data;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage =
                  'data:image/jpeg;base64,' + this.base64Data;
                element.imagePreview = this.retrievedImage;
              });
          }
        });
      });
  }

  public isLoggedInAmin(): void {
    if (this.authService.getRole() === 'ROLE_admin') this.subredditAdmin = true;
  }

  public isLoggedInModerator(): void {
    if (this.authService.getRole() === 'ROLE_moderator') this.subredditModerator = true;
  }

  public getFlairsBySubreddit(): void {
    this.flairService.getFlairsBySubredditId(this.id.subredditID).subscribe((data) => {
      data.forEach(element => {
        this.flairService.getFlairByID(element.flairid).subscribe((data) => {
          this.subredditFlairs.push(data.name);
        })
      });
    })
  }

  public suspendCommunity(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      subreddit: this.currentSubreddit,
    };
    this.dialog.open(SuspendCommunityComponent, dialogConfig).afterClosed().subscribe(() => {
      this.routerNavigate.navigate(['/community', this.currentSubreddit?.subredditID]);
    });
  }

  public enableEdit(): void {
    this.editMode = true;
  }

  public getChangedDesc(editedDesc: any): void {
    this.editedDesc = editedDesc.value;
  }

  public cancelEdit(): void {
    this.editMode = false;
  }

  public saveEditedDesc(): void {
    this.editMode = false;
    this.currentSubreddit.description = this.editedDesc;
    this.subredditService.updateSubredditByID(this.currentSubreddit, this.currentSubreddit.subredditID).subscribe(() => {
      this.getPosts();
    })
  }
}
