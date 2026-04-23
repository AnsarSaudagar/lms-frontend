import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../services/app-data.service';

export const authGuard = () => {
  const appData = inject(AppDataService);
  const router = inject(Router);
  return appData.loadUser() ? true : router.createUrlTree(['/auth']);
};
