import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EReportReason } from 'src/app/@api/models/EReportReason';
import { Post } from 'src/app/@api/models/post.model';
import { PostService } from 'src/app/@api/services/post.service';
import { ReportService } from 'src/app/@api/services/report.service';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-reported',
  templateUrl: './post-reported.component.html',
  styleUrls: ['./post-reported.component.scss']
})
export class PostReportedComponent implements OnInit {
  @Input() public post!: Post;
  @Input('reported') reported: boolean = false;
  @Input('reportedReason') reportedReason!: EReportReason;
  @Output('acceptDeclineReport') acceptDeclineReport = new EventEmitter<boolean>();

  constructor(public postCard: PostCardComponent, private reportService: ReportService, private postService: PostService) { }

  public ngOnInit(): void {
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
