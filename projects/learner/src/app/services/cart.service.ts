import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  getCart(){
    return this.http.get<Cart>(`cart`);
  }

  addItemToCart(){

  }

  removeItemFromCart(){

  }

  moveToWishlist(){

  }

  proceedToCheckout(){

  }


}
