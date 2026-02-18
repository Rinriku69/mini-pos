import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "./product-card/product-card";
import { CartService } from '../../services/cart.service';
import { NavService } from '../../services/nav.service';
import { loadProduct } from '../../helpers';


@Component({
  selector: 'app-store',
  imports: [ProductCard],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private navService = inject(NavService);

  private products = loadProduct();
  protected readonly productsDisplay = computed<Product[] | null>(() => {
    if (!this.products.hasValue()) return null;

    const products = this.products.value().data;
    const searchKey = this.searchKey();
    if (!searchKey) return this.products.value().data;
    return products.filter((p) => p.product_name.toLowerCase().includes(searchKey.toLowerCase()) ?
      p.product_name.toLowerCase().includes(searchKey.toLowerCase()) : p.product_description.toLowerCase().includes(searchKey.toLowerCase())
    )
  })

  private searchKey = toSignal(this.navService.searchKey$)
  cart = toSignal(this.cartService.cart$)
  
  constructor() { }

}
