import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleLoginClick(event: MouseEvent): void {
    event.preventDefault();
    this.isAuth = !this.isAuth;
  }

  handleLogOutClick(event: MouseEvent): void {
    event.preventDefault();
    this.isAuth = !this.isAuth;
  }
}
