import { IRootState } from 'src/app/+store';
import { IProduct } from 'src/app/core/interfaces';

export * from './actions';
export * from './reducers';

export interface IProductsListState {
  results: IProduct[] | undefined;
  totalResults: number | 0;
}

export interface IProductsState {
  productsList: IProductsListState;
  productDetails: IProduct | undefined;
}

export interface IProductsModuleState extends IRootState {
  products: IProductsState;
}
