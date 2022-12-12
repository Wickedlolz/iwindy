import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  forkJoin,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
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
  isLiked!: Observable<boolean | undefined>;
  isDeleteModalVisible: boolean = false;
  isPending: boolean = false;

  private subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private messageBusService: MessageBusService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
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
          this.isLiked = this.currentUser$.pipe(
            map((user) => this.product.likes.includes(user?._id || ''))
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
    this.isPending = true;
    this.productService.likeProduct$(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLiked = this.currentUser$.pipe(
          map((user) => this.product.likes.includes(user?._id || ''))
        );
        this.isPending = false;
      },
    });
  }

  handleDislike(): void {
    this.isPending = true;
    this.productService.dislikeProduct$(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLiked = this.currentUser$.pipe(
          map((user) => this.product.likes.includes(user?._id || ''))
        );
        this.isPending = false;
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
      .subscribe(() => {
        this.messageBusService.notifyForMessage({
          text: 'Successfully added to Cart',
          type: MessageType.Success,
        });
      });
  }
}
