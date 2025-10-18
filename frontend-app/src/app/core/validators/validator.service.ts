import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const password = control.parent.get('password');
      const confirmPassword = control;

      if (!password || !confirmPassword.value) {
        return null;
      }

      return password.value === confirmPassword.value
        ? null
        : { passwordMismatch: true };
    };
  }
}
