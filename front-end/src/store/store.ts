import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../models/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {
  private productService = inject(ProductService);
  products = toSignal(this.productService.productState$, { initialValue: [] })
  constructor() {
    effect(() => {
      console.log('Products changed:', this.products());
    });
  }
  ngOnInit(): void {
    this.productService.loadProduct().subscribe();

  }

}
