import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isAuth: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleLoginClick(event: MouseEvent): void {
    event.preventDefault();
    this.isAuth = !this.isAuth;
  }

  handleLogOutClick($event: MouseEvent): void {
    $event.preventDefault();
    this.isAuth = !this.isAuth;
  }
}
