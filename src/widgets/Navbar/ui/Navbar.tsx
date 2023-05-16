import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import { HStack } from '@/shared/ui/deprecated/Stack/HStack/HStack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import classes from './Navbar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const userAuthData = useSelector(getUserAuthData);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  if (userAuthData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <header
            className={classnames(classes.navbarRedesigned, {}, [className])}
          >
            <HStack gap="16" className={classes.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classnames(classes.navbar, {}, [className])}>
            <Text
              theme={TextTheme.INVERTED}
              className={classes.appName}
              title={t('My App')}
            />
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={RoutePath.articleCreate}
            >
              {t('Создать статью')}
            </AppLink>
            <HStack gap="16" className={classes.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classnames(classes.navbar, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={handleOpenModal}>
        {t('Войти')}
      </Button>
      {isOpen && <LoginModal isOpen={isOpen} onClose={handleCloseModal} />}
    </header>
  );
});
