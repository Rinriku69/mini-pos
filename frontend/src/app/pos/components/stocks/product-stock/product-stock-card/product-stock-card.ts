import { Component, effect, inject, input, signal } from '@angular/core';
import { Product } from '../../../../models/types';
import { Icon } from "../../../../pages/icons/icon/icon";
import { ProductService } from '../../../../services/product.service';
import { EditForm } from '../../edit-form/edit-form';

@Component({
  selector: 'app-product-stock-card',
  imports: [Icon, EditForm],
  templateUrl: './product-stock-card.html',
  styleUrl: './product-stock-card.scss',
})
export class ProductStockCard {
  readonly product = input.required<Product>();
  productService = inject(ProductService);
  openEdit = signal(false);

  toggleEdit() {
    this.openEdit.set(!this.openEdit())
  }

  delete(id: number) {

    this.productService.deleteProduct(id);
  }

}
