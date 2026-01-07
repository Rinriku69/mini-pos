import { Component, effect, inject, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  private productService = inject(ProductService);
  categories = toSignal(this.productService.categories$, { initialValue: [] })
  private fb = inject(FormBuilder);

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    categoryId: [null, Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    description: ['']
  });
  constructor() {
    effect(() => {
      console.log('Categories changed:', this.categories());
      console.log('Form changed:', this.productForm);
    });
  }
  ngOnInit(): void {
    this.productService.loadCategory().subscribe();

  }

  onSubmit() {

    if (this.productForm.valid) {
      console.log('ข้อมูลพร้อมส่ง:', this.productForm.value);
    } else {
      console.log('กรอกข้อมูลไม่ครบ');
      this.productForm.markAllAsTouched();
    }
  }

}
