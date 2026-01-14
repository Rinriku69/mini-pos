import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartCard } from '../cart-card/cart-card';

@Component({
  selector: 'app-cart',
  imports: [CartCard],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartService = inject(CartService)
  protected readonly cart = toSignal(this.cartService.cart$);


}
