import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { LanguageService } from './core/i18n/language.service';
import { LanguageSwitcherComponent } from './shared/ui/language-switcher/language-switcher';
import { ProgressBarComponent } from './shared/ui/progress-bar/progress-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProgressBarComponent, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly t = inject(LanguageService).t;
}
