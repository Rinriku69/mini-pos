import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ProductStockCard } from './product-stock-card/product-stock-card';
import { ProductService } from '../../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-stock',
  imports: [ProductStockCard, RouterLink],
  templateUrl: './product-stock.html',
  styleUrl: './product-stock.scss',
})
export class ProductStock implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly products = toSignal(this.productService.productState$, { initialValue: [] })
  protected readonly categories = toSignal(this.productService.categories$, { initialValue: [] })
  protected categorySelect = signal<number>(0);
  protected readonly productDisplay = computed(() => {
    const products = this.products()
    const catId = this.categorySelect()
    return products.filter((v) => catId != 0 ? v.category_id == catId : v)
  })
  constructor() { }
  ngOnInit(): void {
    this.productService.loadProduct().subscribe()
    if (this.categories().length == 0) {

      this.productService.loadCategory().subscribe();
    }
  }
}
