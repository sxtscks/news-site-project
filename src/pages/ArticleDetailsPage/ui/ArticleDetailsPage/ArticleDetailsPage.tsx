import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ArticleDetails } from '@/entities/Article';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articlesDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articlesDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <StickyLayout
            content={
              <Page className={classnames('', {}, [className])}>
                <VStack gap="16" max>
                  <DetailsContainer />
                  <ArticleRating id={id ?? ''} />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id ?? ''} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page className={classnames('', {}, [className])}>
            <VStack gap="16" max>
              <ArticleDetailsPageHeader articleId={id ?? ''} />
              <ArticleDetails id={id ?? ''} />
              <ToggleFeatures
                feature="isArticleRatingEnabled"
                on={<ArticleRating id={id ?? ''} />}
                off={null}
              />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id ?? ''} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
