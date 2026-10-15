import { Component, inject, input, linkedSignal, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, map, merge, skip } from 'rxjs';

import { LanguageService } from '../../../core/i18n/language.service';

const TYPING_DEBOUNCE_MS = 400;

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.html',
})
export class MovieSearchComponent {
  protected readonly t = inject(LanguageService).t;

  readonly initialQuery = input('');
  readonly queryChange = output<string>();

  protected readonly query = linkedSignal<string, string>({
    source: this.initialQuery,
    computation: (source, previous) =>
      previous && previous.value.trim() === source ? previous.value : source,
  });
  private readonly submit$ = new Subject<string>();

  constructor() {
    const typed$ = toObservable(this.query).pipe(skip(1), debounceTime(TYPING_DEBOUNCE_MS));

    merge(typed$, this.submit$)
      .pipe(
        map((query) => query.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((query) => this.queryChange.emit(query));
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submit$.next(this.query());
  }
}
