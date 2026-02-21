import { Component, output, signal } from '@angular/core';
import { Product } from '../../../models/types';
import { form } from '@angular/forms/signals';
import { Icon } from '../../../pages/icons/icon/icon';

@Component({
  selector: 'app-edit-form',
  imports: [Icon],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm {
  protected editModel = signal<Product>({
    id: 0,
    product_name: '',
    product_description: '',
    price: 0,
    category_name: ''
  })

  editForm = form(this.editModel, (path) => {

  })
  closeEdit = output();


}
