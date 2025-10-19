import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      }
      router.navigate(['/dashboard']);
      return false;
    })
  );
};
