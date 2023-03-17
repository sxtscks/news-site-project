import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import classes from './CommentList.module.scss';

export interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  return (
    <div className={classnames('', {}, [className])}>
      {comments?.length ? comments.map((comment) => (
        <CommentCard comment={comment} className={classes.comment} />
      )) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </div>
  );
});
