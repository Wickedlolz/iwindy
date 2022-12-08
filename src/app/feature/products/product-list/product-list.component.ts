import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  Observable,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import {
  IProductsModuleState,
  productsByCategoryLoaded,
  productsLoaded,
} from '../+store';
import { IProduct } from '../../../core/interfaces';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<IProduct[] | undefined> = this.store.select(
    (state) => state.products.productsList.results
  );
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
  totalResults: Observable<number> = this.store.select(
    (state) => state.products.productsList.totalResults
  );

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private store: Store<IProductsModuleState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Products | iWindy');

    this.subscription = combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(400),
        startWith(''),
        tap((searchTearm) => console.log('Search Term: ' + searchTearm))
      ),
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
        this.store.dispatch(
          productsLoaded({
            products: result.results,
            totalResults: result.totalResults,
          })
        );
        this.isLoading = false;
      });
  }

  // TODO?: fix when change category to show correct page
  handleChangeCategory(category: string): void {
    this.isLoading = true;

    if (category === 'all') {
      this.productService
        .loadProductPaginatedList$(
          '',
          this.currentPage * this.pageSize,
          this.pageSize
        )
        .subscribe({
          next: (result) => {
            this.store.dispatch(
              productsByCategoryLoaded({ products: result.results })
            );
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
          this.store.dispatch(productsByCategoryLoaded({ products }));
          this.selectedCategory = category;
          this.isLoading = false;
        },
        error: (error) => {
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
