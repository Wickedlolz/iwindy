import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

interface IUser {
  _id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}