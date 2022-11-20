import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { GuestGuard } from '../core/guards/guest.guard';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: RegisterComponent,
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent,
  },
  {
    path: 'profile/:userId',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'cart/:userId',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
