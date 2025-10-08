import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [MoviesModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
