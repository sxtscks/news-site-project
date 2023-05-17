import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

export interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" max className={classnames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classnames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => <CommentCard comment={comment} />)
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});
