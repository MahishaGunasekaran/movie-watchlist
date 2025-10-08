import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { searchMovies } from "../api/movies";

export default function HomePage() {
    const [query, setQuery] = useState("");
    const queryClient = useQueryClient()

    const { data: searchResults, refetch } = useQuery({
        queryKey: ['search', query],
        queryFn: () => searchMovies(query),
        enabled: false,
    })


    const handleSearch = () => {
        if (query.trim()) refetch()
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-bold text-center mb-6">Movie Search</h1>
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
            {searchResults}
        </>
    )
}
