import { Component, inject } from '@angular/core';

import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-progress-bar',
  host: { class: 'pointer-events-none absolute inset-x-0 bottom-0 block h-0.5 overflow-hidden' },
  template: `
    <div
      aria-hidden="true"
      [attr.data-active]="isLoading() || null"
      class="h-full opacity-0 transition-opacity data-active:opacity-100 data-active:delay-200"
    >
      <div class="animate-progress h-full w-1/3 bg-amber-500"></div>
    </div>
  `,
})
export class ProgressBarComponent {
  protected readonly isLoading = inject(LoadingService).isLoading;
}
