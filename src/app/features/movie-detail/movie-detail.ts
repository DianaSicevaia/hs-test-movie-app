import { Component, computed, effect, inject, input, numberAttribute } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LanguageService } from '../../core/i18n/language.service';
import { MovieService } from '../../core/services/movie.service';
import { getBackdropUrl, getPosterUrl } from '../../core/utils/tmdb-image';
import { ErrorMessageComponent } from '../../shared/ui/error-message/error-message';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner';

@Component({
  selector: 'app-movie-detail',
  imports: [DecimalPipe, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './movie-detail.html',
})
export class MovieDetailComponent {
  private readonly movieService = inject(MovieService);
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly location = inject(Location);

  readonly id = input.required({ transform: numberAttribute });

  protected readonly t = this.languageService.t;

  protected readonly movie = this.movieService.movieDetails;
  protected readonly loading = this.movieService.detailsLoading;
  protected readonly error = this.movieService.detailsError;

  protected readonly posterUrl = computed(() =>
    getPosterUrl(this.movie()?.poster_path ?? null, 'w500'),
  );
  protected readonly backdropUrl = computed(() =>
    getBackdropUrl(this.movie()?.backdrop_path ?? null),
  );

  protected readonly runtime = computed(() => {
    const minutes = this.movie()?.runtime;
    return minutes ? this.t().movie.runtimeValue(Math.floor(minutes / 60), minutes % 60) : null;
  });

  // Dates and numbers are formatted with Intl for the current language
  // Angular's DatePipe would need locale data registered for every language =(
  protected readonly releaseDate = computed(() => {
    const date = this.movie()?.release_date;
    if (!date) return null;

    // TMDb sends "YYYY-MM-DD", which JS parses as UTC — format in UTC too, or the day can shift
    return new Intl.DateTimeFormat(this.languageService.locale(), {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(new Date(date));
  });

  protected readonly voteCount = computed(() =>
    new Intl.NumberFormat(this.languageService.locale()).format(this.movie()?.vote_count ?? 0),
  );

  // Check if there is a previous page in the navigation history and start from the root if not.
  // For cases when user opens a movie detail page directly from a link.
  private readonly hasPreviousPage = !!this.router.currentNavigation()?.previousNavigation;

  constructor() {
    effect(() => {
      this.languageService.language();
      this.loadMovie();
    });

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
