import { IRootState } from 'src/app/+store';
import { ICart, IUser } from 'src/app/core/interfaces';

export interface IProfilePageState {
  currentProfile: IUser | undefined;
  isLoading: boolean;
}

export interface ICartPageState {
  currentCart: ICart[] | undefined;
  isLoading: boolean;
  isOrderModalVisible: boolean;
}

export interface IAuthState {
  profile: IProfilePageState;
  cart: ICartPageState;
}

export interface IAuthModuleState extends IRootState {
  auth: IAuthState;
}
