import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  forkJoin,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
import { IProductsModuleState, productDetailsLoaded } from '../+store';
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
  product$: Observable<IProduct | undefined> = this.store.select(
    (state) => state.products.productDetails
  );
  relatedProducts!: IProduct[];

  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  isLiked!: Observable<boolean | undefined>;
  isDeleteModalVisible: boolean = false;

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private messageBusService: MessageBusService,
    private store: Store<IProductsModuleState>
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
          this.store.dispatch(productDetailsLoaded({ product }));
          this.isLiked = this.currentUser$.pipe(
            map((user) => user?._id),
            switchMap((userId) =>
              this.product$.pipe(
                map((product) => product?.likes.includes(userId || '')),
                take(1)
              )
            )
          );

          this.relatedProducts = related.filter(
            (p) => p._id !== this.productId
          );
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

  handleLike(): void {
    this.productService.likeProduct$(this.productId).subscribe({
      next: (product) => {
        this.store.dispatch(productDetailsLoaded({ product }));
        this.isLiked = this.currentUser$.pipe(
          map((user) => user?._id),
          switchMap((userId) =>
            this.product$.pipe(
              map((product) => product?.likes.includes(userId || '')),
              take(1)
            )
          )
        );
      },
    });
  }

  handleDislike(): void {
    this.productService.dislikeProduct$(this.productId).subscribe({
      next: (product) => {
        this.store.dispatch(productDetailsLoaded({ product }));
        this.isLiked = this.currentUser$.pipe(
          map((user) => user?._id),
          switchMap((userId) =>
            this.product$.pipe(
              map((product) => product?.likes.includes(userId || '')),
              take(1)
            )
          )
        );
      },
    });
  }

  toggleDeleteModal(): void {
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }

  handleDelete($event: boolean): void {
    if ($event) {
      this.isDeleteModalVisible = false;
      this.router.navigate(['/products']);
    } else {
      this.isDeleteModalVisible = false;
    }
  }

  handleAddToCart(addToCartFromGroup: NgForm): void {
    if (addToCartFromGroup.invalid) {
      return;
    }

    this.userService
      .addToCart$(this.productId, addToCartFromGroup.value.qty)
      .subscribe((cartItem) => {
        this.messageBusService.notifyForMessage({
          text: 'Successfully added to Cart',
          type: MessageType.Success,
        });
      });
  }
}
