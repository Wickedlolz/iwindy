import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create | iWindy');
  }

  handleCreate(productCreateForm: NgForm): void {
    console.log(productCreateForm.value);
    this.productService.create$(productCreateForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
