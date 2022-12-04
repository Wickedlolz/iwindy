import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICart } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: ICart[] = [];
  isLoading: boolean = true;
  isOrderModalVisible: boolean = false;

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
      },
    });
  }

  handleRemoveItem(product: ICart): void {
    this.userService.removeFromCart$(product).subscribe({
      next: () => {
        const index = this.cartItems.findIndex((x) => x._id === product._id);
        this.cartItems.splice(index, 1);
      },
    });
  }

  handleOrderNow(): void {
    this.userService.makeOrder$().subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;
        this.isOrderModalVisible = true;

        setTimeout(() => {
          this.isOrderModalVisible = false;
        }, 4000);
      },
    });
  }

  calcTotalPrice(): number {
    let total = 0;

    this.cartItems.forEach((item) => {
      total += item.productId.price * item.quantity;
    });

    return total;
  }
}
