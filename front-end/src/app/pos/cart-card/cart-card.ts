import { Component, input } from '@angular/core';
import { OrderItem } from '../models/types';

@Component({
  selector: 'app-cart-card',
  imports: [],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss',
})
export class CartCard {
  readonly orderItem = input({} as OrderItem);
}
