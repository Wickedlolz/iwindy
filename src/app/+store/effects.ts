import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { ProductService } from '../core/product.service';
import { loadLatestInitialize, loadLatestSuccess } from '../+store';
import { catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Effects {
  loadLatest = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLatestInitialize),
      switchMap(() =>
        this.productService
          .loadLatest$()
          .pipe(map((products) => loadLatestSuccess({ products })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
