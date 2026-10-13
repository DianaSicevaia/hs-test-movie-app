import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { ApiError } from '../models/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((err: unknown) =>
      throwError(() =>
        err instanceof HttpErrorResponse ? new ApiError(err.status, toErrorMessage(err)) : err,
      ),
    ),
  );

function toErrorMessage(err: HttpErrorResponse): string {
  switch (err.status) {
    case 0:
      return 'Network error. Check your internet connection.';
    case 401:
      return 'Invalid API token. Check TMDB_ACCESS_TOKEN in .env.';
    case 404:
      return 'The requested resource was not found.';
    default:
      return 'Something went wrong. Please try again later.';
  }
}
