import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderCard } from './order-card/order-card';

@Component({
  selector: 'app-orders',
  imports: [OrderCard],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);
  readonly orders = toSignal(this.orderService.orders$);

  ngOnInit(): void {
    this.orderService.loadOrders().subscribe()
  }
}
