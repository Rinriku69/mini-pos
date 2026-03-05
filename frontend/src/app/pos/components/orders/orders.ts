import { Component, input } from '@angular/core';
import { OrderCard } from './order-card/order-card';
import { Order } from '../../models/types';

@Component({
  selector: 'app-orders',
  imports: [OrderCard],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  readonly orders = input.required<Order[]>();

}
