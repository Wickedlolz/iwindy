import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
  },
  {
    path: 'cart/:userId',
    component: CartComponent,
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
