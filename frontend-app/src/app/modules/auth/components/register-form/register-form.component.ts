import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { ValidatorService } from '../../../../core/validators/validator.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import SpinnerComponent from '../../../../shared/components/spinner/spinner.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent, SpinnerComponent],
  templateUrl: './register-form.component.html',
  styles: ``,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);

  public isLoading = signal(false);

  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, this.validatorService.confirmPasswordValidator()],
    ],
  });

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.registerForm.value;

    this.authService.signUp$(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error?.code === 'auth/email-already-in-use') {
          this.alertService.createAlert({
            icon: 'error',
            message:
              'El correo electrónico ya está en uso. Usa otro diferente.',
          });
          return;
        }
        this.alertService.createAlert({
          icon: 'error',
          message: 'Error al registrar el usuario. Inténtalo de nuevo.',
        });
        console.error('Error registering user', error);
      },
    });
  }
}
