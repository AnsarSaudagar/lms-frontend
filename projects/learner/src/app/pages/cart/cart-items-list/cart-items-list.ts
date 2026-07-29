import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-items-list',
  imports: [CommonModule],
  templateUrl: './cart-items-list.html',
  styleUrl: './cart-items-list.scss',
})
export class CartItemsList {
  cartItems = input<CartItem[]>();
  private cartService = inject(CartService);

  onRemoveItem(projectId : string){
    this.cartService.removeItemFromCart(projectId).subscribe();
  }
}
