import { Routes } from '@angular/router';
import { Store } from './pos/components/store/store';
import { AddProduct } from './pos/components/add-product/add-product';
import { Cart } from './pos/components/cart/cart';
import { Orders } from './pos/components/orders/orders';

export const routes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', component: Store },
    { path: 'add-product', component: AddProduct },
    { path: 'cart', component: Cart },
    { path: 'orders', component: Orders },
];
