import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

interface AlertProps {
  icon: SweetAlertIcon;
  message: string;
  position?: SweetAlertPosition;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  createAlert({ icon, message, position = 'top-end' }: AlertProps) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'oklch(37.3% 0.034 259.733)',
      color: '#f9fafb',
      didOpen: (toast) => {
        Object.assign(toast.style, {
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          boxShadow:
            '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.1)',
          fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        });

        const progressBar = toast.querySelector(
          '.swal2-timer-progress-bar'
        ) as HTMLElement;
        if (progressBar) {
          progressBar.style.background = '#f97316';
          progressBar.style.height = '3px';
        }

        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  }
}
