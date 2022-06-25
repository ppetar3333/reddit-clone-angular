import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flair } from '../models/flair.model';
import { FlairsSubreddit } from '../models/flairs-subreddit.model';
import { Subreddit } from '../models/subreddit.model';

@Injectable({
  providedIn: 'root',
})
export class FlairService {
  private readonly APIurl = `${environment.APIurl}/flairs`;

  constructor(private httpClient: HttpClient) {}

  getFlairs(): Observable<Flair[]> {
    return this.httpClient.get<Flair[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getFlairByID(id: number): Observable<Flair> {
    return this.httpClient.get<Flair>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getFlairByName(name: string): Observable<Flair> {
    return this.httpClient.get<Flair>(`${this.APIurl}/byName/${name}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }


  getFlairsBySubredditId(id?: number): Observable<FlairsSubreddit[]> {
    return this.httpClient.get<FlairsSubreddit[]>(`${this.APIurl}/bySubreddit/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  updateFlairByID(flair: Flair, id: number) {
    return this.httpClient.put(`${this.APIurl}/update/${id}`, { flairID: id, name: flair.name }, { responseType: 'text' });
  }

  saveFlair(flair: Flair) {
    return this.httpClient.post(`${this.APIurl}/save`, { name: flair.name }, { responseType: 'text' });
  }

  saveFlairIntoSubreddit(flairSubreddit: FlairsSubreddit) {
    return this.httpClient.post(`${this.APIurl}/save/into-subreddit`, {
      flairid: flairSubreddit.flairid,
      subredditid: flairSubreddit.subredditid
    }, { responseType: 'text' })
  }

  deleteFlairByID(id: number) {
    return this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  deleteFlairByName(subredditid: number, flairName: string) {
    return this.httpClient.delete(`${this.APIurl}/delete/by-subreddit/${subredditid}/${flairName}`)
  }
}
