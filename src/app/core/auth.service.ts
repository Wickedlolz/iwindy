import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
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
        apiUrl + '/auth/login',
        { email, password },
        { observe: 'response' }
      )
      .pipe(map((response) => response.body));
  }

  register$(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(apiUrl + '/auth/register', {
      email,
      password,
    });
  }

  logout$(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(apiUrl + '/auth/logout');
  }

  authenticate(): Observable<IUser> {
    return this.http.get<IUser>(apiUrl + '/users/profile').pipe(
      tap((currentProfile) => {
        this.handleLogin(currentProfile);
      }),
      catchError((error) => EMPTY)
    );
  }

  handleLogin(newUser: IUser): void {
    this._currentUser.next(newUser);
  }

  handleLogout(): void {
    this._currentUser.next(undefined);
  }
}
