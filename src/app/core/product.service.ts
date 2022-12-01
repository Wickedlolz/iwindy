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
    return this.http.get<IProduct[]>(apiUrl + '/products');
  }

  loadLatest$(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(apiUrl + '/products/latest');
  }

  loadByCategory$(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(apiUrl + '/products/category/' + category);
  }

  loadById$(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(apiUrl + '/products/' + productId);
  }

  create$(productData: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(apiUrl + '/products', productData);
  }

  searchProducts$(searchedValue: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      apiUrl + `/products?search=${searchedValue}`
    );
  }
}
