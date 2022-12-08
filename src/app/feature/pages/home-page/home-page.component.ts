import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IRootState, loadLatest } from 'src/app/+store';
import { IProduct } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

interface IServicesState {
  designState: string;
  shippingState: string;
  supportState: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('300ms ease-out')),
      transition('default => rotated', animate('300ms ease-in')),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  latestProducts: IProduct[] = [];
  isLoading: boolean = true;
  latest$: Observable<IProduct[] | null> = this.store.select(
    (state) => state.latestProducts
  );

  servicesState: IServicesState = {
    designState: 'default',
    shippingState: 'default',
    supportState: 'default',
  };

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private store: Store<IRootState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Home | iWindy');

    this.latest$
      .subscribe((products) => {
        if (!products) {
          this.store.dispatch(loadLatest());
        }

        this.isLoading = false;
      })
      .unsubscribe();
  }

  rotate(type: string): void {
    const key = type as keyof IServicesState;
    this.servicesState[key] =
      this.servicesState[key] === 'default' ? 'rotated' : 'default';
  }
}
