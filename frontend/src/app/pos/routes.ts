import { Routes } from "@angular/router";
import { StorePage } from "./pages/store-page/store-page";
import { CartPage } from "./pages/cart-page/cart-page";
import { OrderPage } from "./pages/order-page/order-page";
import { RegisterPage } from "./pages/auth/register-page/register-page";
import { LoginPage } from "./pages/auth/login-page/login-page";
import { roleGuard } from "./auth.guard";
import { UnauthorizePage } from "./pages/errors/unauthorize-page/unauthorize-page";


export default [

    { path: 'store', component: StorePage },
    { path: 'cart', component: CartPage },
    { path: 'orders', component: OrderPage },

    { path: 'register', component: RegisterPage },
    { path: 'login', component: LoginPage },
    { path: 'unauthorize', component: UnauthorizePage },
    {
        path: 'cashier',
        loadComponent: () => import('./components/cashier/cashier')
            .then(m => m.Cashier),
        canActivate: [roleGuard(['Admin', 'Cashier'])]
    },
    {
        path: 'add-product',
        loadComponent: () => import('./pages/stocks-page/add-product-page/add-product-page')
            .then(m => m.AddProductPage),
        canActivate: [roleGuard(['Admin', 'Cashier'])]
    },
    {
        path: 'product-stock',
        loadComponent: () => import('./pages/stocks-page/product-stock-page/product-stock-page')
            .then(m => m.ProductStockPage),
        canActivate: [roleGuard(['Admin', 'Cashier'])]
    },

] as Routes;