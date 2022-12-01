import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
          this.isLoading = false;
        },
      });
    }
  }

  handleSearch(searchForm: NgForm): void {
    if (searchForm.invalid) {
      return;
    }

    const { search } = searchForm.value;

    this.isLoading = true;
    this.productService.searchProducts$(search).subscribe({
      next: (products) => {
        this.products = products;
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
