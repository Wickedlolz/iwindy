import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/core/interfaces';

const productListDomain = '[ProductListComponent]';
export const productsLoaded = createAction(
  `${productListDomain} Products Loaded`,
  props<{ products: IProduct[]; totalResults: number }>()
);
export const productsByCategoryLoaded = createAction(
  `${productListDomain} Product By Category Loaded`,
  props<{ products: IProduct[] }>()
);

const productDetailsDomain = '[ProductDetailsComponent]';
export const productDetailsLoaded = createAction(
  `${productDetailsDomain} Load Product`,
  props<{ product: IProduct }>()
);

const productCreateDomain = '[ProductCreateComponent]';
export const createProduct = createAction(
  `${productCreateDomain} Create Product`
);
