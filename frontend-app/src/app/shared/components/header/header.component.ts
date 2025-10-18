import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  currentUser: User = {
    id: '1',
    name: 'Usuario Demo',
    email: 'demo@todoapp.com',
  };

  logout(): void {
    // Aquí iría la lógica de logout real
    console.log('Logging out...');

    // Limpiar datos de usuario (localStorage, sessionStorage, etc.)
    // this.authService.logout();

    // Navegar al login
    this.router.navigate(['/login']);
  }
}
