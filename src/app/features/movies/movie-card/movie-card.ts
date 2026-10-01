import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Movie } from '../../../core/models/movie';
import { getPosterUrl } from '../../../core/utils/tmdb-image';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './movie-card.html',
})
export class MovieCardComponent {
  readonly movie = input.required<Movie>();

  protected readonly posterUrl = computed(() => getPosterUrl(this.movie().poster_path));
  protected readonly releaseYear = computed(() => this.movie().release_date?.slice(0, 4) || '—');
}
