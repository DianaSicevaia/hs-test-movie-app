export const LANGUAGES = [
  { code: 'en', locale: 'en-US', label: 'English', shortLabel: 'EN' },
  { code: 'ru', locale: 'ru-RU', label: 'Русский', shortLabel: 'RU' },
  { code: 'uk', locale: 'uk-UA', label: 'Українська', shortLabel: 'UA' },
  { code: 'ro', locale: 'ro-RO', label: 'Română', shortLabel: 'RO' },
] as const;

export type Language = (typeof LANGUAGES)[number];
export type LanguageCode = Language['code'];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function isLanguageCode(value: unknown): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}
