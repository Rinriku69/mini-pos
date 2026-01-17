import { Component, computed, effect, inject, input, Input } from '@angular/core';
import { Product } from '../../../models/types';
import { CartService } from '../../../services/cart-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private cartServices = inject(CartService)
  product = input<Product>({
    id: 0,
    product_name: '',
    product_description: '',
    price: 0,
    category_name: ''
  });
  /* product = input<Product>({} as Product);  for optional*/
  /*  product = input.required<Product>(); */
  cartIcon = toSignal(this.cartServices.cartIcon, { initialValue: null });
  cartIconEl = computed(() => this.cartIcon());

  constructor() { }

  addToCart(item: Product, qty: number) {
    this.cartServices.addToCart(item, qty);
    this.cartServices.cartBump();
  }

  cartAnimate(btn: HTMLElement) {
    const cartEl = this.cartIconEl();
    if (!cartEl) return;
    const rectStart = btn.getBoundingClientRect();
    const rectEnd = cartEl.getBoundingClientRect();

    const startX = rectStart.left + rectStart.width / 2;
    const endX = rectEnd.left + rectEnd.width / 2;
    
    const startY = rectStart.top + rectStart.height / 2;
    const endY = rectEnd.top + rectEnd.height / 2;

    const fly = document.createElement('div');
    fly.className =
      'fixed z-50 w-4 h-4 bg-blue-500 rounded-full transition-all duration-500';

    fly.style.left = `${startX}px`;
    fly.style.top = `${startY}px`;
    fly.style.transform = 'translate(0, 0) scale(1)';
    fly.style.opacity = '1';

    document.body.appendChild(fly);

    requestAnimationFrame(() => {
      fly.style.transform = `
      translate(${endX - startX}px, ${endY - startY}px)
      scale(0.5)
    `;
      fly.style.opacity = '0.3';
    });

    setTimeout(() => fly.remove(), 2000);
  }


}
