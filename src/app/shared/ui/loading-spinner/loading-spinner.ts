import { Component, inject } from '@angular/core';

import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-center p-20" role="status">
      <span
        class="size-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-600"
      ></span>
      <span class="sr-only">{{ t().common.loading }}</span>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  protected readonly t = inject(LanguageService).t;
}
