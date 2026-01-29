import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { RouterLink, } from "@angular/router";
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private productService = inject(ProductService)
  private products = toSignal(this.productService.productState$, { initialValue: [] })
  productStock = computed(() => this.products().length)

  constructor() {
    this.productService.loadProduct().subscribe()
    effect(() => {
      console.log(this.products())
    })
  }


}
