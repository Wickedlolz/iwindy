import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl + '/products');
  }

  getByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.baseUrl}/products/category/${category}`
    );
  }

  getById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${productId}`);
  }
}
