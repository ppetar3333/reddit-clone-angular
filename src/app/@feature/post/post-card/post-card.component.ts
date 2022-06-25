import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { Post } from 'src/app/@api/models/post.model';
import { PostService } from 'src/app/@api/services/post.service';
import { ReportService } from 'src/app/@api/services/report.service';
import { NoAccessDialogComponent } from '../../../@ui/no-access-dialog/no-access-dialog.component';
import { ReportDialogComponent } from '../../report-dialog/report-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html'
})
@Injectable({
  providedIn: 'root',
})
export class PostCardComponent implements OnInit {
  @Input('posts') posts: Post[] = [];
  @Input('reported') reported: boolean = false;
  @Input('reportedReason') reportedReason: string = '';
  @Output('acceptDeclineReport') acceptDeclineReport = new EventEmitter<boolean>(); 
  
  constructor(
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void { }

  public showComments(postID: number): void {
    this.router.navigate(['/post', postID]);
  }

  public reportPost(id: number): void {
    if (this.authService.isLoggedIn()) {
      this.postService.getPostByID(id).subscribe((element) => {
        this.reportDialog(element);
      });
    } else {
      this.noAccessDialog();
    }
  }

  private noAccessDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      buttonText: 'Login',
      dialogText: 'You need to be logged in.',
      navigateTo: '/login'
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  private reportDialog(post: Post): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogText: 'Report Post',
      postToReport: post,
      commentToReport: null
    };
    this.dialog.open(ReportDialogComponent, dialogConfig);
  }

  public acceptReport(post: any): void {
    this.reportService.getReportByPostId(post.postID).subscribe((data) => {
      data.accepted = true;
      console.log(data)
      this.reportService.updateReportByID(data, data.reportID).subscribe(() => {});
      this.postService.deletePostByID(post.postID).subscribe(() => {});
      this.acceptDeclineReport.emit(true);
    })
  }

  public declineReport(post: any): void {
    this.reportService.getReportByPostId(post.postID).subscribe((data) => {
      data.accepted = false;
      console.log(data)
      this.reportService.deleteReportByID(data.reportID).subscribe(() => {});
      this.acceptDeclineReport.emit(true);
    })
  }
}
