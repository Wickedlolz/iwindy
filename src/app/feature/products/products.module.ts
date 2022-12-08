import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteModalComponent } from './product-delete-modal/product-delete-modal.component';
import { StoreModule } from '@ngrx/store';
import {
  IProductsState,
  productsListReducer,
  productDetailsReducer,
} from './+store';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDeleteModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature<IProductsState>('products', {
      productsList: productsListReducer,
      productDetails: productDetailsReducer,
    }),
  ],
})
export class ProductsModule {}
