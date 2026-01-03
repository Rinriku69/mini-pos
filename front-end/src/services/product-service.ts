import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root', //serviceถูกสร้างเมื่อมีinject
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);
  productState$ = this.products.asObservable().pipe(shareReplay(1));
  private apiUrl = 'http://127.0.0.1:8000/api/products';
  constructor(private http: HttpClient) { }

  loadProduct() {
    return this.http.get<{ data: Product[] }>(this.apiUrl).pipe(
      tap(response => this.products.next(response.data))
    )
  }



}
