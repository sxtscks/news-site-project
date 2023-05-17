import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification.svg';
import NotificationIcon from '@/shared/assets/icons/notificationNew.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import classes from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

export interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />}
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <IconDeprecated Svg={NotificationIconDeprecated} inverted />
        </ButtonDeprecated>
      }
    />
  );

  return (
    <>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Popover
              className={classnames(classes.NotificationButton, {}, [
                className,
              ])}
              direction="bottomLeft"
              trigger={trigger}
            >
              <NotificationList className={classes.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              className={classnames(classes.NotificationButton, {}, [
                className,
              ])}
              direction="bottomLeft"
              trigger={trigger}
            >
              <NotificationList className={classes.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  );
});
