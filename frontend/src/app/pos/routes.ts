import { Routes } from "@angular/router";
import { PosNav } from "./pages/pos-nav/pos-nav";
import { Store } from "./components/store/store";
import { AddProduct } from "./components/add-product/add-product";
import { Cart } from "./components/cart/cart";
import { Orders } from "./components/orders/orders";

export default [
    {
        path: '',
        component: PosNav,
        children: [
            { path: '', redirectTo: 'store', pathMatch: 'full' },

            { path: 'store', component: Store },

            { path: 'add-product', component: AddProduct },
            { path: 'cart', component: Cart },
            { path: 'orders', component: Orders },
        ],
    },
] as Routes;