import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IUser } from './interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServie: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({ withCredentials: true });

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const newlyLoggedUser: IUser = event.body as IUser;
            this.authServie.handleLogin(newlyLoggedUser);
          } else if (event.url?.endsWith('logout')) {
            this.authServie.handleLogout();
          }
        }
      })
    );
  }
}
