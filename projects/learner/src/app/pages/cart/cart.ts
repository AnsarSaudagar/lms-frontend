import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {Cart as CartModel} from '../../models/cart.model'
import { CommonModule } from '@angular/common';
import { CartItemsList } from './cart-items-list/cart-items-list';
import { CartCheckoutCard } from './cart-checkout-card/cart-checkout-card';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItemsList, CartCheckoutCard],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  private cartService = inject(CartService);
  readonly cartItems : any = signal([]);

  ngOnInit(){
    this.cartService.getCart().subscribe({
      next: (cart: CartModel) => {
        this.cartItems.set(cart.items);
      }
    })
  }
}
