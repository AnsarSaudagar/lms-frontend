import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  if (route.path === 'auth') {
    return isLoggedIn ? router.createUrlTree(['/dashboard']) : true;
  }

  if (isLoggedIn) return true;

  const returnUrl = '/' + segments.map(s => s.path).join('/');
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl } });
};
