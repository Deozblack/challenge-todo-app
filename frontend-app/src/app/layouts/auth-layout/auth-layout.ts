import { Component, input } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './auth-layout.html',
  styles: ``,
})
export class AuthLayout {
  public title = input.required<string>();
}
