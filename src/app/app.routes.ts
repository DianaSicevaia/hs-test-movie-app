import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'HSMovieHub',
    loadComponent: () =>
      import('./features/movies/movie-list/movie-list').then((m) => m.MovieListComponent),
  },
  {
    path: 'movie/:id',
    title: 'HSMovieHub',
    loadComponent: () =>
      import('./features/movie-detail/movie-detail').then((m) => m.MovieDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
