import { Component, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { FormErrors } from '../../shared/components/form/form-errors/form-errors';
import { LoginModel, loginSchema } from './login.schema';

@Component({
  selector: 'login-page',
  imports: [Button, RouterLink, FormField, FormErrors],
  templateUrl: './login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class LoginPage {
  loginModel: WritableSignal<LoginModel> = signal({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, loginSchema);

  public onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      console.log('Login data:', this.loginModel());
    } else {
      console.log('Form is invalid');
    }
  }
}
