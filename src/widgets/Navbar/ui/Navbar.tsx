import React, { FC } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classnames(classes.navbar, {}, [className])}>
      <div className={classes.linkWrapper}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/">{t('Главная страница')}</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">{t('О сайте')}</AppLink>
      </div>
    </div>
  );
};
