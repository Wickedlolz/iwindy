import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular14-responsive-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IvyCarouselModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
  ],
})
export class ProductsModule {}
