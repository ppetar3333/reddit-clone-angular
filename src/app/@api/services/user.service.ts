import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../auth/auth.model';
import { User } from '../models/user.model';
import { UserRegister } from '../models/user-register.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly APIurl = `${environment.APIurl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.APIurl).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.APIurl}/findOne/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  saveUser(user: User) {
    this.httpClient.post(`${this.APIurl}/save`, { user });
  }

  registerUser(user: UserRegister) {
    return this.httpClient.post(
      `${this.APIurl}/register`,
      {
        username: user.username,
        password: user.password,
        email: user.email,
        avatar: user.avatar,
      },
      { responseType: 'text' }
    );
  }

  updateUserByID(user: User, id: number) {
    return this.httpClient.put(
      `${this.APIurl}/update/${id}`,
      {
        userID: user.userID,
        username: user.username,
        password: user.password,
        email: user.email,
        displayName: user.displayName,
        profileDescription: user.profileDescription,
        avatar: user.avatar,
        banned: user.banned,
        registrationDate: user.registrationDate,
        role: user.role,
      },
      { responseType: 'text' }
    );
  }

  deleteUserByID(id: number) {
    this.httpClient.delete(`${this.APIurl}/delete/${id}`);
  }

  blockUserByUsername(username: string) {
    return this.httpClient.patch(`${this.APIurl}/block/${username}`, {username});
  }

  unblockUserByUsername(username: string) {
    return this.httpClient.patch(`${this.APIurl}/unblock/${username}`, {username});
  }

  removeModerator(username: string) {
    return this.httpClient.patch(`${this.APIurl}/removeModerator/${username}`, {username});
  }

  changePassword(username: string, currentPassword: string, newPassword: string) {
    return this.httpClient.put(`${this.APIurl}/change-password`, {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword
    }, { responseType: 'text' }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
