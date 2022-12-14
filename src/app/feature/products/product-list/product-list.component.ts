import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

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

  private pageChange$ = new BehaviorSubject(undefined);
  private subscription!: Subscription;

  searchControl = new FormControl('', [Validators.required]);
  searchFormGroup: FormGroup = this.formBuilder.group({
    search: this.searchControl,
  });

  readonly pageSize = 12;
  currentPage: number = 0;
  totalResults: number = 0;

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Products | iWindy');

    this.subscription = combineLatest([
      this.searchControl.valueChanges.pipe(debounceTime(400), startWith('')),
      this.pageChange$,
    ])
      .pipe(
        switchMap(([searchTerm]) =>
          this.productService.loadProductPaginatedList$(
            searchTerm!,
            this.currentPage * this.pageSize,
            this.pageSize
          )
        )
      )
      .subscribe((result) => {
        this.selectedCategory = 'all';
        this.products = result.results;
        this.totalResults = result.totalResults;
        this.isLoading = false;
      });
  }

  handleChangeCategory(category: string): void {
    this.isLoading = true;
    this.currentPage = 0;

    if (category === 'all') {
      this.productService
        .loadProductPaginatedList$(
          '',
          this.currentPage * this.pageSize,
          this.pageSize
        )
        .subscribe({
          next: (result) => {
            this.products = result.results;
            this.totalResults = result.totalResults;
            this.selectedCategory = category;
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
          },
        });
    } else {
      this.productService
        .loadByCategoryPaginatedList$(
          category,
          this.currentPage * this.pageSize,
          this.pageSize
        )
        .subscribe({
          next: (result) => {
            this.products = result.results;
            this.totalResults = result.totalResults;
            this.selectedCategory = category;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  }

  handlePageBack(): void {
    this.currentPage--;
    this.pageChange$.next(undefined);
  }

  handlePageForward(): void {
    this.currentPage++;
    this.pageChange$.next(undefined);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
