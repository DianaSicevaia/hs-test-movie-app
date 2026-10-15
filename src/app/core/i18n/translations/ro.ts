import { Translations } from './en';

export const ro: Translations = {
  language: 'Limbă',
  footer: {
    author: 'Temă de test realizată de Diana Sicevaia',
  },
  search: {
    label: 'Caută filme',
    placeholder: 'Caută filme…',
    submit: 'Caută',
  },
  list: {
    popular: 'Filme populare',
    resultsFor: (query) => `Rezultate pentru „${query}”`,
    empty: 'Nu s-au găsit filme.',
    emptyFor: (query) => `Nu s-au găsit filme pentru „${query}”.`,
  },
  movie: {
    back: 'Înapoi',
    noPoster: 'Fără poster',
    noOverview: 'Descriere indisponibilă.',
    rating: 'Rating',
    votes: (count) => `voturi: ${count}`,
    releaseDate: 'Data lansării:',
    runtime: 'Durată:',
    runtimeValue: (hours: number, minutes: number) =>
      hours ? `${hours} h ${minutes} min` : `${minutes} min`,
    genres: 'Genuri',
    overview: 'Descriere',
  },
  common: {
    loading: 'Se încarcă…',
    retry: 'Încearcă din nou',
  },
  errors: {
    network: 'Eroare de rețea. Verifică conexiunea la internet.',
    unauthorized: 'Token API invalid. Verifică TMDB_ACCESS_TOKEN în .env.',
    notFound: 'Resursa solicitată nu a fost găsită.',
    movieNotFound: 'Filmul nu a fost găsit.',
    unknown: 'Ceva nu a mers bine. Încearcă din nou mai târziu.',
  },
};
