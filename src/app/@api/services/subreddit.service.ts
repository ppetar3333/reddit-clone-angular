import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subreddit } from '../models/subreddit.model';

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  private readonly APIurl = `${environment.APIurl}/subreddits`;

  constructor(private httpClient: HttpClient) {}

  getSubreddits(): Observable<Subreddit[]> {
    return this.httpClient.get<Subreddit[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getSubredditByID(id: number): Observable<Subreddit> {
    return this.httpClient.get<Subreddit>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getSubredditByName(name: string): Observable<Subreddit> {
    return this.httpClient.get<Subreddit>(`${this.APIurl}/byName/${name}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  updateSubredditByID(subreddit: Subreddit, id: any) {
    return this.httpClient.put(`${this.APIurl}/update/${id}`, { 
      subredditID: subreddit.subredditID,
      name: subreddit.name,
      description: subreddit.description,
      rules: subreddit.rules,
      suspendedReason: subreddit.suspendedReason,
      moderators: subreddit.moderators,    
      suspended: subreddit.isSuspended,
      creationDate: subreddit.creationDate
    }, { responseType: 'text' });
  }

  saveSubreddit(subreddit: any, file: File, userId: number) {
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('name', subreddit.name);
    formData.append('description', subreddit.description);
  
    return this.httpClient.post(
      `${this.APIurl}/save/${userId}`, formData
    );
  }

  deleteSubredditByID(id: number) {
    this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  public searchByDesc(desc: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APIurl}/description`, { description: desc }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public searchByName(name: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APIurl}/name`, { name: name }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public searchByPdf(textPdf: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APIurl}/text-pdf`, { textPdf: textPdf }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public searchByPostsCount(bottom: number, top: number): Observable<any> {
    let queryParams = new HttpParams();
    if (bottom != null) {
      queryParams = queryParams.set('bottom', bottom);
    }
    if (top != null) {
      queryParams = queryParams.set('top', top);
    }

    return this.httpClient.get<any>(`${this.APIurl}/posts-count`, {params: queryParams}).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
