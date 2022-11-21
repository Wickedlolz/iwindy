import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get currentUser(): IUser | null {
    return this.userService.user;
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  handleLogOutClick($event: MouseEvent): void {
    $event.preventDefault();
    this.userService.logout$().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => alert(error),
    });
  }
}
