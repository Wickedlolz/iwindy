import { IProduct } from './product';
import { IUser } from './user';

export interface ICart {
  _id: string;
  userId: string;
  productId: IProduct;
  quantity: number;
}
