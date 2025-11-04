import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Movie } from '../types/movie.type'
import { getFavorites, removeFavorite } from '../api/movies'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import styles from '../styles/Favorites.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchRecommendations } from "../utils/localFavorites";

export default function FavoritesPage() {
  const queryClient = useQueryClient()

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  })

   useEffect(() => {
    if(favorites && favorites.length > 0) {
      fetchRecommendations(favorites).then(setRecommendations);
    }
  }, [favorites])

  const [recommendations, setRecommendations] = useState<any[]>([]);

  const removeFavMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Favorite Movies</h1>
      <p className={styles.subheader}>
        Your saved movies are here. Remove any movie you no longer want.
      </p>
      <Link href="/" className={styles.homeLink}>
        Back to Search
      </Link>

      {favorites && favorites.length > 0 ? (
        <>
          <div className={styles.grid}>
            {favorites.map((movie: Movie) => (
              <div key={movie.imdbID} className={styles.card}>
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                  alt={movie.Title}
                  className={styles.poster}
                />
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.year}>{movie.Year}</p>
                <button
                  onClick={() => removeFavMutation.mutate(movie.imdbID)}
                  className={styles.button}
                >
                  <SolidStarIcon className="w-5 h-5" />
                  Remove Favorite
                </button>
              </div>
            ))}
          </div>
          <h2>Movies You May Like</h2>
          <div className={styles.grid}>
            {recommendations.map((movie: Movie) => (
              <div key={movie.imdbID} className={styles.card}>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} />
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.year}>{movie.Year}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className={styles.subheader}>You have no favorite movies yet.</p>
      )}
    </div>
  )
}
