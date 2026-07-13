import { createActionGroup, props } from '@ngrx/store';
import { LoginModel } from '../../../core/models/login.model';
import { SignupModel } from '../../../core/models/signup.model';

export const authActions = createActionGroup({
  source: 'Auth API',
  events: {
    Login: props<{ loginData: LoginModel }>(),
    'Login Success': props<{ token: string; userId: number }>(),
    'Login Failure': props<{ error: string }>(),

    Signup: props<{ signupData: SignupModel }>(),
    'Signup Success': props<{ username: string }>(),
    'Signup Failure': props<{ error: string }>(),

    // Todo: implement actions for restoring the session on app init and remove workaround from profile page onInit
  },
});
