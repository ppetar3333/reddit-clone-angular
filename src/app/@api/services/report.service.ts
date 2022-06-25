import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly APIurl = `${environment.APIurl}/reports`;

  constructor(private httpClient: HttpClient) {}

  public getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getReportByID(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getReportByPostId(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`${this.APIurl}/post/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getReportByCommentId(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`${this.APIurl}/comment/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public updateReportByID(report: Report, id?: number) {
    return this.httpClient.put(`${this.APIurl}/update/${id}`, { 
      reportID: report.reportID,
      reportReason: report.reportReason,
      timestamp: report.timestamp,
      accepted: report.accepted,
      comment: report.comment,
      post: report.post,
      user: report.user
    }, { responseType: 'text' }).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  public saveReport(report: Report) {
    return this.httpClient.post(`${this.APIurl}/save`, { 
      reportReason: report.reportReason,
      accepted: report.accepted,
      comment: report.comment,
      post: report.post,
      user: report.user
    }, { responseType: 'text' }).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  public deleteReportByID(id?: number) {
    return this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }
}
