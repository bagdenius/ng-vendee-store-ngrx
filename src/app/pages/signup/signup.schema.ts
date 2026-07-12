import {
  email,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';

export interface SignupModel {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const signupSchema = schema<SignupModel>((schemaPath) => {
  required(schemaPath.username, { message: 'Username is required' });
  minLength(schemaPath.username, 3, {
    message: ' Username should be at least 3 characters long',
  });

  required(schemaPath.email, { message: 'Email is required' });
  email(schemaPath.email, { message: 'Please enter a valid email address' });

  required(schemaPath.password, { message: 'Password is required' });
  minLength(schemaPath.password, 8, {
    message: 'Password should be at least 8 characters long',
  });

  required(schemaPath.passwordConfirmation, {
    message: 'Password confirmation is required',
  });
  validate(schemaPath.passwordConfirmation, ({ value, valueOf }) => {
    if (value().length && value() !== valueOf(schemaPath.password))
      return {
        kind: 'passwordMismatch',
        message: 'Passwords should match',
      };
    return null;
  });
});
