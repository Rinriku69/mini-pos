import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root', //serviceถูกสร้างเมื่อมีinject
})
export class ProductService {
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




}
