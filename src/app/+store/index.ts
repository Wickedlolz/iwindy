import { IProduct } from '../core/interfaces';

export * from './actions';
export * from './reducers';

export interface IRootState {
  latestProducts: IProduct[] | null;
}
