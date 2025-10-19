import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { LogoComponent } from '../logo/logo.component';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  private authServie = inject(AuthService);
  private router = inject(Router);
  currentUser: User = {
    id: '1',
    name: 'Usuario Demo',
    email: 'demo@todoapp.com',
  };

  logout(): void {
    this.authServie.logout$().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error logging out:', err);
      },
    });
  }
}
