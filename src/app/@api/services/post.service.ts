import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddPost } from '../models/add-post.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly APIurl = `${environment.APIurl}/posts`;

  constructor(private httpClient: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getPostByID(id: number | undefined): Observable<Post> {
    return this.httpClient.get<Post>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public sortPostsBy(option: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.APIurl}/sort-posts/${option}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );  
  }

  public sortPostsByAndSubredditId(id?: number, option?: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.APIurl}/sort-posts/by-subreddit/${id}/${option}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );  
  }

  public getPostsBySubredditID(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.APIurl}/subreddit/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public updatePostByID(post: Post, id: number): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/update/${id}`, 
    { 
        postID: post.postID,
        creationDate: post.creationDate,
        title: post.title,
        text: post.text,
        flair: post.flair,
        subreddit: post.subreddit,
        voteCount: post.voteCount,
        user: post.user,
        imagePath: post.imagePath,
    }, 
    { responseType: 'text' });
  }

  public savePost(post: AddPost): Observable<string> {
    return this.httpClient.post(
      `${this.APIurl}/save`,
      {
        title: post.title,
        text: post.description,
        flair: post.flair,
        subreddit: post.subreddit,
        user: post.user,
        imagePath: post.image,
      },
      { responseType: 'text' }
    );
  }

  public getImageByImageName(file: string) {
    return this.httpClient.get(`${environment.APIurl}/image/get/` + file).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public saveImage(file: File) {
    const uploadImageData: FormData = new FormData();
    uploadImageData.append('imageFile', file);
    return this.httpClient.post(
      `${environment.APIurl}/image/upload`,
      uploadImageData,
      {
        responseType: 'text',
      }
    );
  }

  public deletePostByID(id: number) {
    return this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  public deletePostsBySubreddit(id?: number) {
    return this.httpClient.delete(`${this.APIurl}/deleteBySubreddit/${id}`);
  }
}
