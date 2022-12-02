import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { IProduct } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  product!: IProduct;
  productId!: string;
  isLoading: boolean = true;

  private subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
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
          this.titleService.setTitle('Edit Product | iWindy');
          this.product = product;
          this.isLoading = false;
        },
      });
  }

  handleUpdate(productUpdateGroup: NgForm): void {
    if (productUpdateGroup.invalid) {
      return;
    }

    this.productService
      .update$(this.productId, productUpdateGroup.value)
      .subscribe({
        next: (product) => {
          this.router.navigate(['/products', this.productId]);
        },
        error: (error) => console.error(error),
      });
  }

  navigateBack(): void {
    this.router.navigate(['/products', this.productId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
