import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
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
  relatedProducts!: IProduct[];

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  isLiked: boolean = false;

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
          return this.productService.loadById$(params['productId']).pipe(
            switchMap((product) => {
              return forkJoin({
                product: of(product),
                related: this.productService.loadByCategory$(product.category),
              });
            })
          );
        })
      )
      .subscribe({
        next: ({ product, related }) => {
          this.titleService.setTitle(product.name + ' | iWindy');
          this.product = product;
          this.relatedProducts = related;
          this.isLiked = this.checkIfIsLiked();
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

  checkIfIsLiked(): boolean {
    let result: boolean = false;
    this.currentUser$
      .subscribe((user) => {
        result = this.product.likes.includes(user!._id) || false;
      })
      .unsubscribe();

    return result;
  }

  handleLike(): void {
    this.productService.likeProduct$(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLiked = this.checkIfIsLiked();
      },
      error: (error) => console.error(error),
    });
  }

  handleDislike(): void {
    this.productService.dislikeProduct$(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLiked = this.checkIfIsLiked();
      },
      error: (error) => console.error(error),
    });
  }
}
