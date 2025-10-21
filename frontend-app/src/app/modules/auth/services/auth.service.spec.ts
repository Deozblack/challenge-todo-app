import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User, UserCredential } from '@angular/fire/auth';
import { of, throwError } from 'rxjs';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: User;

  beforeEach(() => {
    const firebaseConfig = {
      apiKey: 'test-api-key',
      authDomain: 'test.firebaseapp.com',
      projectId: 'test-project',
      storageBucket: 'test.appspot.com',
      messagingSenderId: '123456789',
      appId: 'test-app-id',
    };

    mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      emailVerified: true,
      isAnonymous: false,
      metadata: {} as User['metadata'],
      providerData: [],
      refreshToken: 'refresh-token',
      tenantId: null,
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
      getIdToken: jasmine
        .createSpy('getIdToken')
        .and.returnValue(Promise.resolve('mock-token')),
      getIdTokenResult: jasmine
        .createSpy('getIdTokenResult')
        .and.returnValue(Promise.resolve({} as unknown as object)),
      reload: jasmine.createSpy('reload').and.returnValue(Promise.resolve()),
      toJSON: jasmine.createSpy('toJSON').and.returnValue({}),
      phoneNumber: null,
      photoURL: null,
      providerId: 'firebase',
    };

    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentUser', () => {
    it('should return a user signal', () => {
      const userSignal = service.getCurrentUser();
      expect(userSignal).toBeDefined();
      expect(typeof userSignal).toBe('function');
    });

    it('should have an initial value', () => {
      const userSignal = service.getCurrentUser();
      const currentValue = userSignal();
      expect(currentValue).toBeDefined();
    });
  });

  describe('isAuthenticated$', () => {
    it('should return an Observable', (done) => {
      service.isAuthenticated$().subscribe({
        next: (isAuth) => {
          expect(typeof isAuth).toBe('boolean');
          done();
        },
        error: done.fail,
      });
    });

    it('should complete after emitting first value', (done) => {
      let emissionCount = 0;

      service.isAuthenticated$().subscribe({
        next: () => {
          emissionCount++;
        },
        complete: () => {
          expect(emissionCount).toBe(1);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('login$', () => {
    it('should return an Observable when called', () => {
      const result = service.login$('test@example.com', 'password123');
      expect(result).toBeDefined();
      expect(result.subscribe).toBeDefined();
    });

    it('should call login method and return observable', (done) => {
      spyOn(service, 'login$').and.returnValue(
        of({ user: mockUser } as UserCredential)
      );

      service.login$('test@example.com', 'password123').subscribe({
        next: (credential) => {
          expect(credential.user).toEqual(mockUser);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle errors when login fails', (done) => {
      spyOn(service, 'login$').and.returnValue(
        throwError(() => new Error('Invalid credentials'))
      );

      service.login$('test@example.com', 'wrong-password').subscribe({
        next: () => done.fail('Should have thrown an error'),
        error: (error) => {
          expect(error.message).toBe('Invalid credentials');
          done();
        },
      });
    });
  });

  describe('signUp$', () => {
    it('should return an Observable when called', () => {
      const result = service.signUp$('new@example.com', 'password123');
      expect(result).toBeDefined();
      expect(result.subscribe).toBeDefined();
    });

    it('should call signUp method and return observable', (done) => {
      spyOn(service, 'signUp$').and.returnValue(
        of({ user: mockUser } as UserCredential)
      );

      service.signUp$('new@example.com', 'password123').subscribe({
        next: (credential) => {
          expect(credential.user).toEqual(mockUser);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle errors when signup fails', (done) => {
      spyOn(service, 'signUp$').and.returnValue(
        throwError(() => new Error('Email already in use'))
      );

      service.signUp$('existing@example.com', 'password123').subscribe({
        next: () => done.fail('Should have thrown an error'),
        error: (error) => {
          expect(error.message).toBe('Email already in use');
          done();
        },
      });
    });
  });

  describe('logout$', () => {
    it('should return an Observable when called', () => {
      const result = service.logout$();
      expect(result).toBeDefined();
      expect(result.subscribe).toBeDefined();
    });

    it('should complete logout successfully', (done) => {
      spyOn(service, 'logout$').and.returnValue(of(void 0));

      service.logout$().subscribe({
        next: () => {
          expect(service.logout$).toHaveBeenCalled();
          done();
        },
        error: done.fail,
      });
    });

    it('should handle errors when logout fails', (done) => {
      spyOn(service, 'logout$').and.returnValue(
        throwError(() => new Error('Logout failed'))
      );

      service.logout$().subscribe({
        next: () => done.fail('Should have thrown an error'),
        error: (error) => {
          expect(error.message).toBe('Logout failed');
          done();
        },
      });
    });
  });

  describe('getActiveUserToken$', () => {
    it('should return an Observable', () => {
      const result = service.getActiveUserToken$();
      expect(result).toBeDefined();
      expect(result.subscribe).toBeDefined();
    });

    it('should return null when no user is authenticated', (done) => {
      service.getActiveUserToken$().subscribe({
        next: (token) => {
          expect(token).toBeNull();
          done();
        },
        error: done.fail,
      });
    });
  });
});
