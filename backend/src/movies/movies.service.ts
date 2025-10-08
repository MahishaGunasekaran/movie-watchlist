import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class MoviesService {
    private readonly movieApiURL = 'http://www.omdbapi.com/';

    async searchMovies(query: string): Promise<any[]> {
        if (!query) {
            throw new HttpException('Query is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const response = await axios.get(this.movieApiURL, {
                params: {
                    apikey: process.env.OMDB_API_KEY,
                    s: query,
                },
            });

            const data = response.data;

            if (data.Response === 'False') {
                return [];
            }

            return data.Search.map((movie: any) => ({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
            }));
        } catch (error) {
            throw new HttpException('Failed to fetch movies', HttpStatus.BAD_GATEWAY);
        }
    }
}
