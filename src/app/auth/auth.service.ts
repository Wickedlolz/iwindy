import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<IUser | undefined>(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  constructor(private http: HttpClient) {}

  login$(email: string, password: string): Observable<IUser | null> {
    return this.http
      .post<IUser>(
        apiUrl + '/users/login',
        { email, password },
        { observe: 'response' }
      )
      .pipe(map((response) => response.body));
  }

  register$(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(apiUrl + '/users/register', {
      email,
      password,
    });
  }

  logout$(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(apiUrl + '/users/logout');
  }

  handleLogin(newUser: IUser): void {
    this._currentUser.next(newUser);
  }

  handleLogout(): void {
    this._currentUser.next(undefined);
  }
}
