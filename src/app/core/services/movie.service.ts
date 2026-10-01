import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Movie, PaginatedResponse } from '../models/movie';

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

  getPopularMovies(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .get<PaginatedResponse<Movie>>(`${this.apiUrl}/movie/popular`)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (response) => this.moviesSignal.set(response.results),
        error: (err: HttpErrorResponse) => {
          this.moviesSignal.set([]);
          this.errorSignal.set(toErrorMessage(err));
        },
      });
  }
}

function toErrorMessage(err: HttpErrorResponse): string {
  switch (err.status) {
    case 0:
      return 'Network error. Check your internet connection.';
    case 401:
      return 'Invalid API token. Check TMDB_ACCESS_TOKEN in .env.';
    default:
      return 'Something went wrong. Please try again later.';
  }
}
