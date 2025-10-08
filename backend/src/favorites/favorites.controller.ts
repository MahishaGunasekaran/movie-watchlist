import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import type { Movie } from '../types/movie.type';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Post(":movie")
    addFavorite(@Body() movie: Movie): string {
        this.favoritesService.addFavorite(movie);
        return 'Movie added to favorites';
    }


    @Get()
    listFavorites() {
        return this.favoritesService.listFavorites();
    }

    @Delete(":id")
    removeFavorite(@Param('id') id: string): string {
        this.favoritesService.removeFavorite(id);
        return 'Movie removed from favorites';
    }
}
