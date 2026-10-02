import { Component, computed, effect, inject, input, numberAttribute } from '@angular/core';
import { DatePipe, DecimalPipe, Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MovieService } from '../../core/services/movie.service';
import { getBackdropUrl, getPosterUrl } from '../../core/utils/tmdb-image';
import { ErrorMessageComponent } from '../../shared/ui/error-message/error-message';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner';

@Component({
  selector: 'app-movie-detail',
  imports: [DatePipe, DecimalPipe, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './movie-detail.html',
})
export class MovieDetailComponent {
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly location = inject(Location);

  readonly id = input.required({ transform: numberAttribute });

  protected readonly movie = this.movieService.movieDetails;
  protected readonly loading = this.movieService.detailsLoading;
  protected readonly error = this.movieService.detailsError;

  protected readonly posterUrl = computed(() =>
    getPosterUrl(this.movie()?.poster_path ?? null, 'w500'),
  );
  protected readonly backdropUrl = computed(() =>
    getBackdropUrl(this.movie()?.backdrop_path ?? null),
  );
  protected readonly runtime = computed(() => formatRuntime(this.movie()?.runtime));

  // Check if there is a previous page in the navigation history and start from the root if not.
  // For cases when user opens a movie detail page directly from a link.
  private readonly hasPreviousPage = !!this.router.currentNavigation()?.previousNavigation;

  constructor() {
    effect(() => this.loadMovie());

    effect(() => {
      const movie = this.movie();
      if (movie) this.title.setTitle(movie.title);
    });
  }

  protected loadMovie(): void {
    this.movieService.getMovieDetails(this.id());
  }

  protected goBack(): void {
    if (this.hasPreviousPage) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}

function formatRuntime(minutes: number | null | undefined): string | null {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  // just in case if movie is less than an hour so there is no "0h 45m"
  return h ? `${h}h ${m}m` : `${m}m`;
}
