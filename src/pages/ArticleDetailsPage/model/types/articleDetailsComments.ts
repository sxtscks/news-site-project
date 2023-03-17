import { Comment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsComments extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}
