import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';
import { Product, Category } from '../models/types';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', //serviceถูกสร้างเมื่อมีinject
})
export class ProductService {
  private router = inject(Router);
  private products = new BehaviorSubject<Product[]>([]);
  productState$ = this.products.asObservable();

  private categories = new BehaviorSubject<Category[]>([]);
  categories$ = this.categories.asObservable()
  private productApiUrl = 'http://127.0.0.1:8000/api/products';
  private categoryApiUrl = 'http://127.0.0.1:8000/api/categories';
  constructor(private http: HttpClient) { }

  loadProduct(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(this.productApiUrl).pipe(
      tap(response => this.products.next(response.data))
    )
  }

  loadCategory(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(this.categoryApiUrl).pipe(
      tap(response => this.categories.next(response.data))
    )
  }

  addProduct(productForm: FormGroup) {
    if (productForm.valid) {

      const formData = productForm.value;


      this.http.post(this.productApiUrl, formData).subscribe({
        next: (response) => {
          console.log('Successfully stored', response);
          this.loadProduct().subscribe()
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



}
