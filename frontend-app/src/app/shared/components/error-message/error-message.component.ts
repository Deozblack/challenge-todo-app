import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

type CustomErrorMessages = Record<string, string>;

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styles: `
    .error-container {
      transition: all 0.3s ease;
    }

    .error-message {
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class ErrorMessageComponent {
  public control = input.required<AbstractControl | null>();
  public customMessages = input<CustomErrorMessages>({});

  getErrorMessage(): string {
    const controlValue = this.control();
    const customMsgs = this.customMessages();

    if (!controlValue || !controlValue.errors || !controlValue.touched) {
      return '';
    }

    const errors = controlValue.errors;

    for (const errorType in errors) {
      if (customMsgs[errorType]) {
        return customMsgs[errorType];
      }
    }

    if (errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (errors['email']) {
      return 'Ingresa un email válido';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `Máximo ${requiredLength} caracteres`;
    }

    if (errors['min']) {
      return `El valor mínimo es ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `El valor máximo es ${errors['max'].max}`;
    }

    if (errors['pattern']) {
      return 'El formato ingresado no es válido';
    }

    if (errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    if (errors['passwordStrength']) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
    }

    return 'Campo inválido';
  }

  shouldShowError(): boolean {
    const controlValue = this.control();
    return !!(controlValue && controlValue.errors && controlValue.touched);
  }
}
