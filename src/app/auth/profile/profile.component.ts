import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import { profilePageInitalized } from '../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<IUser | undefined> = this.store.select(
    (state) => state.auth.profile.currentProfile
  );
  isLoading$: Observable<boolean> = this.store.select(
    (state) => state.auth.profile.isLoading
  );

  constructor(
    private userService: UserService,
    private titleService: Title,
    private store: Store<IAuthModuleState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Profile | iWindy');
    this.store.dispatch(profilePageInitalized());

    // this.userService.getProfile$().subscribe({
    //   next: (user) => {
    //     this.currentUser = user;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // });
  }
}
