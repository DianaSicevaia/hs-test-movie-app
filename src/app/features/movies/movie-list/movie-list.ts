import { Component, OnInit, computed, inject } from '@angular/core';

import { MovieService } from '../../../core/services/movie.service';
import { ErrorMessageComponent } from '../../../shared/ui/error-message/error-message';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner';
import { MovieCardComponent } from '../movie-card/movie-card';
import { MovieSearchComponent } from '../movie-search/movie-search';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCardComponent,
    MovieSearchComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './movie-list.html',
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly movies = this.movieService.movies;
  protected readonly loading = this.movieService.loading;
  protected readonly error = this.movieService.error;
  protected readonly query = this.movieService.query;

  protected readonly heading = computed(() =>
    this.query() ? `Results for “${this.query()}”` : 'Popular movies',
  );

  ngOnInit(): void {
    // Coming back from details: the list is already in the service, no need to refetch
    if (this.movies().length === 0) {
      this.loadMovies();
    }
  }

  protected onSearch(keyword: string): void {
    this.movieService.searchMovies(keyword);
  }

  protected loadMovies(): void {
    // Empty query falls back to popular movies inside the service
    this.movieService.searchMovies(this.query());
  }
}
