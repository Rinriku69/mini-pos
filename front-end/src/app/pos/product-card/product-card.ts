import { Component, effect, inject, input, Input } from '@angular/core';
import { Product } from '../models/types';
import { CartService } from '../services/cart-service';
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
  

  constructor() {

  }
  addToCart(item: Product, qty: number) {
    this.cartServices.addToCart(item, qty)
  }
}
