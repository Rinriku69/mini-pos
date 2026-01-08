import { Component, effect, inject, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category_id: [null, Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    description: ['']
  });
  formValue = toSignal(this.productForm.valueChanges, { initialValue: this.productForm.value });
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

    if (this.productForm.valid) {

      const formData = this.productForm.value;
      const apiUrl = 'http://localhost:8000/api/products';


      this.http.post(apiUrl, formData).subscribe({
        next: (response) => {
          console.log('บันทึกสำเร็จ!', response);

        },
        error: (error) => {
          console.error('เกิดข้อผิดพลาด:', error);

        }
      });

    } else {
      console.log('ฟอร์มไม่ถูกต้อง กรุณาตรวจสอบข้อมูล');
      this.productForm.markAllAsTouched();
    }
  }
}
