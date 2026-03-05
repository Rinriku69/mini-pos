import { Component, computed, effect, inject, input, model, OnInit, output, signal } from '@angular/core';
import { ProductStockCard } from './product-stock-card/product-stock-card';
import { RouterLink } from "@angular/router";
import { Category, Product } from '../../../models/types';


@Component({
  selector: 'app-product-stock',
  imports: [ProductStockCard, RouterLink],
  templateUrl: './product-stock.html',
  styleUrl: './product-stock.scss',
})
export class ProductStock {

  readonly products = input.required<Product[]>();
  readonly categories = input.required<Category[]>();
  categorySelect = output<number>();

}
