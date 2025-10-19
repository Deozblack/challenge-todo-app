import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  get user() {
    return this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout$().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error logging out:', err);
      },
    });
  }
}
