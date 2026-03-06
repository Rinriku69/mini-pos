import { Component, computed, effect, inject, input, InputSignal, output } from '@angular/core';
import { ProductCart } from '../../models/types'
import { CartCard } from './cart-card/cart-card';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartCard, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cart: InputSignal<ProductCart> = input<ProductCart>({ cart_items: [] });
  readonly total = input<number>(0);
  readonly checkout = output<void>();
}
