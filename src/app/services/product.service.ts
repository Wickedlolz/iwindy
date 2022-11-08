import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:5000/api/products');
  }

  getByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'http://localhost:5000/api/products/category/' + category
    );
  }

  getById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(
      'http://localhost:5000/api/products/' + productId
    );
  }
}