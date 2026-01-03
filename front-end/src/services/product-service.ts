import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);
  productState$ = this.products.asObservable().pipe(shareReplay(1));
  private apiUrl = 'http://127.0.0.1:8000/api/products';
  constructor(private http: HttpClient) {
    this.http.get<{ data: Product[] }>(this.apiUrl).subscribe(response =>
      this.products.next(response.data)
    );

  }




}
