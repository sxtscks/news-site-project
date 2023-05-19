import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import classes from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

export interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const initialReducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
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
};

const Deprecated = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center" max>
        <AvatarDeprecated
          size={200}
          src={data?.img}
          className={classes.avatar}
        />
      </HStack>
      <VStack gap="4" max>
        <TextDeprecated
          title={data?.title}
          text={data?.subtitle}
          className={classes.title}
          size={TextSize.L}
        />
        <HStack gap="8">
          <TextDeprecated text={data?.views.toString()} />
          <TextDeprecated text={data?.createdAt} />
        </HStack>
      </VStack>
      {data?.blocks?.map(renderBlock)}
    </>
  );
};
const Redesigned = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={data?.title} size="size_l" bold />
      <Text title={data?.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesigned width="100%" height={420} border="16px" />
        }
        src={data?.img}
        className={classes.img}
      />
      {data?.blocks?.map(renderBlock)}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useInitialEffect(() => dispatch(fetchArticleById(id)));

  let content;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={classes.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={classes.title} width={300} height={32} />
        <Skeleton className={classes.skeleton} width={600} height={24} />
        <Skeleton className={classes.skeleton} width="100%" height={200} />
        <Skeleton className={classes.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = <Text title={t('Произошла ошибка')} align={TextAlign.CENTER} />;
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <VStack
        gap="16"
        max
        className={classnames(classes.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
