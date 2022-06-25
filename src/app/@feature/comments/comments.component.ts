import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EReportReason } from 'src/app/@api/models/EReportReason';
import { User } from 'src/app/@api/models/user.model';
import { ReportService } from 'src/app/@api/services/report.service';
import { AuthService } from '../../@api/auth/auth.service';
import { Comment } from '../../@api/models/comment.model';
import { Post } from '../../@api/models/post.model';
import { CommentService } from '../../@api/services/comment.service';
import { NoAccessDialogComponent } from '../../@ui/no-access-dialog/no-access-dialog.component';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() public comment!: Comment;
  @Input() public post!: Post;
  @Input('reported') reported: boolean = false;
  @Input('reportedReason') reportedReason!: EReportReason;
  @Output('acceptDeclineReport') acceptDeclineReport = new EventEmitter<boolean>();
  public childComments: Array<Comment>;
  public toggleReplays: boolean = false;
  public commentToReport!: Comment;
  public replayOnComment!: Comment;
  public showCommentForm: boolean = false;
  public loggedInUser!: User; 
  public editMode: boolean = false;
  public editedDesc: string = '';
  public isLoading: boolean = false;

  constructor(
    private commentService: CommentService,
    public authService: AuthService,
    private dialog: MatDialog,
    private reportService: ReportService,
    private router: Router
  ) {
    this.childComments = [];
  }

  public ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.getLoggedInUser();
    }
  }

  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public showReplays(commentID: number): void {
    this.toggleReplays = !this.toggleReplays;
    this.commentService.getCommentChildren(commentID).subscribe((children) => {
      this.comment.numberOfReplys = children.length;
      this.childComments = children;
    });
  }

  public reportComment(commentID: number): void {
    if (this.authService.isLoggedIn()) {
      this.commentService.getCommentByID(commentID).subscribe((element) => {
        this.commentToReport = element;
        this.reportDialog(element);
      });
    } else {
      this.noAccessDialog();
    }
  }

  public replayToComment(commentID: number): void {
    if (this.authService.isLoggedIn()) {
      this.showCommentForm = !this.showCommentForm;
    } else {
      this.noAccessDialog();
    }
  }

  public saveComment(commentData: any, commentId: any): void {
    if(commentData.value) {
      if(!this.loggedInUser.banned) {
        const newComment = {
          text: commentData.value,
          parentComment: commentId,
          user: this.loggedInUser,
          post: this.post,
          voteCount: 1
        }
        this.commentService.saveComment(newComment).subscribe({
          next: () => console.log('successfuly'),
          error: () => console.log('error'),
          complete: () => console.log('completed')
        });
        this.showReplays(commentId);
        this.showReplays(commentId);
        if (!this.toggleReplays) {
          this.showReplays(commentId);
        }
      } else {
        this.noAccessUserBanned();
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
      this.router.navigate([''])
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

  private reportDialog(comment: Comment): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogText: 'Report Comment',
      postToReport: null,
      commentToReport: comment
    };
    this.dialog.open(ReportDialogComponent, dialogConfig);
  }

  public acceptReport(comment: any): void {
    this.reportService.getReportByCommentId(comment.id).subscribe((data) => {
      data.accepted = true;
      console.log(data)
      this.reportService.updateReportByID(data, data.reportID).subscribe(() => {});
      this.commentService.deleteCommentByID(comment.id).subscribe(() => {});
      this.acceptDeclineReport.emit(true);
    })
  }

  public declineReport(comment: any): void {
    this.reportService.getReportByCommentId(comment.id).subscribe((data) => {
      data.accepted = false;
      console.log(data)
      this.reportService.deleteReportByID(data.reportID).subscribe(() => {});
      this.acceptDeclineReport.emit(true);
    })
  }

  public cancelEdit(): void {
    this.editMode = false;
  }
  
  public enableEdit(): void {
    this.editMode = true;
  }

  public getChangedDesc(editedDesc: any): void {
    this.editedDesc = editedDesc.value;
  }

  public saveEditedDesc(comment: any): void {
    this.editMode = false;
    comment.text = this.editedDesc;
    this.commentService.updateCommentByID(comment, comment.id).subscribe(() => {})
  }

  public deleteComment(comment: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      commentId: comment.id
    };
    this.toggleReplays = true;
    console.log(this.childComments.filter(data => data.parentComment === comment.parentComment))
    this.dialog.open(DeleteCommentComponent, dialogConfig).afterClosed().subscribe(data => {
      window.location.reload();
    });
  }
    
}
