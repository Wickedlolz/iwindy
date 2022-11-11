import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  loadProducts$(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(apiUrl + '/products', {
      withCredentials: true,
    });
  }

  loadByCategory$(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      apiUrl + '/products/category/' + category,
      { withCredentials: true }
    );
  }

  loadById$(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(apiUrl + '/products/' + productId, {
      withCredentials: true,
    });
  }
}
