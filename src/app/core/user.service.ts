import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: IUser | null = null;

  get isLoggedIn() {
    return !!this.user;
  }

  constructor(private http: HttpClient) {}

  login$(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        apiUrl + '/users/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(tap((user) => (this.user = user)));
  }

  register$(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        apiUrl + '/users/register',
        { email, password },
        { withCredentials: true }
      )
      .pipe(tap((user) => (this.user = user)));
  }

  logout$(): Observable<{ message: string }> {
    return this.http
      .get<{ message: string }>(apiUrl + '/users/logout', {
        withCredentials: true,
      })
      .pipe(tap(() => (this.user = null)));
  }

  getProfile$(): Observable<IUser> {
    return this.http.get<IUser>(apiUrl + '/users/profile', {
      withCredentials: true,
    });
  }
}
