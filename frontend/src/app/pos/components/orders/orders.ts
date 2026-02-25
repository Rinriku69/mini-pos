import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderCard } from './order-card/order-card';

import { OrderCards } from '../../models/types';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-orders',
  imports: [OrderCard],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);
  private navService = inject(NavService);

  private readonly orders = toSignal(this.orderService.orders$, { initialValue: [] });
  private readonly searchKey = toSignal(this.navService.searchKey$, { initialValue: '' })

  readonly orderDiplay: Signal<OrderCards[]> = computed(() => {
    const orders = this.orders()
    const searchKey = this.searchKey()
    if (!orders || !searchKey) return this.orders()

    return orders.filter((v) => v.order_id.toLocaleString() == searchKey)

  })
  ngOnInit(): void {
    this.orderService.loadOrders().subscribe()
  }
}
