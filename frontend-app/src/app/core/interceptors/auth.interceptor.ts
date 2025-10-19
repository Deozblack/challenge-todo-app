import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.headers.has('Authorization')) {
    return next(req);
  }

  return authService.getActiveUserToken$().pipe(
    switchMap((token) => {
      let authReq = req;

      if (token) {
        authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }

      return next(authReq);
    }),
    catchError((error) => {
      console.warn('Error obtaining auth token:', error);
      return next(req);
    })
  );
};
