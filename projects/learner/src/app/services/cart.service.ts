import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);

  getCart(){
    return this.http.get<Cart>(`cart/items`);
  }

  addItemToCart(projectId : string){
    return this.http.post<Cart>(`cart/items`, { projectId });
  }

  removeItemFromCart(projectId: string){
    return this.http.delete<Cart>(`cart/items/${projectId}`);
  }

  moveToWishlist(){

  }

  proceedToCheckout(){

  }


}
