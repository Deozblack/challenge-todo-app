import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login$']);
    mockAlertService = jasmine.createSpyObj('AlertService', ['createAlert']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate email field', () => {
    const emailControl = component.loginForm.get('email');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const passwordControl = component.loginForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should submit valid form and navigate on success', () => {
    mockAuthService.login$.and.returnValue(of({} as UserCredential));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.login();

    expect(mockAuthService.login$).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error message on login failure', () => {
    mockAuthService.login$.and.returnValue(
      throwError(() => new Error('Login failed'))
    );

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    component.login();

    expect(mockAlertService.createAlert).toHaveBeenCalledWith({
      icon: 'error',
      message: 'Credenciales inválidas. Inténtalo de nuevo.',
    });
  });

  it('should not submit invalid form', () => {
    component.loginForm.patchValue({
      email: 'invalid-email',
      password: '123',
    });

    component.login();

    expect(mockAuthService.login$).not.toHaveBeenCalled();
  });
});
