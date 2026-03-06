import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCart, CartItem, Order, Product } from '../models/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart: WritableSignal<ProductCart> = signal({ cart_items: [] })
  cart$ = computed(() => this.cart());
  cartBumpActive: WritableSignal<boolean> = signal(false);
  cartIcon: WritableSignal<HTMLElement | null> = signal(null);
  private orderApiUrl = 'http://127.0.0.1:8000/api/orders'

  addToCart(item: Product, qty: number): void {
    const currentCart = this.cart();
    if (currentCart.cart_items.length === 0) {
      const newCartItem: CartItem = { product: item, qty: qty };
      this.cart.set({ cart_items: [newCartItem] })
    }
    else {
      const newCartItem: CartItem = { product: item, qty: qty };

      if (currentCart.cart_items.find(v => v.product.id === newCartItem.product.id)) {
        const currenctCartItems = currentCart.cart_items;
        const updatedItems: CartItem[] = currenctCartItems.map(old => {
          return old.product.id === newCartItem.product.id ? { ...old, qty: old.qty + qty } : old
        })
        this.cart.update(_ => ({ ...currentCart, cart_items: [...updatedItems] }))

      } else {
        this.cart.update(_ => ({ ...currentCart, cart_items: [...currentCart.cart_items, newCartItem] }))
      }
    }

  }

  createOrder(cart?: ProductCart): Observable<Order> {
    const order = this.cart()
    if (!order && !cart) throw new Error('Cart Empty!');

    return this.http.post<Order>(this.orderApiUrl, cart?.cart_items ? cart : order)
  }

  clearCart(): void {
    this.cart.set({ cart_items: [] })
  }

  cartBump(): void {
    this.cartBumpActive.set(true);
    setTimeout(() => {
      this.cartBumpActive.set(false);
    }, 150);
  }

  getCartIcon(cart: HTMLElement): void {
    this.cartIcon.set(cart);
  }


  removeItem(productId: number) {
    const currentItem = this.cart()
    if (!currentItem) throw new Error('Cart Empty!');

    const newItem = currentItem.cart_items.filter(
      (p) => p.product.id !== productId
    )
    this.cart.update(v => ({ ...v, cart_items: [...newItem] }))
  }
}
