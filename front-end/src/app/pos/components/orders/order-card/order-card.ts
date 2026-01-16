import { Component, input } from '@angular/core';
import { Order } from '../../../models/types';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  order = input.required<Order>();


}
