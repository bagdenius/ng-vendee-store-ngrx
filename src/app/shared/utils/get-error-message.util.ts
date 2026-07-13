import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse)
    return error.error?.message ?? error.message;
  return 'Something went wrong';
}
