import { Component, input } from '@angular/core';
import { Cart, CartItems } from '../../../models/cart.model';

@Component({
  selector: 'app-cart-items-list',
  imports: [],
  templateUrl: './cart-items-list.html',
  styleUrl: './cart-items-list.scss',
})
export class CartItemsList {
  cartItems = input<CartItems[]>();
}
