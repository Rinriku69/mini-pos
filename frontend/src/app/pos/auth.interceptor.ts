import { inject } from "@angular/core";
import { TokenStorage } from "./services/token.storage";
import { HttpInterceptorFn } from "@angular/common/http";





export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('ng-token') ?? null

    if (token) {
        const setHeader = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        return next(setHeader)
    }
    return next(req)

}