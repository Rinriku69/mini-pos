import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "./product-card/product-card";
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-store',
  imports: [ProductCard],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService)
  private products = toSignal(this.productService.productState$, { initialValue: [] })
  private searchKey = toSignal(this.productService.searchKey$)
  protected readonly productsDisplay: Signal<Product[]> = computed(() => {
    const products = this.products()
    const searchKey = this.searchKey()
    if (!products || !searchKey) return this.products()

    return products.filter((p) => p.product_name.toLowerCase().includes(searchKey.toLowerCase()) ?
      p.product_name.toLowerCase().includes(searchKey.toLowerCase()) : p.product_description.toLowerCase().includes(searchKey.toLowerCase())
    )
  })
  cart = toSignal(this.cartService.cart$)
  constructor() {
    effect(() => {
      // console.log('Products changed:', this.products());
      // console.log('Cart changed:', this.cart());
    });
  }
  ngOnInit(): void {
    this.productService.loadProduct().subscribe();

  }

}
