import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // If the user is not logged in than redirect to login page
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['auth', 'login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  return true;
};
