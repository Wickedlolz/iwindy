import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleLoginClick(event: MouseEvent): void {
    event.preventDefault();
    this.userService.login();
    this.isAuth = this.userService.isAuth;
  }

  handleLogOutClick($event: MouseEvent): void {
    $event.preventDefault();
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }
}
