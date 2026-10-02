import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="rounded-lg border bg-red-500/10 p-6 text-center" role="alert">
      <p class="text-red-300">{{ message() }}</p>
      <button
        type="button"
        (click)="retry.emit()"
        class="mt-4 rounded-md bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-500"
      >
        Try again
      </button>
    </div>
  `,
})
export class ErrorMessageComponent {
  readonly message = input.required<string>();
  readonly retry = output<void>();
}
