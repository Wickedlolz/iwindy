import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IProduct } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // TODO!: implement load user items in cart and functionality <--
  cartItems: IProduct[] = [];
  isLoading: boolean = true;

  constructor(private titleService: Title, private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.titleService.setTitle('Shopping Cart | iWindy');
    this.userService.getCartItems$().subscribe({
      next: (products) => {
        this.cartItems = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        alert(error.message);
      },
    });
  }

  onSelected(value: string, product: IProduct) {
    product.quantity = product.price * Number(value);
  }
}
