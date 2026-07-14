import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { authActions } from './auth.actions';

export interface AuthState {
  token: string | null;
  userId: number | null;
  error: string | null;
  isLoading: boolean;
}

const getStoredToken = (): string | null =>
  localStorage.getItem('ngrxstore:token');

export const initialAuthState: AuthState = {
  token: getStoredToken(),
  userId: null,
  isLoading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',

  // Login
  reducer: createReducer(
    initialAuthState,
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(authActions.loginSuccess, (state, { token, userId }) => ({
      ...state,
      token,
      userId,
      isLoading: false,
      error: null,
    })),
    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
      token: null,
    })),

    // Signup
    on(authActions.signup, (state) => ({
      ...state,
      token: null,
      isLoading: true,
      error: null,
    })),
    on(authActions.signupSuccess, (state) => ({
      ...state,
      token: null,
      isLoading: false,
      error: null,
    })),
    on(authActions.signupFailure, (state, { error }) => ({
      ...state,
      token: null,
      isLoading: false,
      error,
    })),

    // Logout
    on(authActions.logout, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(authActions.logoutSuccess, (state) => ({
      ...state,
      token: null,
      userId: null,
      isLoading: false,
      error: null,
    })),
    on(authActions.logoutFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),

  extraSelectors: ({ selectToken }) => ({
    selectIsAuthenticated: createSelector(selectToken, (token) => !!token),
  }),
});
