import { createActionGroup, props } from '@ngrx/store';
import { UserModel } from '../../../core/models/user.model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    Load: props<{ userId: number }>(),
    'Load Success': props<{ user: UserModel }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
