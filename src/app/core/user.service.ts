import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart, IUser } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile$(): Observable<IUser> {
    return this.http.get<IUser>(apiUrl + '/users/profile');
  }

  getCartItems$(): Observable<ICart[]> {
    return this.http.get<ICart[]>(apiUrl + '/users/cart');
  }

  addToCart$(productId: string, quantity: number): Observable<ICart> {
    return this.http.post<ICart>(apiUrl + '/users/cart/add', {
      productId,
      quantity,
    });
  }

  removeFromCart$(product: ICart): Observable<ICart> {
    return this.http.delete<ICart>(apiUrl + '/users/cart/' + product._id);
  }

  makeOrder$(): Observable<ICart[]> {
    return this.http.post<ICart[]>(apiUrl + '/users/cart/order', {});
  }
}
