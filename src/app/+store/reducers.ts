import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../core/interfaces';
import { loadLatestSuccess } from './actions';

const initialState = null;

export const loadLatestReducer = createReducer<IProduct[] | null>(
  initialState,
  on(loadLatestSuccess, (state, action) => {
    return [...action.products];
  })
);
