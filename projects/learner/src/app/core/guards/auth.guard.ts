import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanMatchFn = (route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  const isAuthRoute = route.path?.includes('auth');

  if (isAuthRoute && isLoggedIn) {
    return router.createUrlTree(['/dashboard']);
  }

  if (isAuthRoute) {
    return true;
  }

  if (isLoggedIn) {
    return true;
  }

  const returnUrl = '/' + segments.map(s => s.path).join('/');
  return router.createUrlTree(['/auth'], { queryParams: { returnUrl } });
};
