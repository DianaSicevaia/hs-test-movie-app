const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w185' | 'w342' | 'w500' | 'original';

/** Builds a full TMDb image URL, or null if the movie has no poster. */
export function getPosterUrl(path: string | null, size: PosterSize = 'w342'): string | null {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}
