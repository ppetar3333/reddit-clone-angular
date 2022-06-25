import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reaction } from '../models/reaction.model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private readonly APIurl = `${environment.APIurl}/reactions`;

  constructor(private httpClient: HttpClient) {}

  public getReactions(): Observable<Reaction[]> {
    return this.httpClient.get<Reaction[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getReactionsByUserId(id: number): Observable<Reaction[]> {
    return this.httpClient.get<Reaction[]>(`${this.APIurl}/by-user/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public getReactionByID(id: number): Observable<Reaction> {
    return this.httpClient.get<Reaction>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  public deleteReactionByID(id: number) {
    this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  public updateReactionByID(reaction: Reaction, id: number) {
    this.httpClient.put(`${this.APIurl}/update/${id}`, { reaction });
  }

  public saveReaction(reaction: Reaction) {
    this.httpClient.post(`${this.APIurl}/save`, { reaction });
  }
}
