export interface SignupModel {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type TempSignupModelWithId = SignupModel & { id: string };

export interface SignupResponse {
  id: string;
  username: string;
  email: string;
}
