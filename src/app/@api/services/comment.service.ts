import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly APIurl = `${environment.APIurl}/comments`;

  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getCommentByID(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public sortCommentsBy(id: number, option: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.APIurl}/sort-comments/by-post/${option}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );  
  }

  getCommentChildren(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.APIurl}/children/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getCommentsByPostID(id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.APIurl}/post/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  deleteCommentByID(id: number) {
    return this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  updateCommentByID(comment: Comment, id: number): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/update/${id}`, 
    { 
      id: comment.id,
      timestamp: comment.timestamp,
      text: comment.text,
      voteCount: comment.voteCount,
      parentComment: comment.parentComment,
      user: comment.user,
      post: comment.post
    },
    { responseType: 'text' });
  }

  saveComment(comment: any) {
    return this.httpClient.post(`${this.APIurl}/save`, { 
      text: comment.text,
      voteCount: comment.voteCount,
      parentComment: comment.parentComment,
      user: comment.user,
      post: comment.post
    },
    { responseType: 'text' });
  }
}
