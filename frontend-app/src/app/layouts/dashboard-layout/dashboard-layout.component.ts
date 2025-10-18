import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard-layout.component.html',
  styles: ``,
})
export default class DashboardLayoutComponent {
  currentUser: User = {
    id: '1',
    name: 'Usuario Demo',
    email: 'demo@todoapp.com',
  };
}
