import { Routes } from '@angular/router';
import { Store } from '../store/store';

export const routes: Routes = [
    { path: 'store', component: Store },
    { path: '', redirectTo: 'store', pathMatch: 'full' }];
