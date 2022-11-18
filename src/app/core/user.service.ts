import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: IUser | null = null;
  isAuth: boolean = false;

  constructor(private http: HttpClient) {}

  login(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
  }

  login$(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(
      apiUrl + '/users/login',
      { email, password },
      { withCredentials: true }
    );
  }

  register$(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(
      apiUrl + '/users/register',
      { email, password },
      { withCredentials: true }
    );
  }

  logout$(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(apiUrl + '/users/logout');
  }
}
