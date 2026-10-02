import { Component, input, linkedSignal, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, map, merge, skip } from 'rxjs';

const TYPING_DEBOUNCE_MS = 400;

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.html',
})
export class MovieSearchComponent {
  readonly initialQuery = input('');
  readonly queryChange = output<string>();

  protected readonly query = linkedSignal(() => this.initialQuery());
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
