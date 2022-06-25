import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { Comment } from 'src/app/@api/models/comment.model';
import { EReportReason } from 'src/app/@api/models/EReportReason';
import { Post } from 'src/app/@api/models/post.model';
import { User } from 'src/app/@api/models/user.model';
import { ReportService } from 'src/app/@api/services/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {
  public dialogText: string = '';
  private postToReport!: Post;
  private commentToReport!: Comment;
  private user!: User;
  public selectedReportReason: EReportReason;
  public reportReasonList: Array<EReportReason>;
  public EReportReason: EReportReason | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private reportService: ReportService, 
    private authService: AuthService) 
  {
    this.reportReasonList = this.toArray(EReportReason);
    this.selectedReportReason = this.reportReasonList[0];
  }

  public ngOnInit(): void {
    this.dialogText = this.data.dialogText;
    this.postToReport = this.data.postToReport;
    this.commentToReport = this.data.commentToReport;
    this.authService.getLoggedInUser().subscribe({
      next: (data) => this.user = data,
      error: () => console.log('Error'),
      complete: () => console.log("Complete")
    })
  }

  private toArray(enumme: any): Array<EReportReason> {
    let keys = Object.keys(enumme);
    return keys.filter(value => typeof value !== 'number').reverse().map(value => enumme[value]).slice(keys.length / 2);
  }

  public report(): void {
    const report = {
      "reportReason": this.selectedReportReason,
      "accepted": false,
      "comment": this.commentToReport,
      "post": this.postToReport,
      "user": this.user
    };
    this.reportService.saveReport(report).subscribe({
      next: () => console.log("Success"),
      error: () => console.log("Error"),
      complete: () => console.log("Complete")
    })
  }

  public onSelectedItem(event: any): void {
    this.selectedReportReason = event;
  }
}
