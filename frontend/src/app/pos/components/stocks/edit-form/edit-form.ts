import { Component, inject, input, linkedSignal, output, signal } from '@angular/core';
import { Product, ProductRequest } from '../../../models/types';
import { form, min, required, FormField } from '@angular/forms/signals';
import { Icon } from '../../../pages/icons/icon/icon';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-edit-form',
  imports: [Icon, FormField],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm {
  private readonly productService = inject(ProductService);
  categories = this.productService.categories$;


  product = input.required<Product>();
  editForm = form(linkedSignal(() => {
    const pro = this.product()
    return { ...pro, category_id: pro.category_id.toString() }
  }), (path) => {
    required(path.id, { message: 'Product name is required' })
    required(path.product_name, { message: 'Product name is required' })
    required(path.price, { message: 'Product price is required' })
    min(path.price, 1)
    required(path.stock_qty, { message: 'Product stock quantity is required' })
    required(path.category_id, { message: 'Category is required' })
  })

  closeEdit = output();


  update() {
    const editValue = this.editForm().value()
    const editProduct: Product = { ...editValue, category_id: Number(editValue.category_id) }
    this.productService.updateProduct(editProduct)
    this.closeEdit.emit()
  }


}
