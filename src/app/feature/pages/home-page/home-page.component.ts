import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { IProduct, IImage } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
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
      path: '/assets/images/huawei.jpeg',
      name: 'huawei',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    zip(
      this.productService.loadByCategory$('apple'),
      this.productService.loadProducts$(),
      this.productService.loadProducts$()
    ).subscribe(([apple, samsung, huawei]) => {
      this.isLoading = false;
      this.appleProducts = apple;
      this.samsungProducts = samsung;
      this.huaweiProducts = huawei;
    });
  }
}
