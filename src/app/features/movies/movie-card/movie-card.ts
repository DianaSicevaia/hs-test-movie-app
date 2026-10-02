import { Component, computed, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Movie } from '../../../core/models/movie';
import { getPosterUrl } from '../../../core/utils/tmdb-image';
import { LongPressDirective } from '../../../shared/directives/long-press.directive';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, DecimalPipe, LongPressDirective],
  templateUrl: './movie-card.html',
})
export class MovieCardComponent {
  readonly movie = input.required<Movie>();

  /** Full overview opened by long press on touch devices. */
  protected readonly isOverviewOpen = signal(false);

  protected readonly posterUrl = computed(() => getPosterUrl(this.movie().poster_path));
  protected readonly releaseYear = computed(() => this.movie().release_date?.slice(0, 4) || '—');

  protected openOverview(): void {
    if (this.movie().overview) {
      this.isOverviewOpen.set(true);
    }
  }

  protected closeOverview(): void {
    // While open, routerLink is disabled, so a tap only closes the overview
    this.isOverviewOpen.set(false);
  }
}
