import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../../modules/auth/services/auth.service';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated$']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user is authenticated', () => {
    mockAuthService.isAuthenticated$.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const route = {} as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;
      const result = authGuard(route, state);

      if (typeof result === 'object' && 'subscribe' in result) {
        result.subscribe((canActivate) => {
          expect(canActivate).toBe(true);
          expect(mockRouter.navigate).not.toHaveBeenCalled();
        });
      }
    });
  });

  it('should redirect to login when user is not authenticated', () => {
    mockAuthService.isAuthenticated$.and.returnValue(of(false));

    TestBed.runInInjectionContext(() => {
      const route = {} as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;
      const result = authGuard(route, state);

      if (typeof result === 'object' && 'subscribe' in result) {
        result.subscribe((canActivate) => {
          expect(canActivate).toBe(false);
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        });
      }
    });
  });
});
