import { ErrorCode } from '../../models/api-error';

export const en = {
  language: 'Language',
  footer: {
    author: 'An assignment prepared by Diana Sicevaia',
  },
  search: {
    label: 'Search movies',
    placeholder: 'Search movies…',
    submit: 'Search',
  },
  list: {
    popular: 'Popular movies',
    resultsFor: (query: string) => `Results for “${query}”`,
    empty: 'No movies found.',
    emptyFor: (query: string) => `No movies found for “${query}”.`,
  },
  movie: {
    back: 'Back',
    noPoster: 'No poster',
    noOverview: 'No description available.',
    rating: 'Rating',
    votes: (count: string) => `${count} votes`,
    releaseDate: 'Release date:',
    runtime: 'Runtime:',
    runtimeValue: (hours: number, minutes: number) =>
      hours ? `${hours}h ${minutes}m` : `${minutes}m`,
    genres: 'Genres',
    overview: 'Overview',
  },
  common: {
    loading: 'Loading…',
    retry: 'Try again',
  },
  errors: {
    network: 'Network error. Check your internet connection.',
    unauthorized: 'Invalid API token. Check TMDB_ACCESS_TOKEN in .env.',
    notFound: 'The requested resource was not found.',
    movieNotFound: 'Movie not found.',
    unknown: 'Something went wrong. Please try again later.',
  } satisfies Record<ErrorCode, string>,
};

export type Translations = typeof en;
