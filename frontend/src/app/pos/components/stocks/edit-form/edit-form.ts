import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../models/types';
import { form } from '@angular/forms/signals';
import { Icon } from '../../../pages/icons/icon/icon';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-edit-form',
  imports: [Icon],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm {
  private readonly productService = inject(ProductService);
  categories = this.productService.categories$;
  protected editModel = signal<Product>({
    id: 0,
    product_name: '',
    product_description: '',
    price: 0,
    stock_qty: 0,
    category_name: ''
  })

  product = input.required<Product>();
  editForm = form(this.editModel, (path) => {

  })
  closeEdit = output();


}
