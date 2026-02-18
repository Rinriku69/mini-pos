import { inject, Injectable, Signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timeout } from 'rxjs';
import { Cart, OrderItem, Product } from '../models/types';
import { createCart } from '../helpers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart = new BehaviorSubject({ order_item: [] } as Cart)
  cart$ = this.cart.asObservable();
  cartBumpActive = new BehaviorSubject<boolean>(false);
  cartIcon = new BehaviorSubject<HTMLElement | null>(null);
  private orderApiUrl = 'http://127.0.0.1:8000/api/orders'

  addToCart(item: Product, qty: number): void {
    if (this.cart.value.order_item.length == 0) {
      const newOrderItem: OrderItem = { product: item, qty: qty };
      const currentItems = this.cart.value;
      const updatedItems: Cart = { ...currentItems, order_item: [...currentItems?.order_item, newOrderItem] }

      this.cart.next(updatedItems);
    } else {
      const newOrderItem: OrderItem = { product: item, qty: qty };

      if (this.cart.value.order_item.find(v => v.product.id === newOrderItem.product.id)) {
        const currenctItems = this.cart.value.order_item;
        const updatedItems: OrderItem[] = currenctItems.map(old => {
          return old.product.id === newOrderItem.product.id ? { ...old, qty: old.qty + qty } : old
        })
        const currentCart = this.cart.value
        const updatedCart: Cart = { ...currentCart, order_item: updatedItems }

        this.cart.next(updatedCart)
      } else {
        const currentCart = this.cart.value;
        const updatedCart: Cart = { ...currentCart, order_item: [...currentCart.order_item, newOrderItem] }

        this.cart.next(updatedCart)
      }
    }

  }

  createOrder(total: number) {
    const order: { order_item: OrderItem[], total: number } = { order_item: { ...this.cart.value.order_item }, total: total }
    this.http.post(this.orderApiUrl, order).subscribe({
      next: (response) => {
        console.log('order created successfully', response);
        alert('Order Created')
        const newCart: Cart = { order_item: [] }
        this.cart.next(newCart);

      },
      error: (error) => {
        console.error('An error occured:', error);

      }
    });
  }

  cartBump(): void {
    this.cartBumpActive.next(true);
    setTimeout(() => {
      this.cartBumpActive.next(false);
    }, 150);
  }

  getCartIcon(cart: HTMLElement): void {
    this.cartIcon.next(cart);
  }


  removeItem(productId: number) {
    const currentItem = this.cart.value
    const newItem = currentItem.order_item.filter(
      (p) => p.product.id !== productId
    )

    const newCart: Cart = { ...currentItem, order_item: newItem }
    this.cart.next(newCart)
  }
}
