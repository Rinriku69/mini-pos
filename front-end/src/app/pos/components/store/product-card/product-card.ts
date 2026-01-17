import { Component, effect, inject, input, Input } from '@angular/core';
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


  constructor() { }

  addToCart(item: Product, qty: number) {
    this.cartServices.addToCart(item, qty);
    this.cartServices.cartBump();
  }

  cartAnimate(btn: HTMLElement) {
    const rect = btn.getBoundingClientRect()

    const fly = document.createElement('div');

    fly.className = 'fixed z-50 w-4 h-4 bg-blue-500 rounded-full transition-all duration-500';


    fly.style.top = rect.top + 'px';
    document.body.appendChild(fly);

    requestAnimationFrame(() => {
      fly.style.right = '36%';
      fly.style.top = '10px';
      fly.style.transform = 'scale(0.2)';
      fly.style.opacity = '0.5';
    });

    setTimeout(() => fly.remove(), 3000);
  }


}
