import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import {
  ArticleCodeBlockComponent,
} from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
  ArticleTextBlockComponent,
} from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  ArticleImageBlockComponent,
} from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import {
  useInitialEffect,
} from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import {
  fetchArticleById,
} from '../../model/services/fetchArticleById/fetchArticleById';
import classes from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';

export interface ArticleDetailsProps {
  className?: string;
  id: string
}

const initialReducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const data = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          block={block}
          key={block.id}
          className={classes.block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          block={block}
          key={block.id}
          className={classes.block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          block={block}
          key={block.id}
          className={classes.block}
        />
      );
    default:
      return null;
    }
  }, []);

  useInitialEffect(() => dispatch(fetchArticleById(id)));

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={classes.avatar} width={200} height={200} border="50%" />
        <Skeleton className={classes.title} width={300} height={32} />
        <Skeleton className={classes.skeleton} width={600} height={24} />
        <Skeleton className={classes.skeleton} width="100%" height={200} />
        <Skeleton className={classes.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text title={t('Произошла ошибка')} align={TextAlign.CENTER} />
    );
  } else {
    content = (
      <>
        <div className={classes.avatarWrapper}>
          <Avatar size={200} src={data?.img} className={classes.avatar} />
        </div>
        <Text
          title={data?.title}
          text={data?.subtitle}
          className={classes.title}
          size={TextSize.L}
        />
        <div>
          <Text text={data?.views.toString()} />
          <Text text={data?.createdAt} />
        </div>
        {data?.blocks?.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classnames(classes.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});
