import { Routes } from "@angular/router";
import { StorePage } from "./pages/store-page/store-page";
import { OrderPage } from "./pages/order-page/order-page";
import { roleGuard } from "./auth.guard";
import { UnauthorizePage } from "./pages/errors/unauthorize-page/unauthorize-page";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";
import { CartPage } from "./pages/cart-page/cart-page";


export default [

    { path: 'store', component: StorePage },
    { path: 'orders', component: OrderPage },
    { path: 'cart', component: CartPage },

    { path: 'register', component: Register },
    { path: 'login', component: Login },
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