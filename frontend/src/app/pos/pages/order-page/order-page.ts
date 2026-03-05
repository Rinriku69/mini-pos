import { Component, computed, inject, Signal } from '@angular/core';
import { Orders } from "../../components/orders/orders";
import { OrderService } from '../../services/order.service';
import { NavService } from '../../services/nav.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Order } from '../../models/types';

@Component({
  selector: 'app-order-page',
  imports: [Orders],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage {
  private orderService = inject(OrderService);
  private navService = inject(NavService);

  readonly orders = this.orderService.orders$();
  private readonly searchKey = toSignal(this.navService.searchKey$, { initialValue: '' })

  readonly orderDiplay: Signal<Order[]> = computed(() => {
    const orders = this.orders
    const searchKey = this.searchKey()
    if (!orders.hasValue()) return [];
    if (!searchKey) return orders.value().data

    return orders.value().data.filter((v) => v.user_name.toLowerCase().includes(searchKey) || v.order_id.toLocaleString() == searchKey || v.order_items.find(v => v.product_name.toLocaleLowerCase().includes(searchKey)))


  })

}
