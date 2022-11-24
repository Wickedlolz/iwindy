import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, zip } from 'rxjs';
import { IProduct, IImage } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
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

  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private titleService: Title
  ) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    this.titleService.setTitle('Home | iWindy');
    this.subscription = zip(
      this.productService.loadByCategory$('apple'),
      this.productService.loadProducts$(),
      this.productService.loadProducts$()
    ).subscribe({
      next: ([apple, samsung, huawei]) => {
        this.isLoading = false;
        this.appleProducts = apple;
        this.samsungProducts = samsung;
        this.huaweiProducts = huawei;
      },
      error: (error) => {
        this.hasError = true;
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
