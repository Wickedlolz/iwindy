import { createAction, props } from '@ngrx/store';
import { IProduct } from '../core/interfaces';

const homePageDomain = '[HomePageComponennt]';
export const loadLatestInitialize = createAction(
  `${homePageDomain} Load Latest Initialize`
);

export const loadLatestSuccess = createAction(
  `${homePageDomain} Load Latest Success`,
  props<{ products: IProduct[] }>()
);
