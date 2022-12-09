import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css'],
})
export class ProductDeleteModalComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() handleDeleteAction = new EventEmitter();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  handleDelete(): void {
    this.productService.delete$(this.product._id).subscribe({
      next: (product) => {
        this.handleDeleteAction.emit(true);
      },
      error: (error) => {
        this.handleDeleteAction.emit(false);
      },
    });
  }

  handleNoClick(): void {
    this.handleDeleteAction.emit(false);
  }
}
