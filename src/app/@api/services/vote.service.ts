import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reaction } from '../models/reaction.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private readonly APIurlPost = `${environment.APIurl}/votes/posts`;
  private readonly APIurlComment = `${environment.APIurl}/votes/comments`;

  constructor(private http: HttpClient) {}

  public votePost(reaction: Reaction): Observable<any> {
    return this.http.post(`${this.APIurlPost}`, {
      reactionID: reaction.reactionID,
      type: reaction.type,
      timestamp: reaction.timestamp,
      user: reaction.user,
      comment: reaction.comment,
      post: reaction.post
    }).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  public voteComment(reaction: Reaction): Observable<any> {
    return this.http.post(`${this.APIurlComment}`, reaction).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
