import { createFeature, createReducer, on } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { userActions } from './user.actions';

export interface UserState {
  user: UserModel | null;
  isLoading: boolean;
  error: string | null;
}

const initailUserState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initailUserState,
    on(userActions.load, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(userActions.loadSuccess, (state, { user }) => ({
      ...state,
      user,
      isLoading: false,
      error: null,
    })),
    on(userActions.loadFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
