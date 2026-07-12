import { Component, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { FormErrors } from '../../shared/components/form/form-errors/form-errors';
import { SignupModel, signupSchema } from './signup.schema';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
  imports: [Button, RouterLink, FormField, FormErrors],
})
export class SignupPage {
  protected signupModel: WritableSignal<SignupModel> = signal({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  protected signupForm = form(this.signupModel, signupSchema);

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.signupForm().valid()) {
      console.log('Form data', this.signupModel());
    } else {
      console.log('Form is invalid');
    }
  }
}
