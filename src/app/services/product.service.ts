import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IProduct {
  _id: string;
  model: string;
  price: number;
  released: string;
  weigth: string;
  os: string;
  memory: number;
  displaySize: number;
  displayResolutions: string;
  cameraMP: number;
  cameraVideo: string;
  ram: number;
  chipset: string;
  batteryMAH: number;
  batteryType: string;
  image: string;
  video: string;
  creator: string;
  category: string;
}

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
