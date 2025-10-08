import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const searchMovies = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/movies/search`, {
        params: { q: query },
    })
    return response.data.results
}