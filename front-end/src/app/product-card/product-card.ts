import { Component, input, Input } from '@angular/core';
import { Product } from '../../models/types';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input<Product>({
    id: 0,
    product_name: '',
    product_description: '',
    price: 0,
    category_name: ''
  });
  /* product = input<Product>({} as Product);  for optional*/
  /*  product = input.required<Product>(); */

}
