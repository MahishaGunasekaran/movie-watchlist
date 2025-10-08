import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/movies/search`, {
        params: { q: query },
    })
    return response.data.results
}

export const getFavorites = async () => {
  const response = await axios.get(`${BASE_URL}/favorites`)
  return response.data
}

export const addFavorite = async (movie: any) => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });

  if (!res.ok) throw new Error('Failed to add favorite');
  return res.json();
}

export const removeFavorite = async (imdbID: string) => {
  const response = await axios.delete(`${BASE_URL}/favorites/${imdbID}`)
  return response.data
}