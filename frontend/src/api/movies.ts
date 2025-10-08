import axios from "axios";
import {
    getFavoritesFromStorage,
    addFavoriteToStorage,
    removeFavoriteFromStorage
} from "../utils/localFavorites";
import type { Movie } from "../types/movie.type";

const BASE_URL = "http://localhost:3001";

export const searchMovies = async (query: string, page: number = 1) => {
    const response = await fetch(`${BASE_URL}/movies/search?q=${query}&page=${page}`);
    const data = await response.json();
    return data;
}

// Goes to the backend
// export const getFavorites = async () => {
//     const response = await axios.get(`${BASE_URL}/favorites`)
//     return response.data
// }

// export const addFavorite = async (movie: any) => {
//     const res = await fetch(`${BASE_URL}/favorites`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(movie),
//     });

//     if (!res.ok) throw new Error('Failed to add favorite');
//     return res.json();
// }

// export const removeFavorite = async (imdbID: string) => {
//     const response = await axios.delete(`${BASE_URL}/favorites/${imdbID}`)
//     return response.data
// }

// Use localStorage for persistant storage
export const getFavorites = async (): Promise<Movie[]> => getFavoritesFromStorage();
export const addFavorite = async (movie: Movie): Promise<void> => addFavoriteToStorage(movie);
export const removeFavorite = async (imdbID: string): Promise<void> => removeFavoriteFromStorage(imdbID);