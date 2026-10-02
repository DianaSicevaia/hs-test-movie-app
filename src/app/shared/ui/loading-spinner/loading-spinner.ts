import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center p-20" role="status">
      <span
        class="size-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-600"
      ></span>
      <span class="sr-only">Loading…</span>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
