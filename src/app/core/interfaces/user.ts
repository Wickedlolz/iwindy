import { ICart } from './cart';
import { IProduct } from './product';

export interface IUser {
  cart: ICart[];
  createdAt: string;
  email: string;
  updatedAt: string;
  _id: string;
  myProducts: IProduct[];
  buyed: IProduct[];
}

export interface IUserDto {
  email: string;
  password: string;
}
