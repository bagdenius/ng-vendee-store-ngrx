import { Component, inject, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { FormErrors } from '../../shared/components/form/form-errors/form-errors';
import { signupSchema } from './signup.schema';
import { SignupModel } from '../../core/models/signup.model';
import { Store } from '@ngrx/store';
import { authFeature } from '../../shared/store/auth/auth.feature';
import { authActions } from '../../shared/store/auth/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
  imports: [Button, RouterLink, FormField, FormErrors],
})
export class SignupPage {
  private readonly store = inject(Store);

  protected signupModel: WritableSignal<SignupModel> = signal({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  protected signupForm = form(this.signupModel, signupSchema);
  protected isLoading = toSignal(
    this.store.select(authFeature.selectIsLoading),
    { initialValue: false },
  );

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.signupForm().valid()) {
      this.store.dispatch(authActions.signup(this.signupModel()));
    } else {
      console.log('Form is invalid');
    }
  }
}
