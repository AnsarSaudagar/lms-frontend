import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {Cart as CartModel} from '../../models/cart.model'

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  private cartService = inject(CartService);
  readonly cart : any = signal([]);

  ngOnInit(){
    this.cartService.getCart().subscribe({
      next: (cart: CartModel) => {
        this.cart.set(cart);
      }
    })
  }
}
