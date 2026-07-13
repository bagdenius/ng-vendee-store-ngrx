import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginModel, LoginResponse } from '../../../core/models/login.model';
import { SignupModel, SignupResponse } from '../../../core/models/signup.model';

export const authActions = createActionGroup({
  source: 'Auth API',
  events: {
    Login: props<LoginModel>(),
    'Login Success': props<LoginResponse>(),
    'Login Failure': props<{ error: any }>(),

    Signup: props<SignupModel>(),
    'Signup Success': props<{ username: string }>(),
    'Signup Failure': props<{ error: any }>(),
  },
});
