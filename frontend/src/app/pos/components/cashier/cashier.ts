import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, Product } from '../../models/types';
import { Icon } from "../../pages/icons/icon/icon";



// Mock product data — replace with global state signal later
const MOCK_PRODUCTS: Product[] = [
  { id: 1, product_name: 'Americano', product_description: 'Classic black coffee with a bold, rich flavour', price: 65, category_name: 'Beverages', category_id: 1 },
  { id: 2, product_name: 'Cappuccino', product_description: 'Espresso with steamed milk foam and a smooth taste', price: 85, category_name: 'Beverages', category_id: 1 },
  { id: 3, product_name: 'Green Tea Latte', product_description: 'Premium matcha blended with creamy steamed milk', price: 90, category_name: 'Beverages', category_id: 1 },
  { id: 4, product_name: 'Strawberry Smoothie', product_description: 'Fresh strawberries blended with yoghurt and honey', price: 95, category_name: 'Beverages', category_id: 1 },
  { id: 5, product_name: 'Butter Croissant', product_description: 'Flaky, golden croissant baked fresh every morning', price: 55, category_name: 'Bakery', category_id: 2 },
  { id: 6, product_name: 'Blueberry Muffin', product_description: 'Moist muffin packed with juicy blueberries', price: 60, category_name: 'Bakery', category_id: 2 },
  { id: 7, product_name: 'Club Sandwich', product_description: 'Triple-decker sandwich with chicken, bacon & veggies', price: 120, category_name: 'Food', category_id: 3 },
  { id: 8, product_name: 'Caesar Salad', product_description: 'Crisp romaine lettuce, croutons and parmesan dressing', price: 110, category_name: 'Food', category_id: 3 },
  { id: 9, product_name: 'Cheesecake Slice', product_description: 'Rich New York-style cheesecake with berry compote', price: 80, category_name: 'Desserts', category_id: 4 },
  { id: 10, product_name: 'Chocolate Brownie', product_description: 'Fudgy, dense brownie with dark chocolate chips', price: 70, category_name: 'Desserts', category_id: 4 },
  { id: 11, product_name: 'Orange Juice', product_description: 'Freshly squeezed 100% natural orange juice', price: 75, category_name: 'Beverages', category_id: 1 },
  { id: 12, product_name: 'Grilled Panini', product_description: 'Toasted panini with mozzarella, tomato and basil', price: 105, category_name: 'Food', category_id: 3 },
];

const CATEGORIES = ['All', 'Beverages', 'Bakery', 'Food', 'Desserts'];

const CATEGORY_ICONS: Record<string, string> = {
  'All': '🛒',
  'Beverages': '☕',
  'Bakery': '🥐',
  'Food': '🥗',
  'Desserts': '🍰',
};

@Component({
  selector: 'app-cashier',
  imports: [CommonModule, FormsModule, Icon],
  templateUrl: './cashier.html',
  styleUrl: './cashier.scss',
})
export class Cashier {
  // ── Data ──────────────────────────────────────────────────────────────
  protected readonly products = signal<Product[]>(MOCK_PRODUCTS); // swap with global state later
  protected readonly categories = CATEGORIES;
  protected readonly categoryIcons = CATEGORY_ICONS;

  // ── UI State ──────────────────────────────────────────────────────────
  protected searchKey = signal('');
  protected selectedCategory = signal('All');
  protected cartItems = signal<CartItem[]>([]);
  protected discount = signal(0);
  protected showReceipt = signal(false);
  protected paymentMethod = signal<'cash' | 'card' | 'qr'>('cash');
  protected cashReceived = signal<number | null>(null);

  // ── Derived ────────────────────────────────────────────────────────────
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

  // ── Cart Actions ────────────────────────────────────────────────────────
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
