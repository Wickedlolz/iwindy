import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message!: string;
  isMessageError!: boolean;
  isPending: boolean = false;

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(
      (newMessage) => {
        this.message = newMessage?.text || '';
        this.isMessageError = newMessage?.type === MessageType.Error;

        if (this.message) {
          setTimeout(() => {
            this.messageBus.clear();
          }, 5000);
        }
      }
    );
  }

  handleLogout(): void {
    if (!this.isPending) {
      this.isPending = true;

      this.authService.logout$().subscribe({
        next: () => {
          this.isPending = false;
          this.router.navigate(['/home']);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
