import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Common } from 'shared';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const commonService = inject(Common);

  const tokenData = commonService.getLocalStore('token_data');

  if (tokenData) {
    const token = JSON.parse(tokenData).token;

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
