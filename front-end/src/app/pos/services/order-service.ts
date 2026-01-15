import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Order } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient)
  private orderApiUrl = 'http://127.0.0.1:8000/api/orders'
  private orders = new BehaviorSubject([] as Order[]);
  orders$ = this.orders.asObservable();

  loadOrders() {
    this.http.get<Order[]>(this.orderApiUrl).pipe(
      tap(response => this.orders.next(response))
    )
  }

}
