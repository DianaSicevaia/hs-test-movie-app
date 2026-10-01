import { Component, OnInit, inject } from '@angular/core';

import { MovieService } from '../../../core/services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.html',
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly movies = this.movieService.movies;
  protected readonly loading = this.movieService.loading;
  protected readonly error = this.movieService.error;

  ngOnInit(): void {
    this.loadMovies();
  }

  protected loadMovies(): void {
    this.movieService.getPopularMovies();
  }
}
