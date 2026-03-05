import { Component, computed, inject } from '@angular/core';
import { Store } from "../../components/store/store";
import { ProductService } from '../../services/product.service';
import { NavService } from '../../services/nav.service';
import { Product } from '../../models/types';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-store-page',
  imports: [Store],
  templateUrl: './store-page.html',
  styleUrl: './store-page.scss',
})
export class StorePage {
  private readonly productService = inject(ProductService)
  private readonly navService = inject(NavService)
  protected readonly products = this.productService.productState$();

  private searchKey = toSignal(this.navService.searchKey$)

  protected readonly productsDisplay = computed<Product[]>(() => {
    if (!this.products.hasValue()) return [];
    const products = this.products.value().data;
    const searchKey = this.searchKey();
    if (!searchKey) return products;
    return products.filter((p) => p.product_name.toLowerCase().includes(searchKey.toLowerCase()) ?
      p.product_name.toLowerCase().includes(searchKey.toLowerCase()) : p.product_description.toLowerCase().includes(searchKey.toLowerCase())
    )
  })


}
