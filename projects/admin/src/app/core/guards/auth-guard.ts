import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanMatchFn = (route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // reconstruct attempted URL  
  const returnUrl = '/' + segments.map(s => s.path).join('/');

  return router.createUrlTree(['auth', 'login'], {
    queryParams: { returnUrl }
  });
};
