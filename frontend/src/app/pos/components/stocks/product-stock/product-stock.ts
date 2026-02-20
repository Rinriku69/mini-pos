import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ProductStockCard } from './product-stock-card/product-stock-card';
import { ProductService } from '../../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";
import { EditForm } from "../edit-form/edit-form";

@Component({
  selector: 'app-product-stock',
  imports: [ProductStockCard, RouterLink],
  templateUrl: './product-stock.html',
  styleUrl: './product-stock.scss',
})
export class ProductStock {
  private readonly productService = inject(ProductService);
  private readonly products = computed(() => this.productService.productState$());
  protected readonly categories = computed(() => {
    return this.productService.categories$()
  })
  protected categorySelect = signal<number>(0);
  protected readonly productDisplay = computed(() => {
    const products = this.products()
    const catId = this.categorySelect()
    return products.filter((v) => catId != 0 ? v.category_id == catId : v)
  })

}
