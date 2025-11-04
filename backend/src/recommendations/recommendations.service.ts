import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import OpenAI from "openai";

@Injectable()
export class RecommendationsService {
    private openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    async getRecommendations(favorites: any[]) {
        if(!favorites || favorites.length == 0) return [];
        const titles = favorites.map(fav => fav.Title).join(", ");
        const prompt = `You are an AI movie recommendation specialist. Here are a list of user's
        favorites movie titles ${titles}.
        Recommend 10 similar movies based on tone, emotion, genre, and audience taste.
        Return as JSON only:
        [
            { "title": "Movie Name", "year": "Year", "imdbId": "tt#######" }
        ]
        `;

        try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      const response_raw = response.choices[0].message.content;
      return response_raw;
    } catch (error) {
      console.error(error);
      throw new HttpException('Recommendation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
}
