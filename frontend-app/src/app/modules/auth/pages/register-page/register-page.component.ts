import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayout } from '../../../../layouts/auth-layout/auth-layout';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [AuthLayout, RegisterFormComponent, RouterModule],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export default class RegisterPageComponent {}
