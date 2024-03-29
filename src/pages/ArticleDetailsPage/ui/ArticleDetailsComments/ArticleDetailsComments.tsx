import React, { memo, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  Text as TextDeprecated,
  TextSize,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { AddNewCommentForm } from '@/features/AddNewComment';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch]
    );

    return (
      <VStack className={classnames('', {}, [className])} gap="16" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="size_l" title={t('Комментарии')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
        />

        <Suspense fallback={<Loader />}>
          <AddNewCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList comments={comments ?? []} isLoading={isLoading} />
      </VStack>
    );
  }
);
