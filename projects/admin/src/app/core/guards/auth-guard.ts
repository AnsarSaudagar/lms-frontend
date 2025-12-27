import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanMatchFn = (route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  const isAuthRoute = route.path?.includes('auth');

  // Prevent logged-in users from accessing auth pages
  if (isAuthRoute && isLoggedIn) {
    return router.createUrlTree(['/']);
  }

  // Allow auth routes for unauthenticated users
  if (isAuthRoute) {
    return true;
  }

  // Allow access if logged in
  if (isLoggedIn) {
    return true;
  }

  // Reconstruct attempted URL
  const returnUrl = '/' + segments.map((s) => s.path).join('/');

  return router.createUrlTree(['auth', 'login'], {
    queryParams: { returnUrl },
  });
};
