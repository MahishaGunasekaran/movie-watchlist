import FavoritesPage from '../pages/favorites';
import type { Movie } from '../types/movie.type';

const FAVORITES_KEY = 'favoriteMovies';

export const getFavoritesFromStorage = (): Movie[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export const saveFavoritesToStorage = (movies: Movie[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
}

export const addFavoriteToStorage = (movie: Movie) => {
  const favorites = getFavoritesFromStorage();
  const exists = favorites.find(f => f.imdbID === movie.imdbID);
  if (!exists) {
    favorites.push(movie);
    saveFavoritesToStorage(favorites);
  }
}

export const removeFavoriteFromStorage = (imdbID: string) => {
  let favorites = getFavoritesFromStorage();
  favorites = favorites.filter(f => f.imdbID !== imdbID);
  saveFavoritesToStorage(favorites);
}

export const fetchRecommendations = async (favorites: Movie[]) => {
  try {
    const result = await fetch("https://localhost:3001/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorites }),
    });
    if (!result.ok) {
      throw new Error("Failed to fetch recommendations");
    }
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};