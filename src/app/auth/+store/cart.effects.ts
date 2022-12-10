import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { UserService } from 'src/app/core/user.service';
import {
  cartItemDeleteInitialize,
  cartLoaded,
  cartPageInitialize,
} from './actions';

@Injectable()
export class CartEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  onCartLoaded = createEffect(() =>
    this.actions$.pipe(
      ofType(cartPageInitialize),
      mergeMap(() => this.userService.getCartItems$()),
      map((cartItems) => cartLoaded({ cartItems, isLoading: false }))
    )
  );
}
