import { HttpClient } from '@angular/common/http';
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

  saveSubreddit(subreddit: Subreddit) {
    console.log(subreddit.moderators);
    return this.httpClient.post(
      `${this.APIurl}/save`,
      {
        name: subreddit.name,
        description: subreddit.description,
        rules: subreddit.rules,
        suspended: subreddit.isSuspended,
        suspendedReason: subreddit.suspendedReason,
        moderators: subreddit.moderators,
      },
      { responseType: 'text' }
    );
  }

  deleteSubredditByID(id: number) {
    this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }
}
