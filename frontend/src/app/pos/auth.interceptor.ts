import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { catchError, throwError } from "rxjs";





export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('ng-token') ?? null
    const authService = inject(AuthService);
    let setHeder = req;
    if (token) {
        const setHeader = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

    }
    return next(setHeder).pipe(
        catchError((err) => {
            if (err.status === 401) {
                console.warn('Token Expired')

                authService.clearLocalSession()
            }

            return throwError(() => err)

        })
    )

}