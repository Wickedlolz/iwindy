import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/core/interfaces';
import {
  IProductsListState,
  productsByCategoryLoaded,
  productsLoaded,
  productDetailsLoaded,
} from '.';

const productListInitialState: IProductsListState = {
  results: undefined,
  totalResults: 0,
};

export const productsListReducer = createReducer<IProductsListState>(
  productListInitialState,
  on(productsLoaded, (state, action) => {
    return {
      ...state,
      results: action.products,
      totalResults: action.totalResults,
    };
  }),
  on(productsByCategoryLoaded, (state, action) => {
    return {
      ...state,
      results: action.products,
    };
  })
);

export const productDetailsReducer = createReducer<IProduct | undefined>(
  undefined,
  on(productDetailsLoaded, (state, action) => {
    return action.product;
  })
);
