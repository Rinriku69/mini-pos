import { Routes } from '@angular/router';
import { Store } from './store/store';
import { AddProduct } from './add-product/add-product';

export const routes: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', component: Store },
    { path: 'add-product', component: AddProduct },];
