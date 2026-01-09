import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
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

  loadProduct() {
    return this.http.get<{ data: Product[] }>(this.productApiUrl).pipe(
      tap(response => this.products.next(response.data))
    )
  }
  loadCategory() {
    return this.http.get<{ data: Category[] }>(this.categoryApiUrl).pipe(
      tap(response => this.categories.next(response.data))
    )
  }

  addProduct(productForm: FormGroup) {
    if (productForm.valid) {

      const formData = productForm.value;


      this.http.post(this.productApiUrl, formData).subscribe({
        next: (response) => {
          console.log('บันทึกสำเร็จ!', response);
          this.router.navigate(['/store'])
        },
        error: (error) => {
          console.error('เกิดข้อผิดพลาด:', error);

        }
      });

    } else {
      console.log('ฟอร์มไม่ถูกต้อง กรุณาตรวจสอบข้อมูล');
      productForm.markAllAsTouched();
    }
  }


}
