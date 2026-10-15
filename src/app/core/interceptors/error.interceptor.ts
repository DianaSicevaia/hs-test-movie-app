import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { ApiError, ErrorCode } from '../models/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((err: unknown) =>
      throwError(() =>
        err instanceof HttpErrorResponse ? new ApiError(err.status, toErrorCode(err.status)) : err,
      ),
    ),
  );

function toErrorCode(status: number): ErrorCode {
  switch (status) {
    case 0:
      return 'network';
    case 401:
      return 'unauthorized';
    case 404:
      return 'notFound';
    default:
      return 'unknown';
  }
}
