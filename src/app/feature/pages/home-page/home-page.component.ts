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
  latestProducts: IProduct[] = [];
  isLoading: boolean = true;

  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private titleService: Title
  ) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    this.titleService.setTitle('Home | iWindy');

    this.subscription = this.productService.loadLatest$().subscribe({
      next: (products) => {
        this.latestProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
