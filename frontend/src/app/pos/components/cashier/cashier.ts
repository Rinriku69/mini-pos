import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, Category, Product } from '../../models/types';
import { Icon } from "../../pages/icons/icon/icon";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cashier',
  imports: [CommonModule, FormsModule, Icon],
  templateUrl: './cashier.html',
  styleUrl: './cashier.scss',
})
export class Cashier {

  // Injection
  private readonly productService = inject(ProductService);

  // Data   
  protected readonly products = computed<Product[]>(() => this.productService.productState$());
  protected readonly categories = computed<string[]>(() => {
    const cats = this.productService.categories$().map((v) => v.category_name)
    return ['All', ...cats]
  });
  

  //  UI State 
  protected searchKey = signal('');
  protected selectedCategory = signal('All');
  protected cartItems = signal<CartItem[]>([]);
  protected discount = signal(0);
  protected showReceipt = signal(false);
  protected paymentMethod = signal<'cash' | 'card' | 'qr'>('cash');
  protected cashReceived = signal<number | null>(null);



  //  Derived 
  protected readonly filteredProducts = computed(() => {
    const key = this.searchKey().toLowerCase();
    const cat = this.selectedCategory();
    return this.products().filter(p => {
      const matchCat = cat === 'All' || p.category_name === cat;
      const matchKey = !key ||
        p.product_name.toLowerCase().includes(key) ||
        p.product_description.toLowerCase().includes(key);
      return matchCat && matchKey;
    });
  });

  protected readonly subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.qty, 0)
  );

  protected readonly discountAmount = computed(() =>
    Math.round(this.subtotal() * this.discount() / 100)
  );

  protected readonly total = computed(() =>
    this.subtotal() - this.discountAmount()
  );

  protected readonly cartCount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.qty, 0)
  );

  protected readonly change = computed(() => {
    const cash = this.cashReceived() ?? 0;
    return cash - this.total();
  });


  //  Cart Actions 
  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { product, qty: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQty(productId: number, qty: number) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items =>
      items.map(i => i.product.id === productId ? { ...i, qty } : i)
    );
  }

  clearCart() {
    this.cartItems.set([]);
    this.discount.set(0);
    this.cashReceived.set(null);
    this.showReceipt.set(false);
  }

  confirmOrder() {
    if (this.cartItems().length === 0) return;
    this.showReceipt.set(true);
  }

  printAndClose() {
    window.print();
    this.clearCart();
  }

  getItemQty(productId: number): number {
    return this.cartItems().find(i => i.product.id === productId)?.qty ?? 0;
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  setDiscount(value: string) {
    const n = Math.min(100, Math.max(0, Number(value)));
    this.discount.set(isNaN(n) ? 0 : n);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('th-TH');
  }
}
