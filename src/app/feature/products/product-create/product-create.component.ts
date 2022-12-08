import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createProduct } from '../+store';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private titleService: Title,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create | iWindy');
  }

  handleCreate(productCreateForm: NgForm): void {
    if (productCreateForm.invalid) {
      return;
    }

    this.productService
      .create$(productCreateForm.value)
      .subscribe((product) => {
        this.store.dispatch(createProduct({ product }));
        this.router.navigate(['/products']);
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
