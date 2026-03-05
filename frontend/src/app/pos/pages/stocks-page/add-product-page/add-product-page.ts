import { Component, computed, effect, inject, signal } from '@angular/core';
import { AddProduct } from '../../../components/stocks/add-product/add-product';
import { AddProductForm } from '../../../models/types';
import { ProductService } from '../../../services/product.service';
import { form, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product-page',
  imports: [AddProduct],
  templateUrl: './add-product-page.html',
  styleUrl: './add-product-page.scss',
})
export class AddProductPage {
  private productService = inject(ProductService);
  private router = inject(Router)
  readonly categories = computed(() => this.productService.categories$());

  readonly formModel = signal({
    name: '',
    category_id: '',
    price: 0,
    stock_qty: 0,
    description: '',
  })

  productForm = form(this.formModel, path => {
    required(path.category_id),
      required(path.name),
      required(path.price),
      required(path.stock_qty)
    minLength(path.name, 3)
  })

  onSubmit() {
    const product: AddProductForm<string> = this.productForm().value()
    const addProductForm: AddProductForm<number> = { ...product, category_id: Number(product.category_id) }
    this.productService.addProduct(addProductForm).subscribe({
      next: (response) => {
        console.log('Successfully stored', response);
        this.productService.reloadProduct()
        this.router.navigate(['/product-stock'])
      },
      error: (error) => {
        console.error('An error occured:', error.error.message);

      }
    });
  }


}
