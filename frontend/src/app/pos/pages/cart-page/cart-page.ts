import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

import { Cart } from "../../components/cart/cart";


@Component({
  selector: 'app-cart-page',
  imports: [Cart,],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  cartService = inject(CartService)
  protected readonly cart = computed(() => this.cartService.cart$());

  readonly total = computed(() => {
    const cart = this.cart();
    if (!cart) return 0;
    return cart.cart_items.reduce((result, curr) => {

      return result + (curr.product.price * curr.qty)
    }, 0)
  }
  )


  cartCheckout(): void {

    this.cartService.createOrder().subscribe({
      next: (response) => {
        console.log('order created successfully');
        alert('Order Created')
        this.cartService.clearCart()

      },
      error: (error) => {
        console.error('An error occured:', error.error.message);

      }
    });
  }


}
