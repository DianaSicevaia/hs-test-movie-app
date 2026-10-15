import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageCode, isLanguageCode } from './languages';
import { Translations, en } from './translations/en';
import { ro } from './translations/ro';
import { ru } from './translations/ru';
import { uk } from './translations/uk';

const STORAGE_KEY = 'hs-movie-hub.language';

const TRANSLATIONS: Record<LanguageCode, Translations> = { en, ru, uk, ro };

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  private readonly languageSignal = signal<LanguageCode>(readStoredLanguage());

  readonly languages = LANGUAGES;
  readonly language = this.languageSignal.asReadonly();
  readonly t = computed(() => TRANSLATIONS[this.language()]);
  readonly locale = computed(
    () => LANGUAGES.find((language) => language.code === this.language())!.locale,
  );

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.language();
    });
  }

  setLanguage(code: string): void {
    if (!isLanguageCode(code)) return;

    this.languageSignal.set(code);

    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      console.error('Failed to store language preference', e);
    }
  }
}

function readStoredLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLanguageCode(stored) ? stored : DEFAULT_LANGUAGE;
  } catch (e) {
    console.error('Failed to read stored language preference', e);
    return DEFAULT_LANGUAGE;
  }
}
