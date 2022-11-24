import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../core/interfaces';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products!: IProduct[];
  selectedCategory: string = 'all';
  isLoading: boolean = true;

  hasError: boolean = false;
  errorMessage: string = '';

  private subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Products | iWindy');
    this.subscription = this.productService.loadProducts$().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.hasError = true;
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  handleChangeCategory(category: string): void {
    this.isLoading = true;

    if (category === 'all') {
      this.productService.loadProducts$().subscribe({
        next: (products) => {
          this.products = products;
          this.selectedCategory = category;
          this.isLoading = false;
        },
        error: (error) => {
          this.hasError = true;
          this.errorMessage = error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.productService.loadByCategory$(category).subscribe({
        next: (products) => {
          this.products = products;
          this.selectedCategory = category;
          this.isLoading = false;
        },
        error: (error) => {
          this.hasError = true;
          this.errorMessage = error.message;
          this.isLoading = false;
        },
      });
    }
  }

  handleSearch($event: SubmitEvent): void {
    $event.preventDefault();
    const formData = new FormData($event.target as HTMLFormElement);
    const searchText = formData.get('search');
    console.log(searchText);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
