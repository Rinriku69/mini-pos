import { Component, effect, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct  {
  private productService = inject(ProductService);
  readonly categories = this.productService.categories$();
  private fb = inject(FormBuilder);


  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category_id: ["", Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    description: [''],
  });
  readonly formValue = toSignal(this.productForm.valueChanges, { initialValue: this.productForm.value });

  constructor() { }


  onSubmit() {
    this.productService.addProduct(this.productForm);

  }
}
