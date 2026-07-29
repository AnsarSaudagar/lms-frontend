import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItems } from '../../../models/cart.model';

@Component({
  selector: 'app-cart-items-list',
  imports: [CommonModule],
  templateUrl: './cart-items-list.html',
  styleUrl: './cart-items-list.scss',
})
export class CartItemsList {
  cartItems = input<CartItems[]>();
  remove = output<CartItems>();
  saveToWishlist = output<CartItems>();
}
