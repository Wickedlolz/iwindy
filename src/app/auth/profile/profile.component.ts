import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile | iWindy');
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['userId'];

      console.log(userId);
    });
  }
}
