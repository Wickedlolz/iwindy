import { createAction, props } from '@ngrx/store';
import { IProduct } from '../core/interfaces';

const homePageDomain = '[HomePageComponennt]';
export const loadLatest = createAction(`${homePageDomain} Load Latest`);

export const loadLatestSuccess = createAction(
  `${homePageDomain} Load Latest Success`,
  props<{ products: IProduct[] }>()
);
