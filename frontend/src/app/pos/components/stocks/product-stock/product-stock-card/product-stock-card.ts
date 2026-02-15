import { Component, input } from '@angular/core';
import { Product } from '../../../../models/types';
import { DecimalPipe } from '@angular/common';
import { Icon } from "../../../../pages/icons/icon/icon";

@Component({
  selector: 'app-product-stock-card',
  imports: [DecimalPipe, Icon],
  templateUrl: './product-stock-card.html',
  styleUrl: './product-stock-card.scss',
})
export class ProductStockCard {
  readonly product = input.required<Product>();
}
