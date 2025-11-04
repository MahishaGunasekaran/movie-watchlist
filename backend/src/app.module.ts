import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), MoviesModule, FavoritesModule, RecommendationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
