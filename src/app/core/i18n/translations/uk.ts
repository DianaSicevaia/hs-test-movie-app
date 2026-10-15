import { Translations } from './en';

export const uk: Translations = {
  language: 'Мова',
  footer: {
    author: 'Тестове завдання підготовлено Діаною Січевою',
  },
  search: {
    label: 'Пошук фільмів',
    placeholder: 'Пошук фільмів…',
    submit: 'Знайти',
  },
  list: {
    popular: 'Популярні фільми',
    resultsFor: (query) => `Результати за запитом «${query}»`,
    empty: 'Фільми не знайдено.',
    emptyFor: (query) => `За запитом «${query}» нічого не знайдено.`,
  },
  movie: {
    back: 'Назад',
    noPoster: 'Немає постера',
    noOverview: 'Опис відсутній.',
    rating: 'Рейтинг',
    votes: (count) => `голосів: ${count}`,
    releaseDate: 'Дата виходу:',
    runtime: 'Тривалість:',
    runtimeValue: (hours: number, minutes: number) =>
      hours ? `${hours} год ${minutes} хв` : `${minutes} хв`,
    genres: 'Жанри',
    overview: 'Опис',
  },
  common: {
    loading: 'Завантаження…',
    retry: 'Спробувати ще раз',
  },
  errors: {
    network: 'Помилка мережі. Перевірте підключення до інтернету.',
    unauthorized: 'Недійсний API-токен. Перевірте TMDB_ACCESS_TOKEN у .env.',
    notFound: 'Запитуваний ресурс не знайдено.',
    movieNotFound: 'Фільм не знайдено.',
    unknown: 'Щось пішло не так. Спробуйте пізніше.',
  },
};
