import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import classes from './NotificationList.module.scss';
import { useGetNotificationsQuery } from '../../api/notificationApi';
import { toggleFeatures } from '@/shared/lib/features';

export interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading } = useGetNotificationsQuery(null, {
    pollingInterval: 10000,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classnames(classes.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classnames(classes.NotificationList, {}, [className])}
    >
      {data?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </VStack>
  );
});
