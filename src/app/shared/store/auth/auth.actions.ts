import { createActionGroup, props } from '@ngrx/store';
import { LoginModel } from '../../../core/models/login.model';
import { SignupModel } from '../../../core/models/signup.model';

export const authActions = createActionGroup({
  source: 'Auth API',
  events: {
    Login: props<LoginModel>(),
    'Login Success': props<{ token: string; userId: number }>(),
    'Login Failure': props<{ error: string }>(),

    Signup: props<{ signupData: SignupModel }>(),
    'Signup Success': props<{ username: string }>(),
    'Signup Failure': props<{ error: string }>(),
  },
});
