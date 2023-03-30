import React, { FC, memo, useCallback } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CommentList } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
  DynamicModuleLoader,
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  useInitialEffect,
} from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddNewCommentForm } from 'features/AddNewComment';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import { Page } from 'widgets/Page/Page';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import {
  addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import classes from './ArticleDetailsPage.module.scss';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from '../../model/slice/articleDetailsPageRecommendationsSlice';
import {
  getArticleRecommendationsIsLoading,
} from '../../model/selectors/recommendations';
import { articlesDetailsPageReducer } from '../../model/slice';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articlesDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const isRecommendationsLoading = useSelector(getArticleRecommendationsIsLoading);
  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (!id) {
    return (
      <Page className={classnames(classes.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classnames('', {}, [className])}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id} />
        <Text
          className={classes.commentTitle}
          size={TextSize.L}
          title={t('Рекомендуем')}
        />
        <ArticleList
          className={classes.recommendations}
          articles={recommendations}
          isLoading={isRecommendationsLoading}
          target="_blank"
        />
        <Text
          className={classes.commentTitle}
          size={TextSize.L}
          title={t('Комментарии')}
        />
        <AddNewCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments ?? []} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
