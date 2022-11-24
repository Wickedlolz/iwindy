import { IUser } from './user';

export interface IProduct {
  _id?: string;
  model: string;
  price: number;
  released: string;
  weight: string;
  os: string;
  memory: string;
  displaySize: number;
  displayResolutions: string;
  cameraMP: number;
  cameraVideo: string;
  ram: number;
  chipset: string;
  batteryMAH: number;
  batteryType: string;
  image: string;
  video: string;
  creator: IUser;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
