import { HttpClient, HttpResourceRef } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';
import { Product, Category } from '../models/types';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { loadCategory, loadProduct } from '../helpers';

@Injectable({
  providedIn: 'root', //serviceถูกสร้างเมื่อมีinject
})
export class ProductService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private productApiUrl = 'http://127.0.0.1:8000/api/products';

  private products = loadProduct();
  productState$ = computed<Product[]>(() => {
    if (!this.products.hasValue()) return [];
    return this.products.value().data;
  }
  );
  private categories = loadCategory();
  categories$ = computed<Category[]>(() => {
    if (!this.categories || !this.categories.hasValue()) return []
    return this.categories.value().data
  })





  addProduct(productForm: FormGroup) {
    if (productForm.valid) {

      const formData = productForm.value;


      this.http.post(this.productApiUrl, formData).subscribe({
        next: (response) => {
          console.log('Successfully stored', response);
          loadProduct();
          this.router.navigate(['/main/product-stock'])
        },
        error: (error) => {
          console.error('An error occured:', error);

        }
      });

    } else {
      console.log('Invalid form value');
      productForm.markAllAsTouched();
    }
  }

  deleteProduct(productId: number) {
    this.http.delete(`${this.productApiUrl}/${productId}`).subscribe(
      {
        next: (res) => {
          console.log('Successfully delete', res);
          loadProduct();
        },
        error: (err) => {
          console.error('An error occured:', err.error.message);
        }
      }
    )
  }




}
