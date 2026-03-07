import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';
import { Product, Category, ProductRequest, AddProductForm } from '../models/types';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldTree } from '@angular/forms/signals';


@Injectable({
  providedIn: 'root', //serviceถูกสร้างเมื่อมีinject
})
export class ProductService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private productApiUrl = 'http://127.0.0.1:8000/api/products';
  private categoryApiUrl = 'http://127.0.0.1:8000/api/categories';

  private products = httpResource<{ data: Product[] }>(() => this.productApiUrl);
  productState$ = computed(() => {
    return this.products;
  }
  );

  private categories = httpResource<{ data: Category[] }>(() => ({ url: this.categoryApiUrl, cache: 'force-cache' }));
  categories$ = computed<Category[]>(() => {
    const categories = this.categories
    if (categories.hasValue()) return categories.value().data;
    return []

  })

  reloadProduct(): void {
    this.products.reload()
  }

  addProduct(productForm: AddProductForm<number>) {
    return this.http.post(this.productApiUrl, productForm)
  }

  deleteProduct(productId: number) {
    this.http.delete(`${this.productApiUrl}/${productId}`).subscribe(
      {
        next: (res) => {
          this.products.reload()
          console.log('Successfully delete', res);

        },
        error: (err) => {
          console.error('An error occured:', err.error.message);
        }
      }
    )
  }

  updateProduct(product: Product) {
    const { id, product_name, product_description, category_id, stock_qty, price } = product
    const porductReq: ProductRequest = {
      id,
      name: product_name,
      description: product_description,
      category_id,
      price,
      stock_qty
    }

    this.http.put(this.productApiUrl, porductReq).subscribe(
      {
        next: (res) => {
          this.products.reload();
          console.log('Successfully update', res);
        },
        error: (err) => {
          console.error('An error occured:', err.error.message);
        }
      }
    )
  }



}
