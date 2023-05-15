import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ArticleDetails } from '@/entities/Article';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articlesDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { toggleFeatures } from '@/shared/lib/features/toggleFeatures';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articlesDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  const articleRating = toggleFeatures({
    name: 'isArticleRatingEnabled',
    // eslint-disable-next-line react/no-unstable-nested-components
    on: () => <ArticleRating id={id ?? ''} />,
    off: () => null,
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classnames('', {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader articleId={id ?? ''} />
          <ArticleDetails id={id ?? ''} />
          {articleRating}
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id ?? ''} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
