import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, Subscription, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Movie, MovieDetails, PaginatedResponse } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.tmdb.baseUrl;

  private readonly moviesSignal = signal<Movie[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly movies = this.moviesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Current search keyword; empty means the popular list is shown.
  // Kept in the service so results survive navigating to details and back.
  private readonly querySignal = signal('');
  readonly query = this.querySignal.asReadonly();

  private listRequest?: Subscription;

  // Details state is separate from the list, so opening a movie doesn't reset the list
  private readonly movieDetailsSignal = signal<MovieDetails | null>(null);
  private readonly detailsLoadingSignal = signal(false);
  private readonly detailsErrorSignal = signal<string | null>(null);

  readonly movieDetails = this.movieDetailsSignal.asReadonly();
  readonly detailsLoading = this.detailsLoadingSignal.asReadonly();
  readonly detailsError = this.detailsErrorSignal.asReadonly();

  private detailsRequest?: Subscription;

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

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.listRequest = request$.pipe(finalize(() => this.loadingSignal.set(false))).subscribe({
      next: (response) => this.moviesSignal.set(response.results),
      error: (err: HttpErrorResponse) => {
        this.moviesSignal.set([]);
        this.errorSignal.set(toErrorMessage(err));
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
        error: (err: HttpErrorResponse) => this.detailsErrorSignal.set(toErrorMessage(err)),
      });
  }
}

function toErrorMessage(err: HttpErrorResponse): string {
  switch (err.status) {
    case 0:
      return 'Network error. Check your internet connection.';
    case 401:
      return 'Invalid API token. Check TMDB_ACCESS_TOKEN in .env.';
    case 404:
      return 'Movie not found.';
    default:
      return 'Something went wrong. Please try again later.';
  }
}
