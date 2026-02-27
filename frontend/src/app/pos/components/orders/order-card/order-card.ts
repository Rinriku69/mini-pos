import { Component, effect, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Order, } from '../../../models/types';

@Component({
  selector: 'app-order-card',
  imports: [DecimalPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  order = input.required<Order>();


}
