import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { UserService } from 'src/app/core/user.service';
import { profileLoaded, profilePageInitalized } from './actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  profileLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profilePageInitalized),
      mergeMap(() => this.userService.getProfile$()),
      map((currentProfile) =>
        profileLoaded({ profile: currentProfile, isLoading: false })
      ),
      catchError((error) => EMPTY)
    )
  );
}
