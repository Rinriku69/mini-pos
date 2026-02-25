import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem, Order, Product } from '../models/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cart = new BehaviorSubject({ cart_items: [] } as Cart)
  cart$ = this.cart.asObservable();
  cartBumpActive = new BehaviorSubject<boolean>(false);
  cartIcon = new BehaviorSubject<HTMLElement | null>(null);
  private orderApiUrl = 'http://127.0.0.1:8000/api/orders'

  addToCart(item: Product, qty: number): void {
    if (this.cart.value.cart_items.length == 0) {
      const newCartItem: CartItem = { product: item, qty: qty };
      const currentItems = this.cart.value;
      const updatedItems: Cart = { ...currentItems, cart_items: [...currentItems?.cart_items, newCartItem] }

      this.cart.next(updatedItems);
    } else {
      const newOrderItem: CartItem = { product: item, qty: qty };

      if (this.cart.value.cart_items.find(v => v.product.id === newOrderItem.product.id)) {
        const currenctItems = this.cart.value.cart_items;
        const updatedItems: CartItem[] = currenctItems.map(old => {
          return old.product.id === newOrderItem.product.id ? { ...old, qty: old.qty + qty } : old
        })
        const currentCart = this.cart.value
        const updatedCart: Cart = { ...currentCart, cart_items: updatedItems }

        this.cart.next(updatedCart)
      } else {
        const currentCart = this.cart.value;
        const updatedCart: Cart = { ...currentCart, cart_items: [...currentCart.cart_items, newOrderItem] }

        this.cart.next(updatedCart)
      }
    }

  }

  createOrder(total: number) {
    const order: Cart = { cart_items: { ...this.cart.value.cart_items } }
    this.http.post(this.orderApiUrl, order).subscribe({
      next: (response) => {
        console.log('order created successfully', response);
        alert('Order Created')
        const newCart: Cart = { cart_items: [] }
        this.cart.next(newCart);

      },
      error: (error) => {
        console.error('An error occured:', error.error.message);

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
    const newItem = currentItem.cart_items.filter(
      (p) => p.product.id !== productId
    )

    const newCart: Cart = { ...currentItem, cart_items: newItem }
    this.cart.next(newCart)
  }
}
