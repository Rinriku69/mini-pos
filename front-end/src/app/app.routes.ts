import { Routes } from '@angular/router';
import { Store } from './pos/store/store';
import { AddProduct } from './pos/add-product/add-product';

export const routes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', component: Store },
    { path: 'add-product', component: AddProduct },];
