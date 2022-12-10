import { createAction, props } from '@ngrx/store';
import { ICart, IUser } from 'src/app/core/interfaces';

const profileDomain = '[ProfileComponent]';
export const profilePageInitalized = createAction(
  `${profileDomain} Profile Initailize`
);

export const profileLoaded = createAction(
  `${profileDomain} Profile Loaded`,
  props<{ profile: IUser; isLoading: boolean }>()
);

const cartDomain = '[CartComponent]';
export const cartPageInitialize = createAction(`${cartDomain} Cart Initialize`);

export const cartLoaded = createAction(
  `${cartDomain} Cart Loaded`,
  props<{ cartItems: ICart[]; isLoading: boolean }>()
);

export const cartItemDeleteInitialize = createAction(
  `${cartDomain} Cart Item Delete Initialize`
);

export const cartItemDeleteSuccess = createAction(
  `${cartDomain} Cart Item Delete Success`,
  props<{ cartItems: ICart[]; isLoading: boolean }>()
);

export const cartOrderModalInitialize = createAction(
  `${cartDomain} Cart Order Modal Initialize`,
  props<{ isOrderModalVisible: boolean }>()
);

export const cartOrderSuccess = createAction(
  `${cartDomain} Cart Order Success`,
  props<{ cartItems: ICart[] }>()
);
