import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/products/home/home.component';
import { ProductCreateComponent } from './feature/products/product-create/product-create.component';
import { ProductDetailsComponent } from './feature/products/product-details/product-details.component';
import { ProductListComponent } from './feature/products/product-list/product-list.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
