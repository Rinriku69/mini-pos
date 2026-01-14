import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, OrderItem, Product } from '../models/types';
import { createCart } from '../helper';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject({ order_item: [] } as Cart)
  cart$ = this.cart.asObservable();

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
          return old.product.id === newOrderItem.product.id ? { ...old, qty: old.qty + 1 } : old
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
}
