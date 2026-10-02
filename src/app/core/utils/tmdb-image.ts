const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w185' | 'w342' | 'w500' | 'original';
export type BackdropSize = 'w780' | 'w1280' | 'original';

/** Builds a full TMDb image URL, or null if the movie has no poster. */
export function getPosterUrl(path: string | null, size: PosterSize = 'w342'): string | null {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

/** Builds a full TMDb backdrop (wide background) URL, or null if there is none. */

// Well yes these two are really similar and a refactor might not be a bad idea
// but I like the explicitness of having two separate functions for clarity
// Besides, the way I see the refactoring it would be one private method smth like getImageUrl and two public for two different size ranges
// then the public methods would be just one-liners and I don't see the point of that for now.

export function getBackdropUrl(path: string | null, size: BackdropSize = 'w1280'): string | null {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}
