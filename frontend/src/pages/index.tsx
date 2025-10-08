import { useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query"
import { searchMovies, addFavorite, removeFavorite, getFavorites } from "../api/movies";
import Link from 'next/link';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import styles from '../styles/Home.module.css';

export default function HomePage() {
    const [query, setQuery] = useState("");
    const queryClient = useQueryClient();

    const { data: searchResults, refetch } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchMovies(query),
        enabled: false,
    })

    const addFavMutation = useMutation({
        mutationFn: addFavorite,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ['favorites'],
        })
    });

    const removeFavMutation = useMutation({
        mutationFn: removeFavorite,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ['favorites'],
        })
    })

    const handleSearch = () => {
        if (query.trim()) refetch()
    }


    const { data: favorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
    })

    const isFavorite = (imdbID: string) =>
        favorites?.some((f: any) => f.imdbID === imdbID)

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Movie Search</h1>
            <p className={styles.subtitle}>Find your favorite movies and save them!</p>
            <Link href="/favorites" className={styles.favLink}>My Favorites</Link>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Search
                </button>
            </div>
            {
                searchResults && searchResults.length > 0 ? (
                    <div className={styles.grid}>
                        {searchResults?.map((movie: any) => (
                            <div key={movie.imdbID} className={styles.card}>
                                <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title} />
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                                <button
                                    onClick={() =>
                                        isFavorite(movie.imdbID)
                                            ? removeFavMutation.mutate(movie.imdbID)
                                            : addFavMutation.mutate(movie)
                                    }
                                    className={styles.favBtn}
                                >
                                    {isFavorite(movie.imdbID) ? (
                                        <>
                                            <SolidStarIcon className="w-5 h-5" />
                                            Remove
                                        </>
                                    ) : (
                                        <>
                                            <OutlineStarIcon className="w-5 h-5" />
                                            Add
                                        </>
                                    )}
                                </button>


                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results to Display</p >
                )
            }
        </div>
    );
}




