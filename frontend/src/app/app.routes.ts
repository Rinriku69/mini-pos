import { Routes } from '@angular/router';
import { PosNav } from './pos/pages/pos-nav/pos-nav';
import { HomePage } from './pos/components/home-page/home-page';
import { HomeViewPage } from './pos/pages/home-view-page/home-view-page';
export const routes: Routes = [
    {
        path: '',
        component: PosNav, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeViewPage },
            { path: '', loadChildren: () => import('./pos/routes') }
        ]
    },

];
