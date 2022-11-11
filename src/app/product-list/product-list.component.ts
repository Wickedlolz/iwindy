import { Component, OnInit } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products!: IProduct[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.loadProducts$().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => alert(error),
    });
  }

  handleChangeCategory(category: string): void {
    this.productService.loadByCategory$(category).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => alert(error),
    });
  }

  handleSearch($event: SubmitEvent): void {
    $event.preventDefault();
    const formData = new FormData($event.target as HTMLFormElement);
    const searchText = formData.get('search');
    console.log(searchText);
  }
}
