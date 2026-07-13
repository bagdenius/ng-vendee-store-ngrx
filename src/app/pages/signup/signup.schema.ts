import {
  email,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { SignupModel } from '../../core/models/signup.model';

export const signupSchema = schema<SignupModel>((schemaPath) => {
  required(schemaPath.username, { message: 'Username is required' });
  minLength(schemaPath.username, 3, {
    message: ' Username should be at least 3 characters long',
  });

  required(schemaPath.email, { message: 'Email is required' });
  email(schemaPath.email, { message: 'Please enter a valid email address' });

  required(schemaPath.password, { message: 'Password is required' });
  minLength(schemaPath.password, 6, {
    message: 'Password should be at least 6 characters long',
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
