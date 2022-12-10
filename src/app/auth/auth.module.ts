import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { StoreModule } from '@ngrx/store';
import { IAuthState } from './+store';
import { cartReducer, profileReducer } from './+store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './+store/profile.effects';
import { CartEffect } from './+store/cart.effects';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    CartComponent,
    OrderModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature<IAuthState>('auth', {
      profile: profileReducer,
      cart: cartReducer,
    }),
    EffectsModule.forFeature([ProfileEffects, CartEffect]),
  ],
})
export class AuthModule {}
