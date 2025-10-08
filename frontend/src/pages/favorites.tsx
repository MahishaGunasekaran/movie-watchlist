import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Movie } from '../types/movie.type'
import { getFavorites, removeFavorite } from '../api/movies'

export default function FavoritesPage() {
  const queryClient = useQueryClient()

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  })

  const removeFavMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Favorite Movies</h1>

      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {favorites.map((movie: Movie, idx: number) => (
            <div key={`${movie.imdbID}-${idx}`} className="border p-2">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover mb-2"
              />
              <h3 className="text-lg font-bold">{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button
                onClick={() => removeFavMutation.mutate(movie.imdbID)}
                className="bg-red-500 text-white px-2 py-1 mt-2 w-full"
              >
                Remove Favorite
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite movies yet.</p>
      )}
    </div>
  )
}
