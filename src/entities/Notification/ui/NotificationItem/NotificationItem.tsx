import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import classes from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

export interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, notification } = props;

  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classnames(classes.NotificationItem, {}, [className])}
    >
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <a
        className={classes.link}
        target="_blank"
        href={notification.href}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
});
