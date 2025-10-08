import { useState } from "react";
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query"
import { searchMovies, addFavorite, removeFavorite, getFavorites } from "../api/movies";
import Link from 'next/link'


export default function HomePage() {
    const [query, setQuery] = useState("");
    const queryClient = useQueryClient();

    const { data: searchResults, refetch } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchMovies(query),
        enabled: false,
    })

    // const { data: favorites } = useQuery({
    //     queryKey: ['favorites'],
    //     queryFn: getFavorites,
    // })

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
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Movie Search</h1>
                <Link href="/favorites" className="bg-green-500 text-white px-4 py-2 rounded">
                    My Favorites
                </Link>
            </div>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="border border-gray-300 rounded-l px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>
            {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {searchResults?.map((movie: any, idx: number) => (
                        <div key={`${movie.imdbID}-${idx}`} className="bg-white rounded shadow p-4 flex flex-col items-center">
                            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded mb-4" />
                            <h3 className="text-lg font-semibold mb-1 text-center">{movie.Title}</h3>
                            <p className="text-gray-500 mb-2">{movie.Year}</p>
                            {isFavorite(movie.imdbID) ? (
                                <button
                                    onClick={() => removeFavMutation.mutate(movie.imdbID)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Remove Favorite
                                </button>
                            ) : (
                                <button
                                    onClick={() => addFavMutation.mutate(movie)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                >
                                    Add Favorite
                                </button>
                            )}
                        </div>
                    ))
                    }
                </div>
            ) : (
                <p>No results to Display</p>
            )}
        </div >
    )
}
