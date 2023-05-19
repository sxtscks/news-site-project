import React, { memo } from 'react';
import { generatePath } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Comment } from '../../model/types/comment';
import classes from './CommentCard.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

export interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

  if (isLoading) {
    return (
      <VStack
        className={classnames(classes.CommentCard, {}, [
          className,
          classes.loading,
        ])}
        gap="8"
        max
      >
        <div className={classes.header}>
          <Skeleton
            width={30}
            height={30}
            border="50%"
            className={classes.avatar}
          />
          <Skeleton height={16} width={100} />
        </div>
        <Skeleton className={classes.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) return null;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="round" fullWidth>
          <VStack
            gap="8"
            max
            className={classnames(classes.CommentCardRedesigned, {}, [
              className,
            ])}
          >
            <AppLink
              to={generatePath(RoutePath.profile, {
                id: comment?.user.id ?? '',
              })}
              className={classes.header}
            >
              {comment?.user.avatar && (
                <Avatar
                  className={classes.avatar}
                  size={30}
                  src={comment?.user.avatar}
                />
              )}
              <Text text={comment?.user.username} bold />
            </AppLink>
            <Text text={comment?.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          gap="8"
          max
          className={classnames(classes.CommentCard, {}, [className])}
        >
          <AppLinkDeprecated
            to={generatePath(RoutePath.profile, { id: comment?.user.id ?? '' })}
            className={classes.header}
          >
            {comment?.user.avatar && (
              <AvatarDeprecated
                className={classes.avatar}
                size={30}
                src={comment?.user.avatar}
              />
            )}
            <TextDeprecated text={comment?.user.username} />
          </AppLinkDeprecated>
          <TextDeprecated text={comment?.text} />
        </VStack>
      }
    />
  );
});
