import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css'],
})
export class ProductDeleteModalComponent implements OnInit {
  @Input() productId!: string;
  @Input() productName!: string;
  @Output() handleDeleteAction = new EventEmitter();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  handleDelete(): void {
    this.productService.delete$(this.productId).subscribe({
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
