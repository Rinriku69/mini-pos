import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-pos-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pos-nav.html',
  styleUrl: './pos-nav.scss',
})
export class PosNav {
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
