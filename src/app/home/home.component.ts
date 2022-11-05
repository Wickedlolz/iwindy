import { Component, OnInit } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { IProduct, ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  appleProducts: IProduct[] = [];
  samsungProducts: IProduct[] = [];
  huaweiProducts: IProduct[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    forkJoin([
      this.productService.getByCategory('apple'),
      this.productService.getAll(),
      this.productService.getAll(),
    ])
      .pipe(tap((results) => (this.isLoading = false)))
      .subscribe(([apple, samsung, huawei]) => {
        this.appleProducts = apple;
        this.samsungProducts = samsung;
        this.huaweiProducts = huawei;
      });
  }
}
