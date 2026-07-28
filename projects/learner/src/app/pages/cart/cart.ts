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
  readonly cart = signal<CartModel | null>(null);
  readonly cartItems = signal<CartModel['items']>([]);

  ngOnInit(){
    this.cartService.getCart().subscribe({
      next: (cart: CartModel) => {
        this.cart.set(cart);
        this.cartItems.set(cart.items);
      }
    })
  }
}
