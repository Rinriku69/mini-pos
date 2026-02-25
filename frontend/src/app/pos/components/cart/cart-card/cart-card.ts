import { Component, inject, input } from '@angular/core';
import { CartItem, } from '../../../models/types';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-card',
  imports: [DecimalPipe],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss',
})
export class CartCard {
  readonly orderItem = input({} as CartItem);
  private cartService = inject(CartService)

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }
}
