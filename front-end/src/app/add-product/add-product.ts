import { Component, effect, inject, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  categories = toSignal(this.productService.categories$, { initialValue: [] })

  constructor() {
    effect(() => {
      console.log('Categories changed:', this.categories());
    });
  }
  ngOnInit(): void {
    this.productService.loadCategory().subscribe();

  }

}
