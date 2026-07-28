import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../models/cart.model';

@Component({
  selector: 'app-cart-checkout-card',
  imports: [CommonModule],
  templateUrl: './cart-checkout-card.html',
  styleUrl: './cart-checkout-card.scss',
})
export class CartCheckoutCard {
  cart = input<Cart | null>(null);

  total = computed(() => this.cart()?.total ?? 0);

  originalTotal = computed(() =>
    (this.cart()?.items ?? []).reduce((sum, item) => sum + (item.originalPrice ?? item.price), 0),
  );

  discountAmount = computed(() => this.originalTotal() - this.total());

  discountPct = computed(() => {
    const explicit = this.cart()?.discount;
    if (explicit) return explicit;
    const original = this.originalTotal();
    return original > 0 ? Math.round((this.discountAmount() / original) * 100) : 0;
  });

  currency = computed(() => this.cart()?.currency ?? 'USD');
}
