import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser } from './interfaces';
import { AuthService } from './auth.service';
import { MessageBusService, MessageType } from './message-bus.service';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authServie: AuthService,
    private messageBusService: MessageBusService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;
    // TODO!: change request in every service --> example: (apiUrl + '/login' ...) to ('/api/login'), /api will be replaced
    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiUrl),
        withCredentials: true,
      });
    } else {
      req = request.clone({ withCredentials: true });
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const newlyLoggedUser: IUser = event.body as IUser;
            this.authServie.handleLogin(newlyLoggedUser);
          } else if (event.url?.endsWith('logout')) {
            this.authServie.handleLogout();
            this.messageBusService.notifyForMessage({
              text: 'Successfully logged out!',
              type: MessageType.Success,
            });
          }
        }
      })
    );
  }
}
