import { Component, computed, effect, inject, input, model, output } from '@angular/core';
import { AddProductForm, Category } from '../../../models/types';
import { FieldTree, FormField } from '@angular/forms/signals';



@Component({
  selector: 'app-add-product',
  imports: [FormField],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  readonly categories = input.required<Category[]>();
  addProductForm = model.required<FieldTree<AddProductForm<string>>>();
  submit = output<void>();

  onSubmit() {

    this.submit.emit()
  }


}
