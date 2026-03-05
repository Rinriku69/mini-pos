import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Category, Product } from '../../../models/types';
import { ProductStock } from '../../../components/stocks/product-stock/product-stock';

@Component({
  selector: 'app-product-stock-page',
  imports: [ProductStock],
  templateUrl: './product-stock-page.html',
  styleUrl: './product-stock-page.scss',
})
export class ProductStockPage {
  private readonly productService = inject(ProductService);
  protected readonly products = this.productService.productState$();
  protected categorySelect = signal<number>(0);

  protected readonly categories = computed<Category[]>(() => this.productService.categories$())

  protected readonly productsDisplay = computed<Product[]>(() => {
    if (!this.products.hasValue()) return [];
    const products = this.products.value().data;
    const catId = this.categorySelect()
    return products.filter((v) => catId != 0 ? v.category_id == catId : v)
  })


}
