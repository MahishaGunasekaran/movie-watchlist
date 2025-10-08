import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../types/movie.type';

@Injectable()
export class FavoritesService {
    private favorites: any[] = [];

    addFavorite(movie: Movie): void {
        const isFavorite = this.favorites.find(favorite =>
            favorite.imdbID === movie.imdbID
        );
        if (!isFavorite) {
            this.favorites.push(movie);
        }
    }

    listFavorites() {
        return this.favorites;
    }

    removeFavorite(imdbID: string) {
        const index = this.favorites.findIndex(favorite =>
            favorite.imdbID === imdbID
        );
        if (index === -1) {
            throw new NotFoundException('Movie not found in favorites');
        }
        this.favorites.splice(index, 1);
        return this.favorites;
    }
}
