import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/@api/models/user.model';
import { UserService } from 'src/app/@api/services/user.service';
import { Validations } from 'src/app/@common/validations/register-validations';
import { NoAccessDialogComponent } from 'src/app/@ui/no-access-dialog/no-access-dialog.component';
import { AuthService } from '../../../@api/auth/auth.service';
import { Comment } from '../../../@api/models/comment.model';
import { Post } from '../../../@api/models/post.model';
import { CommentService } from '../../../@api/services/comment.service';
import { PostService } from '../../../@api/services/post.service';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
})
export class SinglePostComponent implements OnInit {
  public post!: any;
  public id!: any;
  public postComments: Array<any> = [];
  public childComments: Array<Comment> = [];
  public formComment: any;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public imageName: any;
  public loggedInUser!: User; 
  public isLoading: boolean = false;
  public editMode: boolean = false;
  public editedDesc: string = '';

  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private dialog: MatDialog,
    private routerNavigate: Router,
    private commentService: CommentService,
    public postComponent: PostCardComponent,
    public auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.getPost();
    this.getComments();
    if(this.authService.isLoggedIn()) {
      this.getLoggedInUser();
    }
  }

  public handleSelectedOptionComment(event: any): void {
    this.postComments = [];
    this.isLoading = true;
    setTimeout(() => {
      this.commentService.sortCommentsBy(this.id.postID,event).subscribe((data) => {
        data.map((parent) => {
          if (!parent.parentComment) {
            this.postComments.push(parent);
          }
        });
        this.isLoading = false;
      });
    }, 500);
  }

  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe(data => { 
      this.loggedInUser = data;
    });
  }

  public getPost(): void {
    this.id = this.router.snapshot.params;
    this.postService.getPostByID(this.id.postID).subscribe((data) => {
      this.post = data;
      if (this.post.imagePath) {
        this.postService.getImageByImageName(this.post.imagePath).subscribe((data) => {
          this.retrieveResonse = data;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.post.imagePreview = this.retrievedImage;
        });
      }
    });
  }

  public getComments(): void {
    this.commentService.getCommentsByPostID(this.id.postID).subscribe((data) => {
      data.map((parent) => {
        if (!parent.parentComment) {
          this.postComments.push(parent);
        }
      });
    });
  }

  public commentBtn(commentData: any): void {
    if(commentData.value) {
      if(!this.loggedInUser.banned) {
        const comment = {
          text: commentData.value,
          parentComment: null,
          user: this.loggedInUser,
          post: this.post,
          voteCount: 1
        }
        this.commentService.saveComment(comment).subscribe({
          next: () => { 
            console.log('successfuly')
            this.postComments.push(comment);
          },
          error: () => console.log('error'),
          complete: () => console.log('completed')
        });
      } else {
        this.noAccessUserBanned()
      }
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
      this.routerNavigate.navigate([''])
    });
  }

  public enableEdit(): void {
    this.editMode = true;
  }

  public getChangedDesc(editedDesc: any): void {
    this.editedDesc = editedDesc.value;
  }

  public saveEditedDesc(): void {
    this.editMode = false;
    this.post.text = this.editedDesc;
    this.postService.updatePostByID(this.post, this.post.postID).subscribe(() => {
      this.getPost();
    })
  }

  public cancelEdit(): void {
    this.editMode = false;
  }

  public deletePost(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      postId: this.post.postID
    };
    this.dialog.open(DeletePostComponent, dialogConfig).afterClosed().subscribe(data => {
      if(data && data.event === 'deleted') {
        window.location.href = '';
      }
    });
  }
}
