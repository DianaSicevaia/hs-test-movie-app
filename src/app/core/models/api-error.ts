// Language-independent error kind; the UI turns it into text via translations
export type ErrorCode = 'network' | 'unauthorized' | 'notFound' | 'movieNotFound' | 'unknown';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: ErrorCode,
  ) {
    super(code);
    this.name = 'ApiError';
  }
}
