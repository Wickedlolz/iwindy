import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser!: IUser;
  isLoading: boolean = true;

  constructor(private userService: UserService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile | iWindy');
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
