import { Routes } from "@angular/router";
import { PosNav } from "./pages/pos-nav/pos-nav";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";
import { StorePage } from "./pages/store-page/store-page";
import { AddProductPage } from "./pages/add-product-page/add-product-page";
import { CartPage } from "./pages/cart-page/cart-page";
import { OrderPage } from "./pages/order-page/order-page";
import { HomeViewPage } from "./pages/home-view-page/home-view-page";
import { RegisterPage } from "./pages/auth/register-page/register-page";
import { LoginPage } from "./pages/auth/login-page/login-page";

export default [
    {
        path: '',
        component: PosNav,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },

            { path: 'store', component: StorePage },

            { path: 'add-product', component: AddProductPage },
            { path: 'cart', component: CartPage },
            { path: 'orders', component: OrderPage },
            { path: 'home', component: HomeViewPage },
            { path: 'register', component: RegisterPage },
            { path: 'login', component: LoginPage },
        ],
    },
] as Routes;