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
    return this.httpClient.get<Post[]>(`${this.APIurl}/all`).pipe(
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

  public searchByDesc(desc: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APIurl}/text`, { text: desc }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public searchByTitle(title: string): Observable<any> {
    return this.httpClient.post<any>(`${this.APIurl}/title`, { title: title }).pipe(
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

  public searchByKarma(bottom: number, top: number): Observable<any> {
    let queryParams = new HttpParams();
    if (bottom != null) {
      queryParams = queryParams.set('bottom', bottom);
    }
    if (top != null) {
      queryParams = queryParams.set('top', top);
    }

    return this.httpClient.get<any>(`${this.APIurl}/karma`, {params: queryParams}).pipe(
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

  public savePost(post: AddPost, file: any): Observable<string> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('files', file);
    } else {
      const emptyPdfBlob = new Blob([new Uint8Array([])], { type: 'application/pdf' });
      const emptyPdfFile = new File([emptyPdfBlob], 'empty.pdf');
      formData.append('files', emptyPdfFile);
    }
    formData.append('title', post.title);
    formData.append('text', post.description);
    formData.append('imagePath', post.image);
  
    return this.httpClient.post(
      `${this.APIurl}/save/${post.user.userID}/${post.flair.flairID}/${post.subreddit.subredditID}`,
      formData,
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
