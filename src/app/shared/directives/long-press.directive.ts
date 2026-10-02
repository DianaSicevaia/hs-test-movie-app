import { DestroyRef, Directive, inject, input, output } from '@angular/core';

/**
 * Emits `longPress` when a touch/pen pointer is held on the element.
 * Mouse is ignored — desktop users get hover instead.
 */
// Again, thanks to https://stackoverflow.com/a/75574345/10629172 for the idea of using pointer events instead of touch events.
// And Claude for the fast and simple implementation.
@Directive({
  selector: '[appLongPress]',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
    '(pointerup)': 'cancel()',
    '(pointerleave)': 'cancel()',
    '(pointercancel)': 'cancel()',
    '(contextmenu)': 'onContextMenu($event)',
  },
})
export class LongPressDirective {
  readonly longPressDuration = input(500);
  readonly longPress = output<void>();

  private timerId?: ReturnType<typeof setTimeout>;
  private isTouch = false;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cancel());
  }

  protected onPointerDown(event: PointerEvent): void {
    this.isTouch = event.pointerType !== 'mouse';
    if (!this.isTouch) return;

    this.cancel();
    this.timerId = setTimeout(() => this.longPress.emit(), this.longPressDuration());
  }

  protected onContextMenu(event: Event): void {
    // Suppress the native long-press menu on touch devices, keep right-click on desktop
    if (this.isTouch) event.preventDefault();
  }

  protected cancel(): void {
    clearTimeout(this.timerId);
  }
}
