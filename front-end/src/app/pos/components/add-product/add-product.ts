import { Component, effect, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  readonly categories = toSignal(this.productService.categories$, { initialValue: [] })
  private fb = inject(FormBuilder);


  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category_id: ["xx", Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['']
  });
  readonly formValue = toSignal(this.productForm.valueChanges, { initialValue: this.productForm.value });

  constructor() {
    effect(() => {
      console.log('Categories changed:', this.categories());
      console.log('Form changed:', this.formValue());
    });
  }

  ngOnInit(): void {
    this.productService.loadCategory().subscribe();

  }

  onSubmit() {
    this.productService.addProduct(this.productForm);

  }
}
