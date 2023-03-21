import React, { FC, memo, useCallback } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
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
import {
  addCommentForArticle,
} from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/comments';
import classes from './ArticleDetailsPage.module.scss';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';

export interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (!id) {
    return (
      <div className={classnames(classes.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classnames('', {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={classes.commentTitle} title={t('Комментарии')} />
        <AddNewCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments ?? []} isLoading={isLoading} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
