import { inject } from "@angular/core";
import { AuthService } from "./services/auth-service";
import { CanActivateFn, Router } from "@angular/router";


export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const userRole = authService.getRole();

        if (userRole && allowedRoles.includes(userRole)) {
            return true;
        }


        return router.parseUrl('/main/login');
    };
};