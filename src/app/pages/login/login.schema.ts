import { minLength, required, schema } from '@angular/forms/signals';

export interface LoginModel {
  username: string;
  password: string;
}

export const loginSchema = schema<LoginModel>((schemaPath) => {
  required(schemaPath.username, { message: 'Username is required' });
  minLength(schemaPath.username, 3, {
    message: 'Username should be at least 3 characters long',
  });

  required(schemaPath.password, { message: 'Password is required' });
  minLength(schemaPath.password, 8, {
    message: 'Password should be at least 8 characters long',
  });
});
