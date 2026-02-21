import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { catchError, throwError } from "rxjs";





export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('ng-token') ?? null
    const authService = inject(AuthService);
    let setHeader = req;
    if (token) {
        setHeader = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

    }
    return next(setHeader).pipe(
        catchError((err) => {
            if (err.status === 401) {
                console.warn('Token Expired')

                authService.clearLocalSession()
            }

            return throwError(() => err)

        })
    )

}