import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IRootState, loadLatest } from 'src/app/+store';
import { IProduct } from 'src/app/core/interfaces';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  latestProducts: IProduct[] = [];
  isLoading: boolean = true;
  latest$: Observable<IProduct[] | null> = this.store.select(
    (state) => state.latestProducts
  );

  constructor(
    private productService: ProductService,
    private titleService: Title,
    private store: Store<IRootState>,
    private actions$: Actions
  ) {}

  private subscription!: Subscription;

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

    // this.subscription = this.productService.loadLatest$().subscribe({
    //   next: (products) => {
    //     this.latestProducts = products;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //   },
    // });
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
