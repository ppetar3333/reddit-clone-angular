import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banned } from '../models/banned.model';

@Injectable({
  providedIn: 'root'
})
export class BannedService {
  private readonly APIurl = `${environment.APIurl}/banned`;

  constructor(private httpClient: HttpClient) { }

  public saveBanned(banned: Banned) {
    return this.httpClient.post(`${this.APIurl}/save`, 
        { byModerator: banned.byModerator },
        { responseType: 'text' });
  }
}
