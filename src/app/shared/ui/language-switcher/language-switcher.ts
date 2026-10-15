import { Component, inject } from '@angular/core';

import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  protected readonly t = this.languageService.t;
  protected readonly currentLanguage = this.languageService.language;
}
