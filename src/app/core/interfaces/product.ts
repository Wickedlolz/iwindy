import { IUser } from './user';

export interface IProduct {
  _id: string;
  brand: string;
  name: string;
  quantity: number;
  description: string;
  image: string;
  price: string;
  discount: boolean;
  creator: IUser;
  colors: string[];
  sizes: string[];
  likes: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}
