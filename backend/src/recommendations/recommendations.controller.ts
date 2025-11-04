import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
     constructor(private readonly recommendationsService: RecommendationsService) { }

     @Post()
     async getRecommendations(@Body("favorites") favorites: any[]) {
        return this.recommendationsService.getRecommendations(favorites);
     }
}
