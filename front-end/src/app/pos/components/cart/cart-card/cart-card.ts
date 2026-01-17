import { Component, input } from '@angular/core';
import { OrderItem } from '../../../models/types';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-card',
  imports: [DecimalPipe],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss',
})
export class CartCard {
  readonly orderItem = input({} as OrderItem);
}
