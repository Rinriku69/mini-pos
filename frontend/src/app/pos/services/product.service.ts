import { HttpClient, httpResource, } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Product, Category, ProductResource, AddProductForm, ProdcutResponse } from '../models/types';
import { Router } from '@angular/router';



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
    return this.http.post<ProdcutResponse>(this.productApiUrl, productForm)
  }

  deleteProduct(productId: number) {
    return this.http.delete<ProdcutResponse>(`${this.productApiUrl}/${productId}`)
  }

  updateProduct(product: Product) {
    const { id, product_name, product_description, category_id, stock_qty, price } = product
    const porductReq: ProductResource = {
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
