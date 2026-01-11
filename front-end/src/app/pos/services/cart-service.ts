import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderItem, Product } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private order = new BehaviorSubject({} as Order)
  order$ = this.order.asObservable();
  private orderItem = new BehaviorSubject<OrderItem[]>([]);
  orderItem$ = this.orderItem.asObservable();

  addOrderItem(item: Product, qty: number) {
    const newItem: OrderItem = { id: 1, order_id: 1, product: item, qty: qty }
    const currentOrderItems = this.orderItem.value;
    const existing = currentOrderItems.find(ot => ot.product.id == item.id);
    let newOrderItems: OrderItem[]
    if (existing) {
      newOrderItems = currentOrderItems.map(ot => {
        return ot.product.id === item.id ? { ...ot, qty: ot.qty + 1 } : ot
      })

    } else {
      newOrderItems = [...currentOrderItems, newItem]

    }

    this.orderItem.next(newOrderItems);

  }
}
