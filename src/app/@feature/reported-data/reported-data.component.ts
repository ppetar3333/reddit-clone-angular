import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/@api/services/report.service';
import { Report } from 'src/app/@api/models/report.model';

@Component({
  selector: 'app-reported-data',
  templateUrl: './reported-data.component.html',
  styleUrls: ['./reported-data.component.scss']
})
export class ReportedDataComponent implements OnInit {
  public reportedPostsList: Array<Report> = [];
  public reportedCommentsList: Array<Report> = [];
  public isLoading: boolean = false;

  constructor(private reportService: ReportService) { }

  public ngOnInit(): void {
    this.getReportedPosts();
  }

  public getReportedPosts(): void {
    this.reportService.getReports().subscribe((data) => { 
      data.filter((content: any) => !content.accepted).map(content => {
        if(content.post.postID === null) {
          this.reportedCommentsList.push(content);
        } else {
          this.reportedPostsList.push(content);
        }
      })
    })
  } 

  public acceptDeclineReport(): void {
    this.isLoading = true;
    this.reportedCommentsList = [];
    this.reportedPostsList = [];
    setTimeout(() => {
      this.getReportedPosts();
      this.isLoading = false;
    }, 1000);
  }
}
