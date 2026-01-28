import { Component, input } from '@angular/core';
import { Order } from '../../../models/types';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [DecimalPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  order = input.required<Order>();


}
