import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from '../../core/models/login.model';
import { Button } from '../../shared/components/button/button';
import { FormErrors } from '../../shared/components/form/form-errors/form-errors';
import { authActions } from '../../shared/store/auth/auth.actions';
import { authFeature } from '../../shared/store/auth/auth.feature';
import { loginSchema } from './login.schema';

@Component({
  selector: 'login-page',
  imports: [Button, RouterLink, FormField, FormErrors],
  templateUrl: './login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class LoginPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  protected readonly isLoading = toSignal(
    this.store.select(authFeature.selectIsLoading),
    { initialValue: false },
  );

  protected loginModel: WritableSignal<LoginModel> = signal({
    username: this.route.snapshot.queryParamMap.get('username') ?? '',
    password: '',
  });
  protected loginForm = form(this.loginModel, loginSchema);

  public ngOnInit(): void {
    // const token = this.store.select(authFeature.selectToken);
    // if (token) this.router.navigateByUrl('/products');
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      this.store.dispatch(authActions.login(this.loginModel()));
    } else {
      console.log('Form is invalid');
    }
  }
}
