import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Auth } from './auth.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APIurl = `${environment.APIurl}/users`;
  private decodedToken!: unknown;
  private user: any;
  private _password$ = new BehaviorSubject<string>('');
  password$ = this._password$.asObservable();
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  clearTimeout: any;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(auth: Auth) {
    return this.httpClient
      .post(
        `${this.APIurl}/login`,
        {
          username: auth.getUsername(),
          password: auth.getPassword(),
        },
        { responseType: 'text' }
      )
      .pipe(
        tap((token) => {
          this.decodedToken = this.tokenService.decodeToken(token);
          if (this.decodedToken) {
            this._isLoggedIn$.next(true);
            this.tokenService.setToken(token);
            this.autoLogout(this.tokenService.whenTokenExpired(token));
          } else {
            console.error('Invalid token');
          }
        }),
        catchError((err) => {
          throw new Error('BadCredentialsException ' + err);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('expiration');
    this._isLoggedIn$.next(false);
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  autoLogout(expiration: number) {
    this.clearTimeout = setTimeout(() => {
      this.logout();
      window.location.reload();
      this.router.navigate(['/login']);
    }, expiration);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getRole() {
    const token = this.tokenService.getToken();
    const decodedToken: any = token
      ? this.tokenService.decodeToken(token)
      : null;
    if (decodedToken) {
      
      return decodedToken.role.authority;
    } else {
      return null;
    }
  }

  getLoggedInPassword() {
    return this.password$;
  }

  setLoggedInPassword(password: string) {
    this._password$.next(password);
  }

  getLoggedInUser(): Observable<User> {
    let token = this.tokenService.getToken();
    this.user = this.tokenService.decodeToken(JSON.stringify(token));
    return this.httpClient
      .get<User>(`${this.APIurl}/byUsername/${this.user.sub}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }
}
