import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsolute = /^https?:\/\//i.test(req.url);
  if (isAbsolute) return next(req);

  const path = req.url.startsWith('/') ? req.url : `/${req.url}`;
  return next(req.clone({ url: `${environment.API_URL}${path}` }));
};
