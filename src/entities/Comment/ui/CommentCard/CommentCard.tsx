import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Comment } from '../../model/types/comment';
import classes from './CommentCard.module.scss';

export interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classnames(classes.CommentCard, {}, [className])}>
        <div className={classes.header}>
          <Skeleton
            width={30}
            height={30}
            border="50%"
            className={classes.avatar}
          />
          <Skeleton height={16} width={100} />
        </div>
        <Skeleton
          className={classes.text}
          width="100%"
          height={50}
        />
      </div>
    );
  }

  return (
    <div className={classnames(classes.CommentCard, {}, [className])}>
      <div className={classes.header}>
        {comment?.user.avatar && <Avatar className={classes.avatar} size={30} src={comment?.user.avatar} />}
        <Text text={comment?.user.username} />
      </div>
      <Text className={classes.text} text={comment?.text} />
    </div>
  );
});
