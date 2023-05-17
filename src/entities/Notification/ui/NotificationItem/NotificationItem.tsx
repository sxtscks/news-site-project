import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  Card as CardDeprecated,
  CardTheme,
} from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import classes from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

export interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, notification } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card className={classnames(classes.NotificationItem, {}, [className])}>
          <Text title={notification.title} text={notification.description} />
        </Card>
      }
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classnames(classes.NotificationItem, {}, [className])}
        >
          <TextDeprecated
            title={notification.title}
            text={notification.description}
          />
        </CardDeprecated>
      }
    />
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
