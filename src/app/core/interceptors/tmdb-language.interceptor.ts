import { HttpInterceptorFn } from '@angular/common/http';
import { inject, untracked } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../i18n/language.service';

export const tmdbLanguageInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.tmdb.baseUrl)) {
    return next(req);
  }

  // untracked: a request can be started from inside an effect, and that effect
  // must not silently start depending on the language signal
  const locale = untracked(inject(LanguageService).locale);

  return next(req.clone({ setParams: { language: locale } }));
};
