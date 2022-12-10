import { createReducer, on } from '@ngrx/store';
import { ICartPageState, IProfilePageState } from '.';
import {
  cartItemDeleteSuccess,
  cartLoaded,
  cartOrderModalInitialize,
  cartOrderSuccess,
  profileLoaded,
} from './actions';

export const profileReducer = createReducer<IProfilePageState>(
  {
    currentProfile: undefined,
    isLoading: true,
  },
  on(profileLoaded, (state, action) => {
    return {
      ...state,
      currentProfile: action.profile,
      isLoading: action.isLoading,
    };
  })
);

export const cartReducer = createReducer<ICartPageState>(
  {
    currentCart: undefined,
    isLoading: true,
    isOrderModalVisible: false,
  },
  on(cartLoaded, (state, action) => {
    return {
      ...state,
      currentCart: action.cartItems,
      isLoading: action.isLoading,
    };
  }),
  on(cartItemDeleteSuccess, (state, action) => {
    return {
      ...state,
      currentCart: action.cartItems,
      isLoading: action.isLoading,
    };
  }),
  on(cartOrderModalInitialize, (state, action) => {
    return {
      ...state,
      isOrderModalVisible: action.isOrderModalVisible,
    };
  }),
  on(cartOrderSuccess, (state, action) => {
    return {
      ...state,
      currentCart: action.cartItems,
    };
  })
);
