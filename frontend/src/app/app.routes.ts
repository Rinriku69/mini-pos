import { Routes } from '@angular/router';
import { PosNav } from './pos/pages/pos-nav/pos-nav';
export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren: () => import('./pos/routes') }

];
