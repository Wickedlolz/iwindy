import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() errorMessage!: string;
  @Input() isErrorMessage!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
