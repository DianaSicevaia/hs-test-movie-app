import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { Observable, Subscription, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LanguageService } from '../i18n/language.service';
import { LanguageCode } from '../i18n/languages';
import { ApiError, ErrorCode } from '../models/api-error';
import { Movie, MovieDetails, PaginatedResponse } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly apiUrl = environment.tmdb.baseUrl;

  private readonly moviesSignal = signal<Movie[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<ErrorCode | null>(null);

  readonly movies = this.moviesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Current search keyword; empty means the popular list is shown.
  // Kept in the service so results survive navigating to details and back.
  private readonly querySignal = signal('');
  readonly query = this.querySignal.asReadonly();

  private listRequest?: Subscription;
  private listLanguage: LanguageCode | null = null;

  // Details state is separate from the list, so opening a movie doesn't reset the list
  private readonly movieDetailsSignal = signal<MovieDetails | null>(null);
  private readonly detailsLoadingSignal = signal(false);
  private readonly detailsErrorSignal = signal<ErrorCode | null>(null);

  readonly movieDetails = this.movieDetailsSignal.asReadonly();
  readonly detailsLoading = this.detailsLoadingSignal.asReadonly();
  readonly detailsError = this.detailsErrorSignal.asReadonly();

  private detailsRequest?: Subscription;

  constructor() {
    // The list is cached here, so the service refreshes it when the content language
    // changes — even if the user is on the details page at that moment
    effect(() => {
      const language = this.languageService.language();

      // untracked: the reload reads and writes other signals, which must not become
      // dependencies of this effect — it should react to the language only
      untracked(() => {
        if (this.listLanguage && this.listLanguage !== language) {
          this.searchMovies(this.query());
        }
      });
    });
  }

  getPopularMovies(): void {
    this.querySignal.set('');
    this.loadList(this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/movie/popular`));
  }

  searchMovies(keyword: string): void {
    const query = keyword.trim();

    if (!query) {
      this.getPopularMovies();
      return;
    }

    this.querySignal.set(query);
    const params = new HttpParams().set('query', query);
    this.loadList(
      this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/search/movie`, { params }),
    );
  }

  private loadList(request$: Observable<PaginatedResponse<Movie>>): void {
    // Cancel the previous request: while typing, an older slow response
    // must not overwrite the results for the newer keyword
    this.listRequest?.unsubscribe();

    this.listLanguage = untracked(this.languageService.language);
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.listRequest = request$.pipe(finalize(() => this.loadingSignal.set(false))).subscribe({
      next: (response) => this.moviesSignal.set(response.results),
      error: (err: unknown) => {
        this.moviesSignal.set([]);
        this.errorSignal.set(getErrorCode(err));
      },
    });
  }

  getMovieDetails(id: number): void {
    // Cancel the previous request so a slow response can't overwrite a newer one
    this.detailsRequest?.unsubscribe();

    this.movieDetailsSignal.set(null);
    this.detailsLoadingSignal.set(true);
    this.detailsErrorSignal.set(null);

    this.detailsRequest = this.http
      .get<MovieDetails>(`${this.apiUrl}/movie/${id}`)
      .pipe(finalize(() => this.detailsLoadingSignal.set(false)))
      .subscribe({
        next: (movie) => this.movieDetailsSignal.set(movie),
        error: (err: unknown) => {
          const code = getErrorCode(err);
          // Only the service knows that "not found" here means the movie doesn't exist
          this.detailsErrorSignal.set(code === 'notFound' ? 'movieNotFound' : code);
        },
      });
  }
}

// generic fallback
function getErrorCode(err: unknown): ErrorCode {
  return err instanceof ApiError ? err.code : 'unknown';
}
