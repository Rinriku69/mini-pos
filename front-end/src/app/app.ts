import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from './pos/services/cart-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mini-pos');
  private cartService = inject(CartService)
  cart = toSignal(this.cartService.cart$)
  cartBumpActive = toSignal(this.cartService.cartBumpActive)
  cartCount = computed(() => {
    const cart = this.cart()
    if (!cart) {
      return 0
    } else {
      return cart.order_item.length
    }
  })


  constructor() {
    effect(() => {
      console.log('cart change' + this.cart()?.order_item)
    })
  }



}
