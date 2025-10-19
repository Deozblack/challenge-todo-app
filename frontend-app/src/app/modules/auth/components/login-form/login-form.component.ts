import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import SpinnerComponent from '../../../../shared/components/spinner/spinner.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent, SpinnerComponent],
  templateUrl: './login-form.component.html',
  styles: ``,
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  public isLoading = signal(false);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    this.authService.login$(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.alertService.createAlert({
          icon: 'error',
          message: 'Credenciales inválidas. Inténtalo de nuevo.',
        });
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
