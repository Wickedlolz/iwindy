import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: ProductCreateComponent,
  },
  {
    path: ':productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'edit/:productId',
    canActivate: [AuthGuard],
    component: ProductEditComponent,
  },
];

export const ProductsRoutingModule = RouterModule.forChild(routes);
