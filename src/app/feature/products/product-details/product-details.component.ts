import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IProduct, IUser } from '../../../core/interfaces';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  productId!: string;
  product!: IProduct;

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        tap((params) => {
          this.productId = params['productId'];
          this.isLoading = true;
        }),
        switchMap((params) => {
          return this.productService.loadById$(params['productId']);
        })
      )
      .subscribe({
        next: (product) => {
          this.titleService.setTitle(product.model + ' | iWindy');
          this.product = product;
          console.log(product);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          alert(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
