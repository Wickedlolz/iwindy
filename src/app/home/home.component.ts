import { Component, OnInit } from '@angular/core';
import { forkJoin, zip } from 'rxjs';
import { IImage, IProduct } from '../interfaces';
import { ProductService } from '../services/product.service';

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
  images: IImage[] = [
    {
      path: '/assets/images/apple-products.jpg',
      name: 'apple',
    },
    {
      path: '/assets/images/samsung_en.png',
      name: 'samsung',
    },
    {
      path: 'assets/images/huawei.jpeg',
      name: 'huawei',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    zip(
      this.productService.getByCategory('apple'),
      this.productService.getAll(),
      this.productService.getAll()
    ).subscribe(([apple, samsung, huawei]) => {
      this.isLoading = false;
      this.appleProducts = apple;
      this.samsungProducts = samsung;
      this.huaweiProducts = huawei;
    });
  }
}
