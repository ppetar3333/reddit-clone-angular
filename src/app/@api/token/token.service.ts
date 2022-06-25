import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(value: string) {
    localStorage.setItem('token', value);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  decodeToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    console.log(expiry);
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  whenTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry;
  }

  didTokenExpired() {
    const expired = this.tokenExpired(JSON.stringify(this.getToken()));
    return expired;
  }
}
