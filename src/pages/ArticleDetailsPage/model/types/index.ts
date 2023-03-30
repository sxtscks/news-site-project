import { ArticleDetailsComments } from './articleDetailsComments';
import { ArticleDetailsPageRecommendations } from './articleDetailsPageRecommendations';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsComments;
  recommendations: ArticleDetailsPageRecommendations;
}
