import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/create',
    // canActivate: [AuthGuard],
    component: ProductCreateComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
  },
];

export const ProductsRoutingModule = RouterModule.forChild(routes);
