import { Translations } from './en';

export const ru: Translations = {
  language: 'Язык',
  footer: {
    author: 'Тестовое задание подготовлено Дианой Сичевой',
  },
  search: {
    label: 'Поиск фильмов',
    placeholder: 'Поиск фильмов…',
    submit: 'Найти',
  },
  list: {
    popular: 'Популярные фильмы',
    resultsFor: (query) => `Результаты по запросу «${query}»`,
    empty: 'Фильмы не найдены.',
    emptyFor: (query) => `По запросу «${query}» ничего не найдено.`,
  },
  movie: {
    back: 'Назад',
    noPoster: 'Нет постера',
    noOverview: 'Описание отсутствует.',
    rating: 'Рейтинг',
    votes: (count) => `голосов: ${count}`,
    releaseDate: 'Дата выхода:',
    runtime: 'Длительность:',
    runtimeValue: (hours: number, minutes: number) =>
      hours ? `${hours} ч ${minutes} мин` : `${minutes} мин`,
    genres: 'Жанры',
    overview: 'Описание',
  },
  common: {
    loading: 'Загрузка…',
    retry: 'Повторить',
  },
  errors: {
    network: 'Ошибка сети. Проверьте подключение к интернету.',
    unauthorized: 'Неверный API-токен. Проверьте TMDB_ACCESS_TOKEN в .env.',
    notFound: 'Запрашиваемый ресурс не найден.',
    movieNotFound: 'Фильм не найден.',
    unknown: 'Что-то пошло не так. Попробуйте позже.',
  },
};
