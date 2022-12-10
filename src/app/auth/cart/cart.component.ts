import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import {
  cartItemDeleteSuccess,
  cartOrderModalInitialize,
  cartOrderSuccess,
  cartPageInitialize,
} from '../+store/actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<ICart[] | undefined> = this.store.select(
    (state) => state.auth.cart.currentCart
  );
  isLoading$: Observable<boolean> = this.store.select(
    (state) => state.auth.cart.isLoading
  );
  isOrderModalVisible$: Observable<boolean> = this.store.select(
    (state) => state.auth.cart.isOrderModalVisible
  );

  constructor(
    private titleService: Title,
    private userService: UserService,
    private store: Store<IAuthModuleState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Shopping Cart | iWindy');
    this.store.dispatch(cartPageInitialize());
  }

  handleRemoveItem(product: ICart): void {
    this.userService.removeFromCart$(product).subscribe({
      next: (user) => {
        this.store.dispatch(
          cartItemDeleteSuccess({ cartItems: user.cart, isLoading: false })
        );
      },
    });
  }

  handleOrderNow(): void {
    this.store.dispatch(
      cartOrderModalInitialize({ isOrderModalVisible: true })
    );

    this.userService.makeOrder$().subscribe({
      next: (cartItems) => {
        this.store.dispatch(cartOrderSuccess({ cartItems: cartItems }));

        setTimeout(() => {
          this.store.dispatch(
            cartOrderModalInitialize({ isOrderModalVisible: false })
          );
        }, 4000);
      },
    });
  }

  calcTotalPrice(): number {
    let totalPrice: number = 0;

    this.cartItems$
      .subscribe((items) => {
        items?.forEach(
          (item) => (totalPrice += Number(item.productId.price) * item.quantity)
        );
      })
      .unsubscribe();

    return totalPrice;
  }
}
