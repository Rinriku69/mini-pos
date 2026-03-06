import { httpResource } from '@angular/common/http';
import { computed, Injectable, } from '@angular/core';
import { Order, ResourceResponse } from '../models/types';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiUrl = 'http://127.0.0.1:8000/api/orders'
  private orders = httpResource<ResourceResponse<Order>>(() => this.orderApiUrl);
  orders$ = computed(() => this.orders);


  loadOrders() {
    this.orders.reload()
  }

}
