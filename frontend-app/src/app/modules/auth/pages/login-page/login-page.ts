import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayout } from '../../../../layouts/auth-layout/auth-layout';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthLayout, LoginFormComponent, RouterModule],
  templateUrl: './login-page.html',
  styles: ``,
})
export default class LoginPage {}
