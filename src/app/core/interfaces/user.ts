import { IProduct } from './product';

export interface IUser {
  cart: IProduct[];
  createdAt: string;
  email: string;
  updatedAt: string;
  _id: string;
  myProducts: IProduct[];
  buyed: IProduct[];
}
