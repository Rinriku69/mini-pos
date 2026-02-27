import { Component, computed, effect, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartCard } from './cart-card/cart-card';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartCard, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartService = inject(CartService)
  protected readonly cart = toSignal(this.cartService.cart$);
  readonly total = computed(() => {
    const cart = this.cart();
    if (!cart) return 0;
    return cart.cart_items.reduce((result, curr) => {

      return result + (curr.product.price * curr.qty)
    }, 0)
  }
  )
  constructor() { }

  cartCheckout(): void {

    this.cartService.createOrder()

  }
}
