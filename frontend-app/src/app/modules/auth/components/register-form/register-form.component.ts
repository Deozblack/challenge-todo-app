import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { ValidatorService } from '../../../../core/validators/validator.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register-form.component.html',
  styles: ``,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private validatorService = inject(ValidatorService);

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

    const { email, password } = this.registerForm.value;

    this.authService.signUp$(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
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
      },
    });
  }
}
